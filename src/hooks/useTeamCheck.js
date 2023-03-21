import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addteams } from "../features/teams/teamsSlice";

export default function useTeamCheck() {
  const dispatch = useDispatch();
  const [isTeams, setIsTeams] = useState(false);

  useEffect(() => {
    const localTeams = localStorage?.getItem("teams");

    if (localTeams) {
      const data = JSON.parse(localTeams);
      if (data.teams) {
        dispatch(
          addteams({
            teams: data.teams,
          })
        );
      }
    }
    setIsTeams(true);
  }, [dispatch, setIsTeams]);

  return isTeams;
}
