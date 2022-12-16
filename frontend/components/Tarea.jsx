import axios from "axios";
import { useState } from "react";

export const Tarea = (props) => {
  // Counter to send to Note for useEffect:
  const counter = 0

  // Delete method:
  function deleteTask(id){
    axios
      .delete(`http://localhost:8000/note/note-detail/${id}/`)
      .then(response => {
        props.getCounter(counter + 1)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

 
  // Hook for conditional rendering:
  const [isEditing, setEditing] = useState(false);

  // Hook for setting new name:
  const [newName, setNewName] = useState("");
  
  // Similar as done on Formulario.jsx
  function handleChange(e){
    setNewName(e.target.value);
  }

  //Put method for name:
  function handleSubmit(e, id){
    e.preventDefault();
    axios
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
   function handleToggle(e, id, name, completed){
    e.preventDefault();
    axios
      .put(`http://localhost:8000/note/note-detail/${id}/`, {
        name: name,
        completed: !completed
      })
      .then(response => {
        props.getCounter(counter + 1)
        console.log(response)
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
        defaultChecked = { props.completed } 
        onChange={ (e) =>  handleToggle(e, props.id, props.name, props.completed) }
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
