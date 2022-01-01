import React from 'react';

import { gql, useQuery } from '@apollo/client';

const SHOWPROFILE = gql`
  query {
    me {
      name
      email
    }
  }
`;

function Profile() {
  const { loading, error, data } = useQuery(SHOWPROFILE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <p>This is the profile page</p>
      <h3>Name: {data.me.name}</h3>
      <p>Email: {data.me.email}</p>
    </div>
  );
}

export default Profile;
