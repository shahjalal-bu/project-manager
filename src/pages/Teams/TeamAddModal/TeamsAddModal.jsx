import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../../contexts/authContext";
import { useAddTeamMutation } from "../../../features/teams/teamsApi";

const TeamsAddModal = ({ controller = true, setControl }) => {
  const { currentUser } = useAuth();
  const [addTeam, {}] = useAddTeamMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const newData = {
      ...data,
      members: currentUser.email,
      createor: currentUser.email,
      createat: new Date().getTime(),
    };
    console.log(newData);
    addTeam(newData);
    reset();
    setControl(false);
  }

  return (
    controller && (
      <div
        id="close"
        onClick={(e) => {
          if (e.target.id === "close") setControl(false);
        }}
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="bg-white p-2  w-96 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-center text-gray-700 mb-5">
              Enter Information Of Teams
            </p>
            <div className="flex flex-col">
              <input
                type="text"
                className="border border-gray-700 p-2 rounded"
                placeholder="Team Name"
                {...register("name", { required: "Team Name is required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
              <Controller
                name="color"
                control={control}
                defaultValue=""
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="border border-gray-700 p-2 rounded my-3"
                  >
                    <option value="">Select an option</option>
                    <option value="green">Green</option>
                    <option value="pink">Pink</option>
                    <option value="purple">Purple</option>
                  </select>
                )}
              />

              <textarea
                type="text"
                className="border border-gray-700 p-2 rounded mb-5"
                placeholder="Enter Description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-5 py-2 bg-gray-700 text-white rounded"
              >
                Add A Team
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default TeamsAddModal;
