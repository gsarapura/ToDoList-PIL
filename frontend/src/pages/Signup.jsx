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
  VStack } from "@chakra-ui/react";


export const Signup = () => {
  const navigate = useNavigate()
  
  // Formik validation:
  const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Requerido.'; 
    }

    if (!values.password) {
      errors.password = 'Requerido.'; 
    } else if (values.password.length < 8){
      errors.password = "Debe ser de al menos 8 carácteres."
    }

    if (!values.email) {
      errors.email = 'Requerido.'; 
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Dirección de email inválido.';
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
    },
    validate,
  });

  return(
    <Box as="main" id="white-background" borderRadius="xl" p={6} boxShadow="2xl">
      <Heading as="h1" textAlign="center" mb={4}>Registro</Heading>

      <form onSubmit={ formik.handleSubmit }>
        <VStack spacing={6} align="flex-start"> 
          <FormControl isRequired isInvalid={ formik.errors.username && formik.touched.username }>
            <FormLabel htmlFor="username">Usuario</FormLabel>
            <Input 
              id="username"
              type="text" 
              name="username" 
              placeholder="Ingrese usuario"
              onChange={ formik.handleChange }
              value={ formik.values.username }
            /> 
            {
              formik.errors.username
              ? <FormErrorMessage mb={-4}>{formik.errors.username}</FormErrorMessage> 
              : null
            } 
          </FormControl>

          <FormControl isRequired isInvalid={ formik.errors.email && formik.touched.email}>
            <FormLabel>Email</FormLabel>
            <Input 
              id="email"
              type="email" 
              name="email" 
              placeholder="Ingrese email"
              onChange={ formik.handleChange }
              values={ formik.values.email }
            />
            {
              formik.errors.email
              ? <FormErrorMessage mb={-4}>{formik.errors.email}</FormErrorMessage> 
              : null
            } 
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

          <FormControl isRequired isInvalid={ formik.errors.password && formik.touched.password }>
            <FormLabel>Contraseña</FormLabel>
            <Input 
              id="password"
              type="password" 
              name="password" 
              placeholder="Ingrese contraseña"
              onChange={ formik.handleChange }
              value={ formik.values.password }
            /> 
            {
              formik.errors.password 
              ? <FormErrorMessage mb={-4}>{formik.errors.password}</FormErrorMessage> 
              : null
            }
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
