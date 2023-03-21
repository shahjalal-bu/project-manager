import React, { useState } from "react";
import Error from "./ui/Error";
import Button from "./ui/Button";
import { useAddProjectsMutation } from "../features/projects/projectsApi";
import { useSelector } from "react-redux";
import Input from "./ui/Input";
import RoundedButton from "./ui/RoundedButton";
import { useAuth } from "../contexts/authContext";

const ProjectAddModal = ({ setControl }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(undefined);
  const [addProjects, {}] = useAddProjectsMutation();
  // const { user } = useSelector((state) => state.auth);
  const { currentUser } = useAuth();

  const { teams } = useSelector((state) => state.teams);

  const handleAddProject = () => {
    if (!selectedTeam && !description && !projectName) {
      alert("Fill all field !");
    } else if (!selectedTeam) {
      alert("Select A Team!");
    } else if (!description) {
      alert("Add a description");
    } else if (!projectName) {
      alert("Add a project name");
    } else {
      addProjects({
        projectName,
        description,
        column: "Backlog",
        createor: currentUser?.email,
        teamname: selectedTeam?.name,
        color: selectedTeam?.color,
        teammembers: selectedTeam?._id,
      });
      setControl("");
      setSelectedTeam("");
      setDescription("");
      setSelectedTeam("");
    }
  };
  return (
    <div
      id="close"
      onClick={(e) => {
        if (e.target.id === "close") {
          setControl(false);
        }
      }}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
      style={{ marginLeft: 0 }}
    >
      <div className="bg-white p-6 rounded">
        <p className="text-center text-3xl text-gray-700 mb-5">Add a Project</p>
        <div className="flex flex-col">
          <Input
            htmlFor="projectName"
            placeholder="Enter a Project Name"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
          <Input
            htmlFor="description"
            placeholder="Enter a Line About Project"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <div>Select A Team To Your Project:</div>
          <div className="flex my-1">
            {teams?.teams.map((el) => (
              <RoundedButton
                selectedTeam={selectedTeam}
                text={el.name}
                onClick={() => setSelectedTeam(el)}
                key={el.id}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          <Button
            className="text-red-500 background-transparent"
            onClick={() => setControl(false)}
          >
            Close
          </Button>
          <Button
            className="bg-purple-500 text-white active:bg-purple-600 "
            onClick={handleAddProject}
          >
            Add A Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectAddModal;
