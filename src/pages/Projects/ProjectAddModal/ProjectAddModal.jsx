// import React, { useState } from "react";
// import Error from "../../../components/ui/Error";
// import Button from "../../../components/ui/Button";
// import { useAddProjectsMutation } from "../../../features/projects/projectsApi";
// import { useSelector } from "react-redux";
// import Input from "../../../components/ui/Input";
// import RoundedButton from "../../../components/ui/RoundedButton";
// import { useAuth } from "../../../contexts/authContext";

// const ProjectAddModal = ({ setControl }) => {
//   const [projectName, setProjectName] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedTeam, setSelectedTeam] = useState(undefined);
//   const [addProjects, {}] = useAddProjectsMutation();
//   // const { user } = useSelector((state) => state.auth);
//   const { currentUser } = useAuth();

//   const { teams } = useSelector((state) => state.teams);

//   const handleAddProject = () => {
//     if (!selectedTeam && !description && !projectName) {
//       alert("Fill all field !");
//     } else if (!selectedTeam) {
//       alert("Select A Team!");
//     } else if (!description) {
//       alert("Add a description");
//     } else if (!projectName) {
//       alert("Add a project name");
//     } else {
//       addProjects({
//         projectName,
//         description,
//         column: "Backlog",
//         createor: currentUser?.email,
//         teamname: selectedTeam?.name,
//         color: selectedTeam?.color,
//         teammembers: selectedTeam?._id,
//       });
//       setControl("");
//       setSelectedTeam("");
//       setDescription("");
//       setSelectedTeam("");
//     }
//   };
//   return (
//     <div
//       id="close"
//       onClick={(e) => {
//         if (e.target.id === "close") {
//           setControl(false);
//         }
//       }}
//       className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
//       style={{ marginLeft: 0 }}
//     >
//       <div className="bg-white p-6 rounded">
//         <p className="text-center text-3xl text-gray-700 mb-5">Add a Project</p>
//         <div className="flex flex-col">
//           <Input
//             htmlFor="projectName"
//             placeholder="Enter a Project Name"
//             onChange={(e) => setProjectName(e.target.value)}
//             value={projectName}
//           />
//           <Input
//             htmlFor="description"
//             placeholder="Enter a Line About Project"
//             onChange={(e) => setDescription(e.target.value)}
//             value={description}
//           />
//           <div>Select A Team To Your Project:</div>
//           <div className="flex my-1">
//             {teams?.teams.map((el) => (
//               <RoundedButton
//                 selectedTeam={selectedTeam}
//                 text={el.name}
//                 onClick={() => setSelectedTeam(el)}
//                 key={el.id}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//           <Button
//             className="text-red-500 background-transparent"
//             onClick={() => setControl(false)}
//           >
//             Close
//           </Button>
//           <Button
//             className="bg-purple-500 text-white active:bg-purple-600 "
//             onClick={handleAddProject}
//           >
//             Add A Project
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectAddModal;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Error from "../../shared/Error";
import Button from "../../shared/Button";
import { useAddProjectsMutation } from "../../../features/projects/projectsApi";
import Input from "../../shared/Input";
import { useAuth } from "../../../contexts/authContext";
import Select from "react-select";
import { useGetTeamsQuery } from "../../../features/teams/teamsApi";
const ProjectAddModal = ({ setControl }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addProjects, {}] = useAddProjectsMutation();
  const { currentUser } = useAuth();
  const [selectTeam, setSelectTeam] = useState(null);
  const { isLoading, isSuccess, data: teams } = useGetTeamsQuery();
  const teamOptionsData =
    isSuccess &&
    teams.map((el) => ({
      label: el.name,
      value: el.value,
    }));

  const handleAddProject = (data) => {
    addProjects({
      projectName: data.projectName,
      description: data.description,
      column: "Backlog",
      createor: currentUser?.email,
      teamname: data.selectedTeam.name,
      color: data.selectedTeam.color,
      teammembers: data.selectedTeam._id,
    });
    setControl("");
  };
  if (!isLoading && isSuccess)
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
          <p className="text-center text-3xl text-gray-700 mb-5">
            Add a Project
          </p>
          <div className="flex flex-col">
            <input
              htmlFor="projectName"
              placeholder="Enter a Project Name"
              className="input"
              {...register("projectName", { required: true })}
            />
            {errors.projectName && <Error message="Project name is required" />}
            <input
              htmlFor="description"
              placeholder="Enter a Line About Project"
              className="input"
              {...register("description", { required: true })}
            />
            {errors.description && <Error message="Description is required" />}
            <div>Select A Team To Your Project:</div>
            <div className="my-2">
              <Select
                options={teamOptionsData}
                defaultValue={selectTeam}
                onChange={setSelectTeam}
                placeholder="Select a color.."
                isClearable
                isSearchable
                noOptionsMessage={() => "No color found!"}
              />
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
              onClick={handleSubmit(handleAddProject)}
            >
              Add A Project
            </Button>
          </div>
        </div>
      </div>
    );
};

export default ProjectAddModal;
