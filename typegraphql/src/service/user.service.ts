import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { CreateUserInput, LoginInput, UserModel } from '../schema/user.schema';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';
import { CookieOptions } from 'express';

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
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const e = 'Invalid username or password';
    // Get our user by email
    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
      throw new ApolloError(e);
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
