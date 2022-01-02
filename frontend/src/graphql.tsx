import { gql } from '@apollo/client';

export const USERLOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

export const LOGOUT = gql`
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
