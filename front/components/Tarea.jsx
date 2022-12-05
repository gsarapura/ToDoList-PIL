export const Tarea = (props) => {
  return(
  <>
    <li>
      <input id="props.id" type="checkbox" defaultChecked = { props.completed } />
      <label>{ props.name }</label>
      <div>
        <button type="button">Editar</button>
        <button type="button">Eliminar</button>
      </div>
    </li>
  </>
  );
}
