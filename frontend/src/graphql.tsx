import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

export const USER_REGISTER = gql`
  mutation registerUser($input: CreateUserInput!) {
    registerUser(input: $input) {
      name
      email
    }
  }
`;

export const USER_CONFIRM = gql`
  mutation confirmUser($input: ConfirmUserInput!) {
    confirmUser(input: $input) {
      name
      email
    }
  }
`;

export const USER_LOGOUT = gql`
  query {
    logout {
      name
    }
  }
`;

export const SHOWALLTEAMS = gql`
  query teams {
    teams {
      teamId
      creator
      name
      description
      size
      members {
        name
      }
    }
  }
`;

export const MYCREATEDTEAMS = gql`
  query myCreatedTeams {
    myCreatedTeams {
      teamId
      name
      size
      description
      members {
        _id
        name
      }
    }
  }
`;

export const SHOWPROFILE = gql`
  query {
    me {
      name
      email
    }
  }
`;
