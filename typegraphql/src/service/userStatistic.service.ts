import { UserStatisticModel } from '../schema/userStatistics.schema';
import Context from '../types/context';

class UserStatisticService {
  async getUserStatistic(context: Context) {
    const user = context.user!;
    const test = await UserStatisticModel.findOne({ where: { user: user } });
    return test;
  }
}

export default UserStatisticService;
