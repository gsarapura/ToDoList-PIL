import { BotonFiltrar } from "../components/BotonFiltrar";
import { Formulario } from "../components/Formulario";
import { Tarea } from "../components/Tarea";

export const App = (props) => {
  const taskList = props.tasks?.map((task) => (
    <Tarea
      id={task.id}
      name={ task.name }
      completed= { task.completed }
      key={ task.id }
    />
  ));

  return (
    <>
      <h1>To Do List</h1>

      <Formulario />
      
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
