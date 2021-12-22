import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { UserStatistic } from '../schema/userStatistics.schema';
import UserStatisticService from '../service/userStatistic.service';
import Context from '../types/context';

@Resolver()
export default class UserStatisticResolver {
  constructor(private userStatisticService: UserStatisticService) {
    this.userStatisticService = new UserStatisticService();
  }

  @Authorized()
  @Query(() => UserStatistic, { nullable: true })
  getUserStatistic(@Ctx() context: Context): Promise<UserStatistic | null> {
    return this.userStatisticService.getUserStatistic(context);
  }
}
