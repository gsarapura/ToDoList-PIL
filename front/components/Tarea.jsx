export const Tarea = (props) => {
  return(
  <>
    <li>
      <input 
          id={ props.id } 
          type="checkbox" 
          defaultChecked = { props.completed } 
          onChange={ () => props.toggleTaskCompleted(props.id) }
        />
      <label htmlFor={ props.id }>{ props.name }</label>
      <div>
        <button type="button">Editar</button>
        <button type="button" onClick={ () => props.deleteTask(props.id)}>Eliminar</button>
      </div>
    </li>
  </>
  );
}
