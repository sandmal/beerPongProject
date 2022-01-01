import React from 'react';
import { gql, useQuery } from '@apollo/client';

const SHOWALLTEAMS = gql`
  query teams {
    teams {
      teamId
      creator
      name
      description
      size
    }
  }
`;

function ShowAllTeams() {
  const { loading, error, data } = useQuery(SHOWALLTEAMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <p>This is where you find all teams</p>
      <>
        {data.teams.map((team: any) => (
          <div key={team.teamId}>
            <h3>Name: {team.name}</h3>
            <p>Created by: {team.creator}</p>
            <p>Description: {team.description}</p>
            <p>Size: {team.size}</p>
          </div>
        ))}
      </>
    </div>
  );
}

export default ShowAllTeams;
