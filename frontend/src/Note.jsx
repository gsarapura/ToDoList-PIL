import { useEffect, useState } from "react";

// Componentes:
import { BotonFiltrar } from "../components/BotonFiltrar";
import { Formulario } from "../components/Formulario";
import { Tarea } from "../components/Tarea";

// Biblioteca para id:
import { nanoid } from "nanoid";

// Botones:
const FILTER_MAP = {
  Todas: () => true,
  Activas: (task) => !task.completed,
  Completadas: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP) // Arreglo para obtener los nombres

import axios from "axios";

export const Note = (props) => {
  // Axios:
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/note/note-user/1/').then((response) =>{
      setData(response.data);
    })
  }, [])

  console.log(data)
  // Hook para setear tareas:
  const [tasks, setTasks] = useState(props.tasks);

  // Hooks para setear botones renderizados:
  const [filter, setFilter] = useState("Todas")
  
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

  // Renderizar cada tareas (<li>):
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
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

  // Renderizar botones:
  const filterList = FILTER_NAMES.map((name) => (
    <BotonFiltrar 
      key={ name } 
      name={ name }
      isPressed={ name === filter }
      // Envio hook:
      setFilter={ setFilter }
    />
  ))
  
  //Función para que el componente hijo envié la tarea y agregué la tarea a tasks:
  const addTask = (name) => { 
    const newTask = {id: `tarea-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  // Título para tareas que quedan por hacer:
  const titleNoun = taskList.length == 1 ? 'tarea' : 'tareas'; 
  const tasksUncompleted = tasks.filter((task) => (task.completed === false)); // Filtrar por incompletas.
  const titleUncompleted = `Hay ${tasksUncompleted.length} ${titleNoun} por hacer:`
  const titleCompleted = "Tareas completadas:"


  return (
    <section className="border rounded bg-light">
      <h1 className="text-center">To Do List</h1>

      <Formulario addTask={ addTask }/>
      
      { filterList }

      <h2>{ titleUncompleted }</h2> 
      <ul>
        { taskList }
      </ul>

      <a href="/" className="">Salir</a>
    </section>
  );
}
