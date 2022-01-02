import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import ShowAllTeams from '../components/teams/ShowAllTeams';

function Teams() {
  return (
    <div>
      <h1>This is the teams dashboard</h1>
      <p>See all teams statistics, team information and more.</p>
      <Link to='myteams'>My teams</Link>
      <Outlet />
      <ShowAllTeams />
    </div>
  );
}

export default Teams;
