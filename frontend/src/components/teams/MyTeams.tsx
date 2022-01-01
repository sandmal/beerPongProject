import { gql, useQuery } from '@apollo/client';
import { NavLink, Outlet } from 'react-router-dom';

const MYCREATEDTEAMS = gql`
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
function MyTeams() {
  const { loading, error, data } = useQuery(MYCREATEDTEAMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <p>This is where you find all teams you have created.</p>
      <>
        {data.myCreatedTeams.map((team: any) => (
          <div key={team.name}>
            <NavLink
              style={({ isActive }) => {
                return { backgroundColor: isActive ? 'red' : 'gray' };
              }} // TODO!: not working for some reason
              to={`${team.name}`}
              state={{ team: team }}
            >
              {team.name}
            </NavLink>
          </div>
        ))}
        <Outlet />
      </>
    </div>
  );
}

export default MyTeams;
