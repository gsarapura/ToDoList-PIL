import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  FormControl, 
  FormLabel, 
  Input,
  Heading,
  Flex,
  Spacer,
  Button } from "@chakra-ui/react";


export const Signup = () => {
  const navigate = useNavigate()

  // Fotmil:
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      name: "",
      last_name: "",
      password: ""
    },
    onSubmit: (values) => {
      axios
        .post('http://localhost:8000/user/user-list/', values)
        .then(response => {
          console.log(response)
          alert("Usuario creado con éxito.")
          navigate("/")
        })
        .catch(error => {
          console.log(error.response.data)
          alert("Hubo un error.")
        })
    } 
  });

  return(
    <Box as="main" borderColor="gray.200" p={6} boxShadow="2xl">
      <Heading as="h1" textAlign="center">Registro</Heading>

      <form onSubmit={ formik.handleSubmit }>
        <FormControl isRequired>
          <FormLabel>Usuario</FormLabel>
            <Input 
              type="text" 
              name="username" 
              placeholder="Ingrese usuario"
              onChange={ formik.handleChange }
              mb={6}
            /> 

          <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              name="email" 
              placeholder="Ingrese email"
              onChange={ formik.handleChange }
              mb={6}
            /> 

        </FormControl>

        <FormControl>
          <FormLabel>Nombre</FormLabel>
            <Input 
              type="text" 
              name="name" 
              placeholder="Ingrese nombre"
              onChange={ formik.handleChange }
              mb={6}
            /> 

          <FormLabel>Apellido</FormLabel>
            <Input 
              type="text" 
              name="last_name" 
              placeholder="Ingrese apellido"
              onChange={ formik.handleChange }
              mb={6}
            /> 
        </FormControl>


        <FormControl isRequired>
          <FormLabel>Contraseña</FormLabel>
            <Input 
              type="password" 
              name="password" 
              placeholder="Ingrese contraseña"
              onChange={ formik.handleChange }
              mb={6}
            /> 
        </FormControl>

        <Flex>
          <Button 
            colorScheme="teal"
            variant="outline"
            type="button" 
            onClick={ () => navigate("/") }>Volver</Button> 
          <Spacer/>
          <Button 
            colorScheme="teal"
            type="submit" 
            >Confirmar</Button> 
        </Flex>

      </form>
    </Box>
  );
};
