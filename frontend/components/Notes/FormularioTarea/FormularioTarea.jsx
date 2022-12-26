import { 
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement } from "@chakra-ui/react";

import axios from "axios";
import { useFormik } from "formik";

export const FormularioTarea = (props) => {
  // Counter to send to Note for useEffect:
  const counter = 0

  //id_user:
  const id_user = 1

  // Formik:
  const formik = useFormik({
    initialValues: {
      name: "",
      id_user: id_user
    },
    onSubmit: (values, {resetForm}) => {
      console.log("a")
      axios
        .post(`http://localhost:8000/note/note-user/${id_user}/`, values)
        .then(response => {
          // Send counter to Note:
          props.getCounter(counter + 1)
          console.log(response.data)
          resetForm();
        })
        .catch(error => {
          console.log(error.response.data)
        })
    } 
  })

  return(
    <form onSubmit={ formik.handleSubmit }> 
    <FormControl mb={2} >
      <InputGroup>
      <Input  
        type="text" 
        name="name" 
        placeholder="Ingrese una tarea..." 
        onChange={ formik.handleChange } 
        autoFocus={ true }
        value={formik.values.name}

        //Not sure what those do:
      />
     
      <InputRightElement w='4.5 rem'>
        <Button 
          colorScheme="linkedin"
          variant="outline"
          type="submit" 
          disabled={props.isSubmitting}

          >Agregar
        </Button>
      </InputRightElement>
      </InputGroup>
    </FormControl>
    </form>
  )
}
