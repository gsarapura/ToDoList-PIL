import { useState } from "react";

// Componentes:
import { BotonFiltrar } from "../components/BotonFiltrar";
import { Formulario } from "../components/Formulario";
import { Tarea } from "../components/Tarea";

// Library para id's:
import { nanoid } from "nanoid";

export const App = (props) => {
  const [tasks, setTasks] = useState(props.tasks);

  // Crear cada <li>:
  const taskList = tasks.map((task) => (
    <Tarea
      id={task.id}
      name={ task.name }
      completed= { task.completed }
      key={ task.id }
    />
  ));
  
  //Función para que el componente hijo envié la tarea y agregué la tarea a tasks:
  const addTask = (name) => { 
    const newTask = {id: `tarea-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  // Título para tareas que quedan por hacer:
  const titleNoun = taskList.length == 1 ? 'tarea' : 'tareas'; 
  const titleHeading = `Hay ${taskList.length} ${titleNoun} por hacer:`

  return (
    <>
      <h1>To Do List</h1>

      <Formulario addTask={ addTask }/>
      
      <BotonFiltrar name= "Mostrar todas las tareas"/>
      <BotonFiltrar name= "Mostrar las tareas por hacer"/>
      <BotonFiltrar name= "Mostrar las tareas completadas"/>

      <h2>{ titleHeading }</h2> 
      <ul>
        { taskList }
      </ul>
    </>
  );
}
