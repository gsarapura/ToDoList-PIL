import { useEffect, useState } from "react";

// Componentes:
import { BotonFiltrar } from "../components/BotonFiltrar";
import { Formulario } from "../components/Formulario";
import { Tarea } from "../components/Tarea";

// Axios:
import axios from "axios";

// Botones:
const FILTER_MAP = {
  Todas: () => true,
  Activas: (task) => !task.completed,
  Completadas: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP) // Arreglo para obtener los nombres


export const Note = () => {

  // Hook para setear tareas:
  const [tasks, setTasks] = useState([]);
  
  // Crear contador para useEffect y evitar loop:
  const [tasksLength, setTasksLength] = useState(0)

  const getCounter = (counter) => {
    setTasksLength(tasksLength + counter)
  };


  // Método GET:
  const baseURL = 'http://localhost:8000/note/note-user/1/' 
  const getUserNotes = async() => {
    try {
      const userNotes = await axios.get(baseURL)
      setTasks(userNotes.data)
    } catch (error) {
      console.log(error)
    };
  }

  useEffect(() => {
    getUserNotes()
  }, [tasksLength])

  // Hooks para setear botones renderizados:
  const [filter, setFilter] = useState("Todas")
  
  // Renderizar cada tareas (<li>):
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Tarea
        id={task.id}
        name={ task.name }
        completed= { task.completed }
        key={ task.id }
        getCounter={ getCounter }
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

  // Título para tareas que quedan por hacer:
  const titleNoun = taskList.length == 1 ? 'tarea' : 'tareas'; 
  const tasksUncompleted = tasks.filter((task) => (task.completed === false)); // Filtrar por incompletas.
  const titleUncompleted = `Hay ${tasksUncompleted.length} ${titleNoun} por hacer:`
  const titleCompleted = "Tareas completadas:"

  const filterTitle = () => {
    if(filter==='Todas' || filter === 'Activas'){
      return titleUncompleted
    }
    else if (filter === 'Completadas'){
      return titleCompleted
    }
  }
  
  return (
    <section className="border rounded bg-light">
      <h1 className="text-center">To Do List</h1>

      <Formulario 
        getCounter={ getCounter } 
      />

      
      { filterList }

      <h2>{ filterTitle() }</h2> 
      <ul>
        { taskList }
      </ul>

      <a href="/" className="">Salir</a>
    </section>
  );
}
