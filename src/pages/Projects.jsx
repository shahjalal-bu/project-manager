import React, { useState, useEffect } from "react";
//Dnd import
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
//Redux import
import { useGetProjectQuery } from "../features/projects/projectsApi";
import { useSelector } from "react-redux";
//utils import
import { COLUMN_NAMES } from "../utils/constants";
//component import
import Error from "../components/ui/Error";
import ProjectAddModal from "../components/ProjectAddModal";
import MovableItem from "../components/MovableItem";
import Column from "../components/Column";
import ProjectsContainer from "../components/ProjectsContainer";


export const Projects = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isSuccess, isError, error, isLoading } =
    useGetProjectQuery(user?.email) || {};

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
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem key={item._id} item={item} search={search} index={index} />
      ));
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <ProjectsContainer
        content={content}
        search={search}
        setSearch={setSearch}
      >
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
      </ProjectsContainer>
    </DndProvider>
  );
};
