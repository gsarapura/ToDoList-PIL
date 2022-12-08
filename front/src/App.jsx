import { useState } from "react";

// Componentes:
import { BotonFiltrar } from "../components/BotonFiltrar";
import { Formulario } from "../components/Formulario";
import { Tarea } from "../components/Tarea";

// Biblioteca para id:
import { nanoid } from "nanoid";

export const App = (props) => {
  const [tasks, setTasks] = useState(props.tasks);
  
  // Marcar como completado o no:
  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        // Usar object spread para hacer un nuevo objeto.
        // Modificar el booleano:
        return {...task, completed: !task.completed}

      }
      // Si no hay cambios, retornar el objeto original
      return task;
    });

    setTasks(updatedTasks);
  }

  // Eliminar tarea:
  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // Actualizar tarea:
  function updateTask(id, newName){
    const updateNameList = tasks.map((task) => {
      if (id == task.id){
        return {...task, name: newName}
      };
      return task
    });

    setTasks(updateNameList);
  }

  // Crear cada <li>:
  const taskList = tasks.map((task) => (
    <Tarea
      id={task.id}
      name={ task.name }
      completed= { task.completed }
      key={ task.id }
      toggleTaskCompleted={ toggleTaskCompleted }
      deleteTask={ deleteTask }
      updateTask={ updateTask }
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
