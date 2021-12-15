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
    const myTeams = await TeamModel.find({ createdBy: user });

    if (!myTeams) {
      throw new ApolloError('You dont have any teams yet');
    }

    return myTeams;
  }
}

export default TeamService;
