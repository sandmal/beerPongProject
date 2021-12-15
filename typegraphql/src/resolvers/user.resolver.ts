import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ConfirmUserInput, CreateUserInput, LoginInput, User } from '../schema/user.schema';
import UserService from '../service/user.service';
import Context from '../types/context';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  registerUser(@Arg('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  confirmUser(@Arg('input') input: ConfirmUserInput) {
    return this.userService.confirmUser(input);
  }

  @Mutation(() => String) // returns the JWT
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Query(() => User, { nullable: true })
  logout(@Ctx() context: Context) {
    return this.userService.logout(context);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context) {
    return context.user;
  }
}
