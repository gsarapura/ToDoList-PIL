import { Formulario } from "../components/Formulario";
import { Tareas } from "../components/Tareas";

export const App = () => {
  return (
    <>
      <h1>To Do List</h1>

      <Formulario />
      
      <button type="submit" aria-pressed="true">Mostrar todas las tareas</button>
      <button type="submit" aria-pressed="false">Mostrar las tareas por hacer</button>
      <button type="submit" aria-pressed="false">Mostrar las tareas completadas</button>

      <h2>Hay 2 por hacer</h2> 

      <Tareas />
    </>
  );
}
