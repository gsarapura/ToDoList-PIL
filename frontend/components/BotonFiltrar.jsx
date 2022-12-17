export const BotonFiltrar = (props) => {
  return(
    <>
      <button 
        type="button" 
        className="toggle-btn m-1"
        aria-pressed={ props.isPressed }
        onClick={ () => props.setFilter(props.name) }>
        { props.name }
      </button>
    </>
  )
}
