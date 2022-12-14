import { useState } from "react";

export const Tarea = (props) => {
  // Hook for conditional rendering:
  const [isEditing, setEditing] = useState(false);

  // Hook for setting new name:
  const [newName, setNewName] = useState("");
  
  // Similar as done on Formulario.jsx
  function handleChange(e){
    setNewName(e.target.value);
  }

  function handleSubmit(e){
    console.log("Estoy en handleSubmit")
    e.preventDefault();
    props.updateTask(props.id, newName);
    // Reset
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={ handleSubmit }>
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
        onChange={ () => props.toggleTaskCompleted(props.id) }
      />
      <label htmlFor={ props.id }>{ props.name }</label>
      <div>
        <button type="button" onClick={ () => setEditing(true)}>Editar</button>
        <button type="button" onClick={ () => props.deleteTask(props.id)}>Eliminar</button>
      </div>
    </> 
    );

  return(
  <li>
    { isEditing? editingTemplate : viewTemplate }  
  </li>
  );
}
