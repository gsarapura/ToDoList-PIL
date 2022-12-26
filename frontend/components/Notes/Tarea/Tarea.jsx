import { 
  Box,
  Button,
  Checkbox,
  Flex, 
  Input} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";

export const Tarea = (props) => {
  // Counter to send to Note for useEffect:
  const counter = 0

  // Formik:
  const formik = useFormik({
    initialValues: {

    }
  })

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
    <Box bg="gray.100" p={1} mb={2}>
      <form onSubmit={ (e) => handleSubmit(e, props.id) }>
        <Box as="label" fontSize="lg" htmlFor={ props.id }>{ props.name }</Box>
        <Input 
          id={ props.id }
          type="text" 
          name="newName" 
          size="sm"
          value={ newName }
          onChange={ handleChange }
          autoFocus={ true }
        />
      <Flex mt={3} pb={2}>
        <Button
          colorScheme="orange"
          variant="ghost"
          type="button" 
          size="sm"
          me={3}
          onClick={ () => setEditing(false) }>Cancelar</Button> 
        <Button 
          colorScheme="blue"
          variant="ghost"
          size="sm"
          type="submit" 
          >Guardar</Button> 
      </Flex>
      </form>
    </Box>
    );

  const viewTemplate = (
    <Box as="section" mb={2}>
      <Checkbox 
        id={ props.id } 
        colorScheme="green"
        size="lg"
        defaultChecked = { props.completed } 
        onChange={ (e) =>  handleToggle(e, props.id, props.name, props.completed) }
      >
      <label htmlFor={ props.id }></label>{ props.name }
      </Checkbox>

      <Flex mt={2}>
        <Button
          colorScheme="blue"
          variant="outline"
          type="button" 
          size="sm"
          me={3}
          onClick={ () => setEditing(true) }>Editar</Button> 
        <Button 
          colorScheme="red"
          variant="outline"
          size="sm"
          type="submit" 
          onClick={ () => deleteTask(props.id)}
          >Eliminar</Button> 
      </Flex>

    </Box>
    );

  return(
  <li className="list-group-item">
    { isEditing? editingTemplate : viewTemplate }  
  </li>
  );
}
