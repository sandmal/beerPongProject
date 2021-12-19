import { createConfirmationUrl } from './../utils/createConfirmationUrl';
import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { ConfirmUserInput, CreateUserInput, LoginInput, UserModel } from '../schema/user.schema';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';
import { CookieOptions } from 'express';
import { sendEmail } from '../utils/sendEmail';
import { nanoid } from 'nanoid';

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
