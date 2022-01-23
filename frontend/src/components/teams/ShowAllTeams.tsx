import React from 'react';
import { useQuery } from '@apollo/client';
import { SHOWALLTEAMS } from '../../graphql';

function ShowAllTeams() {
  const { loading, error, data } = useQuery(SHOWALLTEAMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <p>This is where you find all teams</p>
      <div className='flex justify-around'>
        {data.teams.map((team: any) => (
          <div key={team.teamId} className=' py-5'>
            <h3>Name: {team.name}</h3>
            <p>Created by: {team.creator}</p>
            <p>Description: {team.description}</p>
            <p>Size: {team.size}</p>
            {team.members.length === Number(team.size) ? (
              <button
                disabled
                className='w-full inline-flex items-center justify-center px-4 py-1 bg-red-500 border border-transparent rounded-md font-semibold text-white focus:outline-none transition'>
                Team full
              </button>
            ) : (
              <button className='w-full inline-flex items-center justify-center px-4 py-1 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring-blue-200 disabled:opacity-25 transition'>
                Join team
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowAllTeams;
