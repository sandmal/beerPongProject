import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  ConfirmUserInput,
  CreateUserInput,
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
} from '../input/user.input';
import { User } from '../schema/user.schema';
import UserService from '../service/user.service';
import Context from '../types/context';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  registerUser(@Arg('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  confirmUser(@Arg('input') input: ConfirmUserInput): Promise<User> {
    return this.userService.confirmUser(input);
  }

  @Mutation(() => User, { nullable: true })
  forgotPassword(@Arg('input') input: ForgotPasswordInput): Promise<User | null> {
    return this.userService.forgotPassword(input);
  }

  @Mutation(() => User, { nullable: true })
  resetPassword(@Arg('input') input: ResetPasswordInput) {
    return this.userService.resetPassword(input);
  }

  @Mutation(() => String) // returns the JWT
  login(@Arg('input') input: LoginInput, @Ctx() context: Context): Promise<String> {
    return this.userService.login(input, context);
  }

  @Query(() => User, { nullable: true })
  logout(@Ctx() context: Context): Promise<null> {
    return this.userService.logout(context);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context) {
    return context.user;
  }

  @Query(() => User, { nullable: true })
  test(): {name: string;
}  {
    return { name: 'testing here lmao' };
  }
}
