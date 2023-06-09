import Navbar from "../../../layouts/Navbar";
import Error from "../../shared/Error";
import Team from "../Team/Team";
import PlusImage from "../../../assets/images/PlusImage";
import { useState } from "react";
import {
  useAddTeamMutation,
  useGetTeamsQuery,
} from "../../../features/teams/teamsApi";
import TeamsAddModal from "../TeamAddModal/TeamsAddModal";
import { useAuth } from "../../../contexts/authContext";

export default function Teams() {
  const [control, setControl] = useState(false);

  const { currentUser } = useAuth() || {};
  const {
    data: teamsData,
    isLoading,
    isError,
    error,
  } = useGetTeamsQuery(currentUser.email) || {};
  const [addTeam, {}] = useAddTeamMutation();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && teamsData?.length === 0) {
    content = <li className="m-2 text-center">No teams found!</li>;
  } else if (!isLoading && !isError && teamsData?.length > 0) {
    content = teamsData.map((el) => <Team key={el._id} teamInfo={el} />);
  }

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <div className="px-10 mt-6 flex justify-between">
          <h1 className="text-2xl font-bold">Teams</h1>
          <button
            onClick={() => setControl(true)}
            className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
          >
            <PlusImage />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
          {content}
        </div>
      </div>
      <TeamsAddModal controller={control} setControl={setControl} />
    </>
  );
}
