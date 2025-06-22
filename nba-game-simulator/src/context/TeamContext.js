import { createContext, useContext, useState } from 'react';

const TeamContext = createContext();

export const useTeam = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);

  return (
    <TeamContext.Provider value={{ teamA, setTeamA, teamB, setTeamB }}>
      {children}
    </TeamContext.Provider>
  );
};
