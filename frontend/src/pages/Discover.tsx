import ShowAllTeams from '../components/teams/ShowAllTeams';

function Discover() {
  return (
    <div className='px-16 py-6'>
      <h1>This is the teams dashboard</h1>
      <p>See all teams statistics, team information and more.</p>
      <p>Join teams</p>
      <p>See members</p>
      <ShowAllTeams />
    </div>
  );
}

export default Discover;
