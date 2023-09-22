import Head from 'next/head'
import {
  gql,
  useMutation,
  useSubscription
} from '@apollo/client'
import { RippleButton, OrderCard } from 'pkg-components'
import { FavoriteStore } from 'container/favoriteStore'
import { ItMayInterestYou, LastRecommended } from 'container/LastRecomendation'
import { withIronSessionSsr } from 'iron-session/next'
import { useRestaurant, useStatusOrdersClient } from 'npm-pkg-hook'
import PropTypes from 'prop-types'
import {
  BGColor,
  PColor,
  PVColor,
  SECBGColor
} from 'public/colors'
import {
  useContext,
  useEffect,
  useState
} from 'react'
import styled from 'styled-components'
import { cookie } from 'utils'
import { Restaurant } from '../../container/restaurantes'
import { PromosBanner } from '../../container/restaurantes/PromosBanner'
import { ListRestaurant } from '../../container/restaurantes/restaurant'
import { Section } from '../../container/restaurantes/styled'
import { Context } from '../../context'
import styles from '../../styles/Home.module.css'

export default function RestaurantHome ({
  ACEPTE_COOKIE = true,
  ID_CATEGORIE = '',
  PRODUCT_NAME_COOKIE = ''
}) {
  const [data, { fetchMore }] = useRestaurant()
  const { data: storeOrder } = useStatusOrdersClient()
  const { setAlertBox } = useContext(Context)
  const [close, setClose] = useState(ACEPTE_COOKIE)
  const [showMore, setShowMore] = useState(100)
  const UPDATE_COOKIES = gql`
mutation setCookie($name: String, $value: String) {
  setCookie(name: $name, value: $value){
    success
    message
  }
}
  `
  const [setCookie] = useMutation(UPDATE_COOKIES, {
    context: { clientName: '' }

  })
  const NEW_NOTIFICATION = gql`
  subscription {
    newNotification
  }
  `
  const { data: dataWS } = useSubscription(NEW_NOTIFICATION, {
    context: { clientName: 'admin-server' }
  })
  useEffect(() => {
    if (dataWS) {
      setAlertBox({ message: dataWS?.newNotification, duration: 30000 })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataWS])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta content='Generated by create next app' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <OrderCard storeOrder={storeOrder} />
      <Section>
        <PromosBanner />
      </Section>
      <Section>
        <Restaurant />
      </Section>
      <Section>
        <ListRestaurant data={data} />
      </Section>
      <RippleButton
        bgColor={BGColor}
        border={`1px solid ${SECBGColor}`}
        color={PColor}
        onClick={() => {
          setShowMore(showMore + 100)
          fetchMore({
            variables: { max: showMore, min: 0 },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult
              return {
                getAllStoreInStore: [...fetchMoreResult.getAllStoreInStore]

              }
            }
          })
        }}
        overColor={PColor}
        widthButton='100%'
      >
        Ver más
      </RippleButton>
      <FavoriteStore />
      <LastRecommended ID_CATEGORIE={ID_CATEGORIE} />
      <ItMayInterestYou PRODUCT_NAME_COOKIE={PRODUCT_NAME_COOKIE} />
      {false && !ACEPTE_COOKIE && close !== 'true' && <CookieContainer>
        <div className='cookie-consent-banner-opt-out__message-container'>
          <h2 className='cookie-consent-banner-opt-out__header'>Este sitio usa cookies</h2>
          <button data-testid='action:understood-button' onClick={() => { setClose('true'); setCookie({ variables: { name: 'Hola', value: 'Mundo' } }).catch(() => { }) }}>Entendido</button>
          <div className='cookie-consent-banner-opt-out__actions'>
          </div>
        </div>
      </CookieContainer>}
    </div>
  )
}

RestaurantHome.propTypes = {
  ACEPTE_COOKIE: PropTypes.bool,
  ID_CATEGORIE: PropTypes.any,
  PRODUCT_NAME_COOKIE: PropTypes.any
}

const CookieContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2147483647;
    background-color: rgba(0,0,0,.9);
    color: ${BGColor};
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    padding: 48px 48px 24px;
    .cookie-consent-banner-opt-out__message-container {
        margin-right: 50px;
    max-width: 585px;
    min-width: 200px;
    }
    .cookie-consent-banner-opt-out__header {
        margin: 0 0 12px;
        font-size: 20px;
        font-weight: 600;
        color: ${BGColor};
    }
    .cookie-consent-banner-opt-out__actions {
        align-items: center;
        margin: 0 0 24px;
    }
    button {
    color: ${BGColor}!important;
    border-radius: 6px;
    background-color: ${PVColor};
    border: none;
    text-decoration: none;
    font-weight: 600;
    line-height: 1em;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    margin: 0 8px 8px 0;
    padding: 16px 24px;
    font-size: 16px;
    }
`

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }) {
    const { user } = req.session || {}
    const { RECOMMENDATION_COOKIE, PRODUCT_NAME_COOKIE, ACEPTE_COOKIE } = req.cookies || {}
    try {
      return {
        props: {
          user: user || {},
          idStore: null,
          ID_CATEGORIE: RECOMMENDATION_COOKIE || null,
          PRODUCT_NAME_COOKIE: PRODUCT_NAME_COOKIE || null,
          ACEPTE_COOKIE: ACEPTE_COOKIE || null
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)
