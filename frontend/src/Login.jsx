export const Login = () => {
  return(
    <section className="border rounded bg-light">
      <h1 className="text-center">Ingreso</h1>
      <form>

        <div className="form-group">
          <label >Usuario</label>
          <input className="form-control" type="text" name="username" placeholder="Ingrese usuario"/> 
        </div>

        <div className="form-group">
          <label >Contraseña</label>
          <input className="form-control" type="password" name="password" placeholder="Ingrese contraseña"/>
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
