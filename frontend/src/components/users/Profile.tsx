import React from 'react';

import { useQuery } from '@apollo/client';
import { SHOWPROFILE } from '../../graphql';

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
