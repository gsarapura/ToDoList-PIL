import { useState } from "react";

// Componentes:
import { BotonFiltrar } from "../components/BotonFiltrar";
import { Formulario } from "../components/Formulario";
import { Tarea } from "../components/Tarea";

export const App = (props) => {
  const [tasks, setTasks] = useState(props.tasks);
  console.log(tasks)
  const taskList = tasks.map((task) => (
    <Tarea
      id={task.id}
      name={ task.name }
      completed= { task.completed }
      key={ task.id }
    />
  ));
  
  //Función para que el componente hijo envié la tarea:
  const addTask = (name) => { 
    const newTask = {id: "id", name, completed: false};
    setTasks([...tasks, newTask]);
  }

  return (
    <>
      <h1>To Do List</h1>

      <Formulario addTask={ addTask }/>
      
      <BotonFiltrar name= "Mostrar todas las tareas"/>
      <BotonFiltrar name= "Mostrar las tareas por hacer"/>
      <BotonFiltrar name= "Mostrar las tareas completadas"/>

      <h2>Hay { taskList.length } por hacer</h2> 
      <ul>
        { taskList }
      </ul>
    </>
  );
}
