import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
  const navigate = useNavigate()
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    name: "",
    last_name: "",
    password: ""
  })

  function handleChange(e){
    setSignupInfo({
      ...signupInfo,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()

    axios
      .post('http://localhost:8000/user/user-list/', signupInfo)
      .then(response => {
        console.log(response)
        navigate("/")
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  return(
    <>
      <section className="border rounded bg-light p-2">
        <h1 className="text-center">Registro</h1>
        <form onSubmit={ handleSubmit }>

          <div className="form-group mb-2">
            <label >Usuario</label>
            <input 
              className="form-control" 
              type="text" 
              name="username" 
              placeholder="Ingrese usuario"
              onChange={ handleChange }
           /> 
          </div>

          <div className="form-group mb-2">
            <label >Email</label>
            <input 
              className="form-control" 
              type="email" 
              name="email" 
              placeholder="Ingrese email" 
              onChange={ handleChange }
            /> 
          </div>

          <div className="form-group mb-2">
            <label >Nombre (opcional)</label>
            <input 
              className="form-control" 
              type="text" 
              name="name" 
              placeholder="Ingrese nombre"
              onChange={ handleChange }
            /> 
          </div>

          <div className="form-group mb-2">
            <label >Apellido (opcional)</label>
            <input 
              className="form-control" 
              type="text" 
              name="last_name" 
              placeholder="Ingrese apellido"
              onChange={ handleChange }
            /> 
          </div>

          <div className="form-group mb-3">
            <label >Contraseña</label>
            <input 
              className="form-control" 
              type="password" 
              name="password" 
              placeholder="Ingrese contraseña"
              onChange={ handleChange }
            />
          </div>

          <div className="d-flex">
            <button 
              type="button" 
              className="btn btn-light me-auto"
              onClick={ () => navigate("/")}>Volver</button> 
            <button 
              type="submit" 
              className="btn btn-primary"
              >Confirmar</button> 
          </div>

        </form>
      </section>
    </>
  );
};
