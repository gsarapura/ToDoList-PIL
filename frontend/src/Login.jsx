import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
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
    navigate("/notas")
  } 
  

  return(
    <section className="border rounded bg-light p-3">
      <h1 className="text-center">Ingreso</h1>
      <form onSubmit= { handleSubmit }>

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
            className="btn btn-dark me-auto"
            onClick={ () => navigate("/registro") }>Registro</button> 
          <button 
            type="submit" 
            className="btn btn-primary ms-auto">Ingresar</button> 
        </div>

      </form>
    </section>
  );
};
