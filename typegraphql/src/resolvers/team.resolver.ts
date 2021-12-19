import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { CreateTeamInput, GetTeamInput, Team } from '../schema/team.schema';
import TeamService from '../service/team.service';
import Context from '../types/context';

@Resolver()
export default class TeamResolver {
  constructor(private teamService: TeamService) {
    this.teamService = new TeamService();
  }

  @Authorized()
  @Mutation(() => Team)
  createTeam(@Arg('input') input: CreateTeamInput, @Ctx() context: Context) {
    const user = context.user!;
    return this.teamService.createTeam({ ...input, createdBy: user?._id, creator: user?.name });
  }

  @Authorized()
  @Mutation(() => Team)
  joinTeam(@Arg('input') input: GetTeamInput, @Ctx() context: Context) {
    return this.teamService.joinTeam(input, context);
  }

  @Authorized()
  @Mutation(() => Team)
  leaveTeam(@Arg('input') input: GetTeamInput, @Ctx() context: Context) {
    return this.teamService.leaveTeam(input, context);
  }

  @Query(() => [Team])
  teams() {
    return this.teamService.findTeams();
  }

  @Authorized()
  @Query(() => Team)
  team(@Arg('input') input: GetTeamInput) {
    return this.teamService.findSingleTeam(input);
  }

  @Authorized()
  @Query(() => [Team])
  myTeams(@Ctx() context: Context) {
    return this.teamService.findMyTeams(context);
  }
}
