import { createConfirmationUrl } from './../utils/createConfirmationUrl';
import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { UserModel } from '../schema/user.schema';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';
import { CookieOptions } from 'express';
import { sendEmail } from '../utils/sendEmail';
import { nanoid } from 'nanoid';
import { forgotPasswordUrl } from '../utils/forgotPasswordUrl';
import {
  ConfirmUserInput,
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  LoginInput,
} from '../input/user.input';

const cookieOptions: CookieOptions = {
  maxAge: 3.154e10, // 1 year,
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
};

class UserService {
  async createUser(input: CreateUserInput) {
    // call user model to create a user
    const emailExist = await UserModel.find().findByEmail(input.email).lean();

    if (emailExist) {
      throw new ApolloError('Account with email already exists');
    }
    const confirmToken = nanoid(32);
    const user = await UserModel.create({ ...input, confirmToken });
    await sendEmail(user.email, createConfirmationUrl(user.confirmToken));
    return user;
  }

  async confirmUser(input: ConfirmUserInput) {
    // find user by email
    const user = await UserModel.find().findByEmail(input.email).lean();
    // Check if user exist
    // Check if the confirmation tokens === confirmToken
    if (!user || input.confirmToken !== user.confirmToken) {
      throw new Error('Email or confirm token are incorrect');
    }

    // change active to true
    const updatedUser = { $set: { active: true }, $unset: { confirmToken: 1 } };

    // save the user
    await UserModel.updateOne(user, updatedUser, { new: true });
    // return user
    return user;
  }

  async forgotPassword(input: ForgotPasswordInput) {
    // find user by email
    const user = await UserModel.find().findByEmail(input.email).lean();
    // check if email exist
    if (!user) {
      return null;
    }

    // create token and set expire to 15 min
    const forgotToken = nanoid(32);
    const token = signJwt({ forgotToken }, { expiresIn: '15m' });

    // update user with forgotToken
    const updatedUser = { $set: { forgotToken: forgotToken } };
    await UserModel.updateOne(user, updatedUser, { new: true });

    // send email to notify the user
    await sendEmail(user.email, forgotPasswordUrl(token));
    return user;
  }

  async resetPassword(input: ResetPasswordInput) {
    // find user by email
    const passwordReset = await UserModel.findOne({ forgotToken: input.forgotToken });

    // check token and forgotToken from db
    if (input.password !== input.passwordConfirm) {
      throw new ApolloError('passwords does not match');
    }

    const { email } = passwordReset!.toJSON();
    const user = await UserModel.find().findByEmail(email).lean();

    // check if user exist
    if (!user) {
      return null;
    }

    // hashes new password
    const password = input.password;
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(password, salt);

    // saves new password to db
    await UserModel.updateOne(
      user,
      { $set: { password: hash }, $unset: { forgotToken: 1 } },
      { new: true }
    );
    return user;
  }

  async login(input: LoginInput, context: Context) {
    const e = 'Invalid username or password';
    // Get our user by email
    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
      throw new ApolloError(e);
    }

    if (!user.active) {
      throw new ApolloError('Confirm email before login');
    }

    // Validate the password
    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError(e);
    }

    // Sign a jwt
    const token = signJwt(user);

    // Set a cookie for the JWT
    context.res.cookie('accessToken', token, cookieOptions);

    // Return the jwt
    return token;
  }

  async logout(context: Context) {
    context.res.cookie('accessToken', '', { ...cookieOptions, maxAge: 0 });
    return null;
  }
}

export default UserService;
