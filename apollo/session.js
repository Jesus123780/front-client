
import { withIronSessionApiRoute } from 'iron-session/next'
export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: process.env.SESSION_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}
export default withIronSessionApiRoute(() => {
  // eslint-disable-next-line no-console
  console.log('')
}, sessionOptions)
