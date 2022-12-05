export const Tareas = (props) => {
  return(
  <>
    <ul>
      <li>
        <input type="checkbox" defaultChecked = { true } />
        <label>Ir al super</label>
        <div>
          <button type="button">Editar</button>
          <button type="button">Eliminar</button>
        </div>
      </li>
      <li>
        <input type="checkbox" defaultChecked = { true } />
        <label>Buscar libros</label>
        <div>
          <button type="button">Editar</button>
          <button type="button">Eliminar</button>
        </div>
      </li>
    </ul>
  </>
  );
}
