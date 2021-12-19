import { ApolloError } from 'apollo-server';
import { CreateTeamInput, GetTeamInput, TeamModel } from '../schema/team.schema';
import { User } from '../schema/user.schema';
import Context from '../types/context';

class TeamService {
  async createTeam(input: CreateTeamInput & { createdBy: User['_id']; creator: User['name'] }) {
    return TeamModel.create(input);
  }

  async findTeams() {
    const teams = TeamModel.find().lean();
    return teams;
  }

  async findSingleTeam(input: GetTeamInput) {
    return TeamModel.findOne(input).lean();
  }

  async findMyTeams(context: Context) {
    const user = context.user?._id;
    const myTeams = await TeamModel.find({ createdBy: user }).lean();

    if (!myTeams) {
      throw new ApolloError('You dont have any teams yet');
    }

    return myTeams;
  }

  async joinTeam(input: GetTeamInput, context: Context) {
    const user = context.user!;
    // find team with teamId
    const team = await this.findSingleTeam(input);

    // check if team is not already full
    if (team?.isFull) {
      throw new ApolloError('Team is already full');
    }

    // check if current user har already joined team if it has return member else return empty array
    const alreadyJoined = team?.members.filter((member) => {
      const checkExistingMembers = member?.toString();

      if (checkExistingMembers === user._id) {
        return checkExistingMembers;
      }
    });

    // check if alreadyJoined returns array of existing member or not
    if (alreadyJoined!.length !== 0) {
      throw new ApolloError('User already joined');
    }

    // define new object with values to update
    const newTeamMember = { members: team?.members, isFull: team?.isFull };
    newTeamMember?.members!.push(user['_id']);

    // check if team is full
    if (newTeamMember.members?.length == team?.size) {
      newTeamMember.isFull = true;
    }
    const item = { $set: newTeamMember };

    // update db with new team member
    await TeamModel.updateOne(input, item, { new: true });

    return team;
  }

  async leaveTeam(input: GetTeamInput, context: Context) {
    const user = context.user!;

    // find team with teamId
    const team = await this.findSingleTeam(input);

    // Check if team is empty
    if (team?.members?.length == 0) {
      throw new ApolloError('Team is empty');
    }

    // Check if user has joined team
    const userHasJoinedTeam = team?.members?.filter((member) => {
      const checkExistingMembers = member?.toString();

      if (checkExistingMembers === user._id) {
        return checkExistingMembers;
      }
    });

    if (userHasJoinedTeam!.length === 0) {
      throw new ApolloError('User has not joined team');
    }

    // remove user from team
    const removeTeamMember = { members: team?.members, isFull: team?.isFull };

    const removeUserFromTeam = removeTeamMember?.members!.filter((member) => {
      const checkExistingMembers = member?.toString();

      if (checkExistingMembers !== user._id) {
        return checkExistingMembers;
      }
    });

    removeTeamMember!.members! = removeUserFromTeam;

    // if teamIsFull is true update to false
    if (team?.isFull) {
      removeTeamMember.isFull = false;
    }

    const item = { $set: removeTeamMember };
    // update db with removed user

    await TeamModel.updateOne(input, item, { new: true });

    return team;
  }
}

export default TeamService;
