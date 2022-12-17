import { useState } from "react";

export const Login = () => {
  
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
  

  return(
    <section className="border rounded bg-light">
      <h1 className="text-center">Ingreso</h1>
      <form>

        <div className="form-group">
          <label >Usuario</label>
          <input 
            className="form-control" 
            type="text" 
            name="username" 
            placeholder="Ingrese usuario"
            onChange={ handleChange }
          />
        </div>

        <div className="form-group">
          <label >Contraseña</label>
          <input 
            className="form-control" 
            type="password" 
            name="password" 
            placeholder="Ingrese contraseña"
            onChange={ handleChange }
          />
        </div>

        <span className="text-start">
          <button type="submit" className="btn btn-light">
            <a className="link-primary" href="/registro">Registro</a></button> 
        </span>
       
        <span className="text-end">
          <button type="submit" className="btn btn-primary">
            <a className="link-light" href="/notas">Ingresar</a></button> 
        </span>

      </form>
    </section>
  );
};
