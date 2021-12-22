import TeamResolver from './team.resolver';
import UserResolver from './user.resolver';
import UserStatisticResolver from './userStatistic.resolver';

export const resolvers = [UserResolver, TeamResolver, UserStatisticResolver] as const;
