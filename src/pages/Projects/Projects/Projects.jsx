import React, { useState, useEffect } from "react";
//Dnd import
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
//Redux import
import { useGetProjectQuery } from "../../../features/projects/projectsApi";
import { useSelector } from "react-redux";
//utils import
import { COLUMN_NAMES } from "../../../utils/constants";
//component import
import Error from "../../shared/Error";
import ProjectAddModal from "../ProjectAddModal/ProjectAddModal";
import MovableItem from "../MoveAbleItem/MovableItem";
import Column from "../Column/Column";
import { useAuth } from "../../../contexts/authContext";

export const Projects = () => {
  // const { user } = useSelector((state) => state.auth);
  const { currentUser } = useAuth();
  const { data, isSuccess, isError, error, isLoading } =
    useGetProjectQuery(currentUser?.email) || {};

  //For modal control
  const [control, setControl] = useState(false);
  //For seaching
  const [search, setSearch] = useState("");
  //For store data with useEffect
  const [projectData, setProjectData] = useState([]);

  //Decide what to render
  let content = null;
  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <li className="m-2 text-center">No project found!</li>;
  }

  useEffect(() => {
    if (isSuccess) {
      setProjectData(data);
    }
  }, [data, isSuccess]);

  //React Dnd For Touch sceen Mobile

  const isMobile = window.innerWidth < 600;

  //create data for each column

  const returnItemsForColumn = (columnName) => {
    return projectData
      .filter((item) => {
        return item.column === columnName;
      })
      .map((item, index) => (
        <MovableItem key={item._id} item={item} search={search} index={index} />
      ));
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
      </div>
      {content}
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
        {Object.entries(COLUMN_NAMES).map(([key, el], index) => (
          <Column
            key={index}
            title={el}
            length={returnItemsForColumn(el).length}
            setControl={setControl}
          >
            {returnItemsForColumn(el)}
          </Column>
        ))}
        {control && (
          <ProjectAddModal setControl={setControl} control={control} />
        )}
      </div>
    </DndProvider>
  );
};
