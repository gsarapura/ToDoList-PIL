import { useEffect, useState } from "react";

// Componentes:
import { BotonFiltrar } from "../../components/Notes/BotonFiltrar/BotonFiltrar";
import { FormularioTarea } from "../../components/Notes/FormularioTarea/FormularioTarea";
import { Tarea } from "../../components/Notes/Tarea/Tarea";

// Axios:
import axios from "axios";

// Reactrouter:
import { useNavigate } from "react-router-dom";

// Chakra UI:
import { 
  Box,
  Button,
  Flex,
  Heading, 
  List, 
  Spacer, 
  VStack} from "@chakra-ui/react";

// Nanoid:
import { nanoid } from "nanoid";

// Botones:
const FILTER_MAP = {
  Todas: () => true,
  Activas: (task) => !task.completed,
  Completadas: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP) // Arreglo para obtener los nombres

export const Note = () => {
  const navigate = useNavigate();

  // Eliminar cuenta:
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

  // Hook para setear tareas:
  const [tasks, setTasks] = useState([]);
  // Obtener tareas de la BD:
  const baseURL = 'http://localhost:8000/note/note-user/1/' 
  const getUserNotes = async() => {
    try {
      const userNotes = await axios.get(baseURL)
      setTasks(userNotes.data)
    } catch (error) {
      console.log(error.response.data)
    };
  }

  // Hook para nombre nuevo de tareas que están en la BD:
  const [newNameTasks, setNewNameTasks] = useState([])
  // Hook para guardar notas temporales y luego enviarlas si se confirma:
  const [tempTasks, setTempTasks] = useState([])

  // Agregar una nota de manera temporal sin afectar la BD:
  const addTask = (values) => {
    const newTask = { 
      id: nanoid(),
      name: values.name,
      id_user: values.id_user,
      completed: false,
    };
    setTasks([...tasks, newTask])
    setTempTasks([...tempTasks, newTask])
  }
  // Editar nombre de una tarea. Hay 3 side effects: setTasks, setNewNameTasks y setTempTasks (not recommended?)
  const updateTask = (id, newName) => {
    const updatedTasksList = tasks.map(task => {
      if (task.id === id){ 
        return  {...task, name: newName} 
      };
      return task
    })
    // Se actualiza para renderizar. No hay cambios en la BD.
    setTasks(updatedTasksList)

    // Se actualiza el nombre de notas registradas en la BD. Se envía por método PUT.
    updatedTasksList.map(task => {
      if(isFinite(task.id) && task.id === id){
        setNewNameTasks([...newNameTasks, task])
        }
      })

    // Se actualiza el nombre de las notas temporales. Se envía por método GET. 
    const newList = updatedTasksList.filter(task => typeof task.id === "string")
    setTempTasks(newList)
  }
 
  // Enviar notas a la BD:
  const confirmTasks = async () => {
    const option = confirm("¿Desea guardar cambios?");
    if(option){
      // Enviar notas temporales (con o sin nombre modificado):
      if(tempTasks.length > 0){
        await axios
          .all(tempTasks.map(taskToConfirm => 
            axios.post(`http://localhost:8000/note/note-user/1/`, taskToConfirm)))
          .then( ()=> {alert("Tareas temporales cargadas."); setTempTasks([])} )
          .catch( (error) => console.log(error.response.data) )
      }
      // Actualizar nombre de notas registradas en la BD:
      if(newNameTasks.length > 0){
        await axios
          .all(newNameTasks.map(nameToConfirm => 
            axios.put(`http://localhost:8000/note/note-detail/${nameToConfirm.id}/`, {name: nameToConfirm.name})))
          .then(() => {alert("Nombres modificados"); setNewNameTasks([])})
          .catch((error) => console.log(error.response.data))
     }
      setTasksLength(tasksLength + 1)
    }
  }

  // Crear contador para useEffect y evitar loop:
  const [tasksLength, setTasksLength] = useState(0)
  const getCounter = (counter) => {
    setTasksLength(tasksLength + counter)
  };
  useEffect(() => {
    getUserNotes()
  }, [tasksLength])

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
        updateTask={ updateTask }
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
    <Box as="main" id="white-background" borderRadius="xl" boxShadow="2xl" w="470px" p={4}>
      <VStack spacing={3} align="center">

        <Heading as="h1" mb={2}>To Do list</Heading>

        <FormularioTarea 
          getCounter={ getCounter } 
          addTask={ addTask } 
        />

        <Flex justify="center">
        { filterList }
        </Flex>

        <Heading as="h3">{ filterTitle() }</Heading>

        <Flex alignSelf="flex-start" ps={14}>
          <List >
            { taskList }
          </List>
        </Flex>

        <Button 
          colorScheme="purple"
          onClick={ () => confirmTasks() }
        >Confirmar cambios</Button>

        <Flex w="100%" pt={2}>
          <Button
            colorScheme="teal"
            type="button" 
            onClick={ () => navigate("/") }>Salir</Button> 
          <Spacer/>
          <Button 
            colorScheme="red"
            type="submit" 
            onClick={ () => handleUserDelete(9) }
            >Eliminar cuenta</Button> 
        </Flex>

      </VStack>
    </Box>
  );
}
