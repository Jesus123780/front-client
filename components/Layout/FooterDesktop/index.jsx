import { useEffect, useState } from 'react'
import { PColor } from '../../../public/colors'
import { Facebook, IconInstagram, IconLogo, IconTwitter, IconYoutube } from '../../../public/icons'
import { Container, ContainerLogo, ContainerSocial, Content, ContentSocial, Copyright, CopyrightInformation, Enlace, Title } from './styled'
export const FooterDesktop = () => {
  const [year, setYear] = useState(false)
  useEffect(() => {
    const fecha = new Date()
    setYear(fecha.getFullYear())
  }, [])

  // eslint-disable-next-line
  const onClickTop = e => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (<>
    <ContainerSocial>
      <ContentSocial>
        <Title>Nosotros</Title>
        <Enlace href='/quienes-somos'>Quiénes somos</Enlace>
        <Enlace href='/ayuda'> Centro de ayuda</Enlace>
        <Enlace href='/entrar'> Registrate</Enlace>
      </ContentSocial>
      <ContentSocial>
        <Title>Descrubre</Title>
        <Enlace href='/como-comprar'>Como pedir</Enlace>
        <Enlace href='/contactanos'> Contacto</Enlace>
        <Enlace href='/entrar'> Ingresa</Enlace>
      </ContentSocial>
      <ContentSocial>
        <Title>Ayuda PQR</Title>
        <Enlace href='/preguntas-frecuentes'>Preguntas  /  frecuentes - </Enlace>
      </ContentSocial>
      <ContentSocial>
        <Title>Social</Title>
        <a
          href='https://www.ifood.com.co/lista-restaurantes'
          rel='noreferrer'
          style={{ margin: '0px 10px' }}
          target='_blank'
        >
          <Facebook color={PColor} size='40px' />
        </a>
        <a
          href='https://www.ifood.com.co/lista-restaurantes'
          rel='noreferrer'
          style={{ margin: '0px 10px' }}
          target='_blank'
        >
          <IconInstagram color={PColor} size='40px' />
        </a>
        <a
          href='https://www.ifood.com.co/lista-restaurantes'
          rel='noreferrer'
          style={{ margin: '0px 10px' }}
          target='_blank'
        >
          <IconTwitter color={PColor} size='40px' />
        </a>
        <a
          href='https://www.ifood.com.co/lista-restaurantes'
          rel='noreferrer'
          style={{ margin: '0px 10px' }}
          target='_blank'
        >
          <IconYoutube color={PColor} size='40px' />
        </a>
      </ContentSocial>
    </ContainerSocial>
    <Container grid >
      <Content grid>
        <ContainerLogo>
          <IconLogo color={PColor} size='40px' />
        </ContainerLogo>
        <Copyright>{year} © Copyright - COME YA S.A.S. sociedad comercial identificada con NIT No. 900.666.435-</Copyright>
        <CopyrightInformation>Carrera 51B Nº 80-58 , Oficina 601, Barranquilla, Atlántico 080020, CO. </CopyrightInformation>
      </Content>
      <Content>
        {/* <button onClick={onClickTop}>TOP</button> */}
        <Enlace href='/terminos-y-condiciones'> Términos y condiciones</Enlace>
        <Enlace href='/seguridad'> Seguridad</Enlace>
        <Enlace href='/aviso-de-privacidad'> Aviso de privacidad</Enlace>
      </Content>
    </Container>
  </>
  )
}
