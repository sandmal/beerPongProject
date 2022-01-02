import { Link, Outlet } from 'react-router-dom';

function Home() {
  return (
    <div>
      <p>Here you will find all your joined teams, joined tournaments and user Statistics</p>
      <h1>User statistics</h1>
      <h2>Joined teams</h2>
      <Link to='joinedTeams'>Joined teams</Link>
      <h3>Joined tournament</h3>
      <Link to='joinedTournaments'>Joined tournaments</Link>
      <Outlet />
    </div>
  );
}

export default Home;
