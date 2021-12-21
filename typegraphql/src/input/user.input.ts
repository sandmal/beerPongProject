import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, {
    message: 'password must be at least 6 characters long',
  })
  @MaxLength(50, {
    message: 'password must not be longer than 50 characters',
  })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}

@InputType()
export class ConfirmUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  confirmToken: string;
}

@InputType()
export class ForgotPasswordInput {
  @Field(() => String)
  email: string;
}

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  forgotToken: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  passwordConfirm: string;
}
