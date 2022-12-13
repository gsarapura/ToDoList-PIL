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
          <label for="">Contraseña</label>
          <input className="form-control" type="password" name="password" placeholder="Ingrese contraseña"/>
        </div>
       
        <div className="text-end">
          <button type="submit" className="btn btn-primary">Ingresar</button> 
        </div>

      </form>
    </section>
  );
};
