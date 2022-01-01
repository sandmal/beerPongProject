import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { resolvers } from './resolvers';
import { connectToMongo } from './utils/mongo';
import { verifyJwt } from './utils/jwt';
import { User } from './schema/user.schema';
import Context from './types/context';
import authChecker from './utils/authChecker';

async function bootstrap() {
  // Build the schema
  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  // Init express
  const app = express();
  app.use(cookieParser());
  const corsOptions = {
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'http://localhost:4000/graphql',
      'http://10.0.0.36:3000',
    ],
    credentials: true,
  };

  // Create the apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      const context = ctx;
      if (ctx.req.cookies.accessToken) {
        const user = verifyJwt<User>(ctx.req.cookies.accessToken);
        context.user = user;
      }
      return context;
    },
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  // start ApolloServer
  await server.start();

  // apply middleware to server
  server.applyMiddleware({
    app,
    cors: corsOptions,
  });

  // app.listen on express server
  app.listen({ port: 4000 }, () => {
    console.log('App is listening on http://localhost:4000/graphql');
  });

  // Connect to mongodb server
  connectToMongo();
}

bootstrap();
