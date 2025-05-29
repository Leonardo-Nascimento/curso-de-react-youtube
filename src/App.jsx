import { useState } from "react"
import { useEffect } from "react";
import Title from "./components/Title";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));    
  },[tasks]);

  // useEffect(() => {
  //     async function fetchTasks(){

  //         if(JSON.parse(localStorage.getItem("tasks")).length == 0){

  //           const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3', {
  //             method:'GET'
  //           })

  //           const data = await response.json();         
        
  //           console.log(JSON.parse(localStorage.getItem("tasks")));          

  //           setTasks(data)
  //         }
  //       }
        
  //     fetchTasks();
  //   }, []
  // );

  function onTaskClick(taskId){
    const newTask = tasks.map(t => {
      if (t.id === taskId) {
        return {...t, isCompleted: !t.isCompleted}
      }

      return t;
    });

    setTasks(newTask);

  }

    function deleteTask(taskId){
      const newTask = tasks.filter(t => t.id != taskId);

      setTasks(newTask);

    }

    function onAddTaskSubmit(title, description) {
      const newTask = {
        id: tasks.length + 1,
        title: title,
        description: description,
        isCompleted: false
      };

      setTasks([...tasks, newTask]);
    }

    let existTask = tasks.length > 0;

  return (

    
    <div className="bg-slate-500 flex justify-center p-6 h-screen">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
        {
          existTask &&
            <Tasks tasks={tasks} taskClick={onTaskClick} deleteTask={deleteTask}/>
        }         
      </div>
    </div>
  )
}

export default App
