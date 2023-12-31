import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  //the projects state is stored in the App component so it is usable in both the projects side bar
  //and the NoProjectsSelected component
  const[projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });
  //function is called on the SelectedProject component, takes text as a variable
  function handleAddTask(text) {
    //updates the project state, whilst taking in the previous state so its not lost
    setProjectsState((prevState) => {
      //random number to generate for the unique task ID
      const taskId = Math.random();
      //adds the task text, unique ID and the selected project its assosciated with to a local task object
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      //returns the new task stored in the tasks array, along with the previous tasks so they're not wiped
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }
//function called in the selected project component, takes id of the task as a parameter
  function handleDeleteTask(id){
    //calls the state setter of setProjectState and takes the previous state as a parameter
    setProjectsState((prevState) => {
      return {

        ...prevState,
        //filteres out all the tasks which dont match the id passed in as a parameter
        //then the task that matches the id of the parameter is removed from the tasks array
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        )
      }
    })
  }
  function handleSelectProject(id) {
    setProjectsState(prevState => {
      //called when a project from the sidebar is selected, takes the ID of the selected project and sets it to the
      //selectedProjectId in the project state object
      return {
        ...prevState,
        selectedProjectId: id
      }
    });
  }
  //called at the start when a project is to be added, sets the current selected project ID to null so a new one can be added
  //with the new project
  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    });
  }
  //called on the new project component, resets the selectedProjectId to undefined
  //so you are taken back to the noproject selected screen
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }
  //Called on the new project component, receives the new project data as a parameter on the new project component
  function handleAddProject(projectData){
    setProjectsState(prevState => {
      //set a random number for the unique ID of the project
      const projectId = Math.random();
      //creating an object of the new project data and the random unique ID
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {
        //spread the previous projects into the projects array so that they're not lost when a new project is added
        ...prevState,
        //returns to the no project selected screen by making selectedProjectId undefined upon adding
        selectedProjectId: undefined,
        //add the new project to the projects array in the state as well as the previous projects so they're not wiped
        projects: [...prevState.projects, newProject],

      }
    })
  }
  //called on the selected project component
  function handleDeleteProject(){
    //takes the previous state as a parameter
    setProjectsState((prevState) => {
      return {
        //returns the previous state with the selected project ID filtered out of the projects array in the previous state
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        )
      }
    })
  }
  //stores a selected Project variable which holds the id of the current project in the projectState, to be used in the slectedproject
  //component
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = (
    <SelectedProject 
      project={selectedProject} 
      onDelete={handleDeleteProject} 
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );
  //selectedProjectId is undefined if we're not adding a new project and null if we are
  if(projectsState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected  onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar 
         onStartAddProject={handleStartAddProject}
         projects={projectsState.projects}
         onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProjectId}   
      />
      {content}
    </main>
  );
}

export default App;
