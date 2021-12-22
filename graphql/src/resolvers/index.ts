import TeamResolver from './team.resolver';
import UserResolver from './user.resolver';

export const resolvers = [UserResolver, TeamResolver] as const;
