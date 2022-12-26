import { Button } from '@chakra-ui/react'
export const BotonFiltrar = (props) => {
  return(
    <>
      <Button
        colorScheme="twitter"
        type="button" 
        m={1}
        aria-pressed={ props.isPressed }
        className="toggle-btn"
        onClick={ () => props.setFilter(props.name) }>
        { props.name }
      </Button>
    </>
  )
}
