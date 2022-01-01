import { useLocation, useParams } from 'react-router-dom';

function TeamId() {
  const location = useLocation();
  const { teamid } = useParams();
  const { team }: any = location.state;
  return (
    <div>
      <h1>URL params is : {teamid}</h1>
      <p>One team i want to check out</p>
      <h3>Name: {team.name}</h3>
      <p>Description: {team.description}</p>
      <p>Size: {team.size}</p>
      <p>Members</p>
      <ul>
        {team.members.map((member: any) => (
          <li key={member._id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeamId;
