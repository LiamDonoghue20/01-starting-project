import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";

function App() {
  //the projects state is stored in the App component so it is usable in both the projects side bar
  //and the NoProjectsSelected component
  const[projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    });
  }

  function handleAddProject(projectData){
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        Id: Math.random()
      }
      return {
        //spread the previous projects into the projects array so that they're not lost when a new project is added
        ...prevState,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  console.log(projectsState)
  let content;
  //selectedProjectId is undefined if we're not adding a new project and null if we are
  if(projectsState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject}/>
  } else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected  onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar onStartAddProject={handleStartAddProject}/>
      {content}
    </main>
  );
}

export default App;
