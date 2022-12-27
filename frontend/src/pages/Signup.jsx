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
  Button, 
  FormErrorMessage,
  VStack} from "@chakra-ui/react";


export const Signup = () => {
  const navigate = useNavigate()
  
  // Formik validation:
  const validate = values => {
    const errors = {};
    if (values.password.length < 8){
      errors.password = "Debe ser de al menos 8 carácteres."
    }
    return errors
  }

  // Formik:
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      name: "",
      last_name: "",
      password: ""
    },
    validate,
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
    <Box as="main" id="white-background" borderRadius="xl" p={6} boxShadow="2xl">
      <Heading as="h1" textAlign="center" mb={4}>Registro</Heading>

      <form onSubmit={ formik.handleSubmit }>
        <VStack spacing={6} align="flex-start"> 
          <FormControl isRequired >
            <FormLabel htmlFor="username">Usuario</FormLabel>
            <Input 
              id="username"
              type="text" 
              name="username" 
              placeholder="Ingrese usuario"
              onChange={ formik.handleChange }
              value={ formik.values.username }
            /> 
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              id="email"
              type="email" 
              name="email" 
              placeholder="Ingrese email"
              onChange={ formik.handleChange }
              values={ formik.values.email }
            /> 
          </FormControl>

          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input 
              id="name"
              type="text" 
              name="name" 
              placeholder="Ingrese nombre"
              onChange={ formik.handleChange }
              value={ formik.values.name }
            /> 
          </FormControl>

          <FormControl>
            <FormLabel>Apellido</FormLabel>
            <Input 
              id="last_name"
              type="text" 
              name="last_name" 
              placeholder="Ingrese apellido"
              onChange={ formik.handleChange }
              value={ formik.values.last_name }
            /> 
          </FormControl>

          <FormControl isRequired isInvalid={ formik.errors.password }>
            <FormLabel>Contraseña</FormLabel>
            <Input 
              id="password"
              type="password" 
              name="password" 
              placeholder="Ingrese contraseña"
              onChange={ formik.handleChange }
              value={ formik.values.password }
            /> 
            {formik.errors.password ? <FormErrorMessage mb={-4}>{formik.errors.password}</FormErrorMessage> : null}
          </FormControl>
          
          <FormControl>
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
          </FormControl>

        </VStack>
      </form>
    </Box>
  );
};
