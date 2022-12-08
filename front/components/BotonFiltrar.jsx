export const BotonFiltrar = (props) => {
  return(
    <>
      <button 
        type="submit" 
        className="toggle-btn"
        aria-pressed={ props.isPressed }
        onClick={ () => props.setFilter(props.name) }>
        { props.name }
      </button>
    </>
  )
}
