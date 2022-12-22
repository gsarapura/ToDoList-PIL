import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { 
  Box,
  Button, 
  Heading, 
  Input,
  FormControl, 
  FormLabel,
  Flex,
  Spacer,
  InputGroup,
  InputRightElement} from "@chakra-ui/react";
import { useFormik } from "formik";

export const Login = () => {
  // React router:
  const navigate = useNavigate()

  // Show password:
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // Formik:
  const formik = useFormik({
    initialValues: {
      username: "",
      password:""
    },
    onSubmit: (values) => {
      axios
        .post('http://localhost:8000/user/login/', values)
        .then(response => {
          console.log(response.data) //Context usuario tal. (Cookie)
          navigate("/notas")
        })
        .catch(error => {
          console.log(error.response.data)
          alert("Hubo un error de ingreso.")
        })
    }
  });
  
  return(
    <Box as="main" borderColor="gray.200" p={6} boxShadow="2xl">
      <Heading as="h1" textAlign="center">Ingreso</Heading>
      <FormControl as="form" onSubmit= { formik.handleSubmit }>
        <FormLabel>Usuario</FormLabel>
        <Input 
          type="text" 
          name="username" 
          placeholder="Ingrese usuario"
          onChange={ formik.handleChange }
          mb={6}
        />

        <FormLabel >Contraseña</FormLabel>
        <InputGroup>
          <Input 
            className="form-control" 
            type={ show ? "text" : "password" } 
            name="password" 
            placeholder="Ingrese contraseña"
            onChange={ formik.handleChange }
            mb={6}
          />
          <InputRightElement width='4.5rem'>
            <Button h="1.75rem" size="sm" onClick = { handleClick }>
            { show ? 'Hide': 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Flex>
          <Button 
            colorScheme="teal"
            variant="outline"
            type="button" 
            onClick={ () => navigate("/registro") }>Registro</Button> 
          <Spacer/>
          <Button 
            colorScheme="teal"
            type="submit" 
            >Ingresar</Button> 
        </Flex>

      </FormControl>
    </Box>
  );
};
