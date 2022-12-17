import { useEffect, useState } from "react";

// Componentes:
import { BotonFiltrar } from "../components/BotonFiltrar";
import { Formulario } from "../components/Formulario";
import { Tarea } from "../components/Tarea";

// Axios:
import axios from "axios";

// Reactrouter:
import { useNavigate } from "react-router-dom";

// Botones:
const FILTER_MAP = {
  Todas: () => true,
  Activas: (task) => !task.completed,
  Completadas: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP) // Arreglo para obtener los nombres


export const Note = () => {
  const navigate = useNavigate();

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

  // Método DELETE:
  const handleUserDelete = async(id) => {
    let option = confirm("¿Quiere eliminar su cuenta?")
    if (option){
      await axios
        .delete(`http://localhost:8000/user/user-detail/${id}/`)
        .then(response => {
          console.log(response.data)
          alert("Eliminada correctamente.")
        })
        .catch(error => {
          error.response.data
          alert("Hubo un error.")
        })
    }
  }

  // Hook para setear tareas:
  const [tasks, setTasks] = useState([]);
  
  // Crear contador para useEffect y evitar loop:
  const [tasksLength, setTasksLength] = useState(0)

  const getCounter = (counter) => {
    setTasksLength(tasksLength + counter)
  };

  useEffect(() => {
    getUserNotes()
  }, [tasksLength])

  // Hook para setear nombre de botones:
  const [filter, setFilter] = useState("Todas")

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

  // Renderizar cada tarea (<li>):
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

  // Título para tareas que quedan por hacer:
  const tasksUncompleted = tasks.filter((task) => (task.completed === false)); // Filtrar por incompletas.
  const titleNoun = tasksUncompleted.length == 1 ? 'tarea' : 'tareas'; 
  const titleUncompleted = `Hay ${tasksUncompleted.length} ${titleNoun} por hacer:`

  const tasksCompleted = tasks.filter((task) => (task.completed === true ));
  const titleNo = tasksCompleted.length == 1 ? 'tarea completada' : 'tareas completadas'
  const titleCompleted = `${tasksCompleted.length} ${titleNo}:`

  const filterTitle = () => {
    if(filter==='Todas' || filter === 'Activas'){
      return titleUncompleted
    }
    else if (filter === 'Completadas'){
      return titleCompleted
    }
  }
  
  return (
    <section className="border rounded bg-light p-2">
      <h1 className="text-center">To Do List</h1>

      <Formulario 
        getCounter={ getCounter } 
      />

      
      { filterList }

      <h2>{ filterTitle() }</h2> 
      <ul className="list-group-flush">
        { taskList }
      </ul>

      <div className="d-flex">
        <button 
          type="button" 
          className="btn btn-dark me-auto"
          onClick={ () => navigate("/")}>Salir</button>
        <button 
          type="button" 
          className="btn btn-danger ms-auto"
          onClick={ () => handleUserDelete(9) }>Eliminar cuenta</button> 
      </div>

    </section>
  );
}
