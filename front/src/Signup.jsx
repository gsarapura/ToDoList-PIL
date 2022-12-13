export const Signup = () => {
  return(
    <>
      <section className="border rounded bg-light">
        <h1 className="text-center">Registro</h1>
        <form>

          <div className="form-group">
            <label >Usuario</label>
            <input className="form-control" type="text" name="username" placeholder="Ingrese usuario"/> 
          </div>

          <div className="form-group">
            <label >Email</label>
            <input className="form-control" type="email" name="email" placeholder="Ingrese email"/> 
          </div>

          <div className="form-group">
            <label >Nombre (opcional)</label>
            <input className="form-control" type="text" name="name" placeholder="Ingrese nombre"/> 
          </div>

          <div className="form-group">
            <label >Apellido (opcional)</label>
            <input className="form-control" type="text" name="username" placeholder="Ingrese apellido"/> 
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
    </>
  );
};
