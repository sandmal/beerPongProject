import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth.context';
import { SHOWPROFILE } from '../../graphql';

function Profile() {
  const { loading, error, data } = useQuery(SHOWPROFILE);
  const { state } = useContext(AuthContext);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <p>This is the profile page</p>
      <h3>Name: {data.me.name}</h3>
      <p>Email: {data.me.email}</p>
      <p>Confirmed email: {state.isRegistered ? 'Confirmed' : 'Email not confirmed, please check your email'}</p>
    </div>
  );
}

export default Profile;
