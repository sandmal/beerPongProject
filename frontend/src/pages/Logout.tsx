import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGOUT = gql`
  query {
    logout {
      name
    }
  }
`;

function Logout() {
  const { loading, error } = useQuery(LOGOUT);
  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1>You are now logged out</h1>
      <button onClick={() => navigate('/login')}>Go back to login</button>
    </div>
  );
}

export default Logout;
