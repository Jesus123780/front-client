/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { usePosition } from 'npm-pkg-hook'
import PropTypes from 'prop-types'
import { useContext, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Context } from '../../context'
import { AlertBox } from 'pkg-components'
import { AsideCheckout } from '../AsideCheckout'
import { Footer } from './footer'
import { FooterDesktop } from './FooterDesktop'
import { HeaderMain } from './headerlog'
import { NavHeaderMobile } from './NavHeaderMobile'

export const Layout = ({
  children,
  watch,
  settings
}) => {
  const location = useRouter()
  const mainRef = useRef(null)

  const {
    error,
    setAlertBox,
    handleMenu,
    menu,
    setOpenMenuMobile,
    menuMobile
  } = useContext(Context)
  useEffect(() => {
    setAlertBox({ message: '', color: 'success' })
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    speed,
    error: _err
  } = usePosition(watch, settings)
  useEffect(() => {
    if (latitude) {
      window.localStorage.setItem('latitude', latitude)
      window.localStorage.setItem('longitude', longitude)
      window.localStorage.setItem('location', JSON.stringify({}))
      if (_err) setAlertBox({ message: `Lo sentimo ocurrió un error en tu ubicación${_err}`, color: '' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, timestamp, accuracy, speed])
  const val = !['/delivery/[...name]'].find(x => { return x === location.pathname })
  return (
    <div>
      <AlertBox err={error} />
      <Main val={val}>
        <AsideCheckout handleMenu={handleMenu} menu={menu} />
        <HeaderMain
          handleMenu={handleMenu}
          location={location}
          menu={menu}
        />
        <div ref={mainRef} style={{ gridArea: 'main', overflowY: 'auto' }}>
          {<NavHeaderMobile menuMobile={menuMobile} setOpenMenuMobile={setOpenMenuMobile} />}
          {children}
          {val && <FooterDesktop />}
        </div>
        {!['/login', '/register', '/varify-email', '/restaurante', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => { return x === location.pathname }) && <Footer />}
        <div style={{ gridArea: 'right' }}>
        </div>
      </Main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  settings: PropTypes.any,
  watch: PropTypes.any
}

const Main = styled.main`
    display: grid;
    width: 100%;
    overflow: hidden;
    height: 100vh;
    grid-template-rows: 80px 2fr;
    grid-template-columns: min-content 1fr;
    grid-template-areas:
        'head head head head'
        'main main main right'
        'main main main right';
    text-align: center;
    grid-gap: 0;
    ${props => {
    return !props.val && css`
   @media only screen and (max-width: 960px){
     grid-template-rows: 0 2fr;
    }

        `
  }}
  

`
