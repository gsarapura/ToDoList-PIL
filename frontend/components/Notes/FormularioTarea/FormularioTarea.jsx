import { 
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement } from "@chakra-ui/react";

import { useFormik } from "formik";

export const FormularioTarea = (props) => {
  //id_user:
  const id_user = 1

  // Formik:
  const formik = useFormik({
    initialValues: {
      name: "",
      id_user: id_user
    },
    onSubmit: (values, {resetForm}) => {
      props.addTask(values)
      resetForm();
    } 
  })

  return(
    <form onSubmit={ formik.handleSubmit } style= {{ width: "100%"}}> 
      <FormControl >
        <InputGroup>
        <Input  
          type="text" 
          name="name" 
          placeholder="Ingrese una tarea..." 
          onChange={ formik.handleChange } 
          value={formik.values.name}
          autoFocus={ true }
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
