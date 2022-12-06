import { useState } from "react";

export const Formulario = (props) => {
  const [name, setName] = useState("")
  
  // Every key you pressed is set to name:
  function handleChange(e){
    setName(e.target.value);
  }
  
  function handleSubmit(e){
    // Prevent from refreshing entire page:
    e.preventDefault();
    // Sent string to parent:
    props.addTask(name)
    // Reset:
    setName("")
  }

  return(
    <>
      <form onSubmit={ handleSubmit }>
        <input  
          type="text" 
          placeholder="Ingrese una tarea..." 
          onChange={ handleChange } 

          //Not sure what those do:
          name="text" 
          autoComplete="off"
          value={ name }
        />
        
        <button type="submit"> 
          Agregar
        </button>
      </form>
    </>
  )
}
