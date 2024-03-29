import {
  Column,
  Text,
  RippleButton
} from 'pkg-components'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import {
  BGColor,
  PColor,
  SECColor
} from 'public/colors'

const NotFount = ({
  error = '¡Algo salió mal! Parece que la página que buscas ya no está disponible',
  errorType = '404',
  fixed = false,
  redirect = '/restaurantes'
}) => {
  const router = useRouter()
  const positionFixed = {
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 9999
  }
  return (
    <Column
      background={BGColor}
      bottom='0'
      display='grid'
      gridGap='40px'
      gridTemplateColumns='450px auto'
      height='100vh'
      left='0'
      padding='0 0 0 70px'
      placeContent='center'
      style={fixed ? positionFixed : null}
    >
      <Column display='grid'>
        <Text
          color={SECColor}
          fontSize='3.375rem'
          fontWeight='bold'
        >Ups...</Text>
        <Text
          color={SECColor}
          family='PFont-Light'
          fontSize='1.625rem'
          margin='40px 0 40px 0'
        >{error}</Text>
        <RippleButton color={BGColor} onClick={() => { return router.push(redirect) }}>Regresar para el inicio</RippleButton>
      </Column>
      <Column>
        <Text color={PColor} fontSize='10.78em'>{errorType}</Text>
      </Column>
    </Column>
  )
}

NotFount.propTypes = {
  error: PropTypes.string,
  errorType: PropTypes.string,
  redirect: PropTypes.string,
  fixed: PropTypes.bool
}

export default NotFount
