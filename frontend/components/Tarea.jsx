import axios from "axios";
import { useState } from "react";

export const Tarea = (props) => {
  // Counter to send to Note for useEffect:
  const counter = 0

  // Hook for conditional rendering:
  const [isEditing, setEditing] = useState(false);

  // Hook for setting new name:
  const [newName, setNewName] = useState("");
  
  // Similar as done on Formulario.jsx
  function handleChange(e){
    setNewName(e.target.value);
  }

  // Delete method:
  async function deleteTask(id){
    await axios
      .delete(`http://localhost:8000/note/note-detail/${id}/`)
      .then(response => {
        props.getCounter(counter + 1)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  //Put method for name:
  async function handleSubmit(e, id){
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/note/note-detail/${id}/`, {
        name: newName
      })
      .then(response => {
        props.getCounter(counter + 1)
        console.log(response)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    // Reset
    setNewName("");
    setEditing(false);
  }

  // Put method for completed:
   async function handleToggle(e, id, name, completed){
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/note/note-detail/${id}/`, {
        name: name,
        completed: !completed
      })
      .then(response => {
        props.getCounter(counter + 1)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  const editingTemplate = (
    <form onSubmit={ (e) => handleSubmit(e, props.id) }>
      <label htmlFor={ props.id } className="label-tarea">{props.name}</label>
      <input 
        id={ props.id }
        type="text" 
        name="newName" 
        value={ newName }
        onChange={ handleChange }
        autoFocus={ true }
      />
      <div>
        <button type="submit" onClick={ () => setEditing(false) }>Cancelar</button>
        <button type="submit">Guardar</button>
      </div>
    </form>
    );

  const viewTemplate = (
    <> 
      <input 
        id={ props.id } 
        type="checkbox" 
        checked = { props.completed } 
        onClick={ (e) =>  handleToggle(e, props.id, props.name, props.completed) }
      />
      <label htmlFor={ props.id }>{ props.name }</label>
      <div>
        <button type="button" onClick={ () => setEditing(true)}>Editar</button>
        <button type="button" onClick={ () => deleteTask(props.id) }>Eliminar</button>
      </div>
    </> 
    );

  return(
  <li>
    { isEditing? editingTemplate : viewTemplate }  
  </li>
  );
}
