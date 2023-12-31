import { useState } from "react"

export default function NewTask({ onAdd }) {
    //state to re-render the task component when a new task is added
    const [enteredTask, setEnteredTask] = useState('');
    //sets the entered tasks to the value coming from the input field
    function handleChange(event){
        setEnteredTask(event.target.value)
    }
    
    function handleClick(){
        //if a task with a blank string is added, return immediately so the task isn't saved
        if(enteredTask === ""){
            return;
        }
        //call the onAdd functionm passed to the component with the task that has been entered
        onAdd(enteredTask)
        //reset the input field so its blank after the task has been saved
        setEnteredTask('')
    }

    return <div className="flex items-center gap-4">
        <input type="text" className="w-62 px-2 py-1 rounded-sm bg-stone-200" value={enteredTask} onChange={handleChange}/>
        <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
    </div>
}