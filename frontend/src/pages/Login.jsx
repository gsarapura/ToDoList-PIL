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

export const Login = () => {
  // Show password:
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // React router:
  const navigate = useNavigate()
  
  // Capturar info:
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: ""
  })

  function handleChange(e) {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("hola")
    axios
      .post('http://localhost:8000/user/login/', loginInfo)
      .then(response => {
        console.log(response.data) //Context usuario tal. (Cookie)
        navigate("/notas")
      })
      .catch(error => {
        console.log(error.response.data)
        alert("Hubo un error de ingreso.")
      })
  } 
  

  return(
    <Box as="main" borderColor="gray.200" p={6} boxShadow="2xl">
      <Heading as="h1" textAlign="center">Ingreso</Heading>

      <FormControl onSubmit= { handleSubmit }>

        <FormLabel>Usuario</FormLabel>
        <Input 
          type="text" 
          name="username" 
          placeholder="Ingrese usuario"
          onChange={ handleChange }
          mb={6}
        />


        <FormLabel >Contraseña</FormLabel>
        <InputGroup size="md">
          <Input 
            className="form-control" 
            type={ show ? "text" : "password" } 
            name="password" 
            placeholder="Ingrese contraseña"
            onChange={ handleChange }
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
