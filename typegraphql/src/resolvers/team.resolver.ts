import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { CreateTeamInput, GetTeamInput } from '../input/team.input';
import { Team } from '../schema/team.schema';
import TeamService from '../service/team.service';
import Context from '../types/context';

@Resolver()
export default class TeamResolver {
  constructor(private teamService: TeamService) {
    this.teamService = new TeamService();
  }

  @Authorized()
  @Mutation(() => Team)
  createTeam(@Arg('input') input: CreateTeamInput, @Ctx() context: Context): Promise<Team> {
    const user = context.user!;
    return this.teamService.createTeam({ ...input, createdBy: user?._id, creator: user?.name });
  }

  @Authorized()
  @Mutation(() => Team)
  joinTeam(@Arg('input') input: GetTeamInput, @Ctx() context: Context): Promise<Team | null> {
    return this.teamService.joinTeam(input, context);
  }

  @Authorized()
  @Mutation(() => Team)
  leaveTeam(@Arg('input') input: GetTeamInput, @Ctx() context: Context): Promise<Team | null> {
    return this.teamService.leaveTeam(input, context);
  }

  @Authorized()
  @Query(() => Team)
  team(@Arg('input') input: GetTeamInput): Promise<Team | null> {
    return this.teamService.findSingleTeam(input);
  }

  @Authorized()
  @Query(() => [Team])
  myCreatedTeams(@Ctx() context: Context) {
    return this.teamService.findMyTeams(context);
  }

  /** UNAUTHENTICATED **/

  @Query(() => [Team])
  teams() {
    return this.teamService.findTeams();
  }
}
