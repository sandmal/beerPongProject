import { CreateTeamInput, GetTeamInput, TeamModel } from '../schema/team.schema';
import { User } from '../schema/user.schema';

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
}

export default TeamService;
