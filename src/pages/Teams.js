import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Error from "../components/ui/Error";
import Team from "../components/Team";
import PlusImage from "../assets/images/PlusImage";
import { useState } from "react";
import {
  useAddTeamMutation,
  useGetTeamsQuery,
} from "../features/teams/teamsApi";
import { useSelector } from "react-redux";
import TeamsAddModal from "../components/TeamsAddModal";

export default function Teams() {
  const [control, setControl] = useState(false);
  const [bgColor, setBgColor] = useState("pink");

  //handle form
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const {
    data: teamsData,
    isLoading,
    isError,
    error,
  } = useGetTeamsQuery(email);
  const [addTeam, {}] =
    useAddTeamMutation();

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

  const handleAddTeam = () => {
    addTeam({
      teamname: teamName,
      members: email,
      description: description,
      color: bgColor,
      creator: email,
      createat: new Date().getTime(),
    });
    setControl();
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Navbar teams/>
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
      <Footer />
      <TeamsAddModal
        control={control}
        setControl={setControl}
        teamName={teamName}
        setTeamName={setTeamName}
        bgColor={bgColor}
        setBgColor={setBgColor}
        description={description}
        setDescription={setDescription}
        handleAddTeam={handleAddTeam}
      />
    </>
  );
}
