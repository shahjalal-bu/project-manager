import React, { useRef } from "react";
import moment from "moment";
import { useDrag, useDrop } from "react-dnd";
import {
  useDeleteProjectMutation,
  useUpdateColumnMutation,
} from "../../../features/projects/projectsApi";
import { COLUMN_NAMES } from "../../../utils/constants";
import { ItemTypes } from "../../../utils/ItemTypes";
import deleteImage from "../../../assets/images/delete.svg";
import Calendar from "../../../assets/images/Calendar";
import { useAuth } from "../../../contexts/authContext";
import { useSearch } from "../../../contexts/searchContext";

const MovableItem = ({ index, item }) => {
  const {
    _id,
    createor,
    name,
    description,
    projectName,
    createorPhoto,
    createdAt,
    teamColor,
    column,
  } = item;
  const [updateColumn, data] = useUpdateColumnMutation() || {};
  const [deleteProject, {}] = useDeleteProjectMutation();
  const { currentUser } = useAuth();
  const { search } = useSearch();
  
  const changeItemColumn = (columnName) => {
    updateColumn({
      _id,
      data: {
        column: columnName,
        userEmail: currentUser.email,
      },
    });
  };
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
  });

  // make drag able

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { index, name, _id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const { name } = dropResult;
        Object.entries(COLUMN_NAMES).forEach(([_, el]) => {
          if (el === name) {
            changeItemColumn(name);
          }
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.1 : 1;
  drag(drop(ref));
  //Each time search string change i can't trigger no api call so i think debounce no need
  const match =
    description.toLowerCase().includes(search?.toLowerCase()) && search !== "";

  return (
    <>
      <div
        className={`relative flex flex-col items-start p-4 mt-3 bg-white ${
          match && "bg-pink-200 border-2 border-pink-500"
        } rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100`}
        draggable="true"
        ref={ref}
        style={{ opacity }}
      >
        {column === COLUMN_NAMES.BACKLOG && (
          <button
            onClick={() => deleteProject(_id)}
            className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
          >
            <img src={deleteImage} alt="delete" />
          </button>
        )}

        <span
          className={`flex items-center h-6 px-3 text-xs font-semibol  text-${teamColor}-500 bg-${teamColor}-100  rounded-full`}
        >
          {projectName}
        </span>
        <h4 className="mt-3 text-sm font-medium">{description}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <Calendar />
            <span className="ml-1 leading-none">
              {moment(createdAt).format("DD MM YYYY")}
            </span>
          </div>

          <img
            className="w-6 h-6 ml-auto rounded-full"
            src={
              createorPhoto
                ? createorPhoto
                : `https://randomuser.me/api/portraits/men/3.jpg`
            }
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default MovableItem;
