import axios from "axios";
import { useState } from "react";

export const Formulario = (props) => {
  const [name, setName] = useState("")

  // Counter to send to Note for useEffect:
  const counter = 0

  
  // Every key you pressed is set to name:
  function handleChange(e){
    setName(e.target.value);
  }
  
  //id_user:
  const id_user = 1
  //Axios:
  function createNote(e){
    // Prevent from refreshing entire page:
    e.preventDefault();
    // Send data to DB:
    axios
      .post(`http://localhost:8000/note/note-user/${id_user}/`, {
        name: name,
        id_user: id_user
      })
      .then(response => {
        // Send counter to Note:
        props.getCounter(counter + 1)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    // Reset:
    setName("");
  }

  return(
    <form onSubmit={ createNote }>
      <input  
        type="text" 
        placeholder="Ingrese una tarea..." 
        onChange={ handleChange } 
        autoFocus={ true }

        //Not sure what those do:
        name="text" 
        autoComplete="off"
        value={ name }
      />
      
      <button type="submit"> 
        Agregar
      </button>
    </form>
  )
}
