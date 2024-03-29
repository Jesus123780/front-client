/* eslint-disable consistent-return */
import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import Cors from 'micro-cors'
import jwt from 'jsonwebtoken'

import httpHeadersPlugin from './lib/hooks/apollo-plugin-http-header'
import withSession from '../../apollo/session'
import typeDefs from '../api/lib/typeDefs'
import resolvers from '../api/lib/resolvers/index'

const cors = Cors()

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  playground: process.env.NODE_ENV === 'production',
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground(), httpHeadersPlugin],
  context: withSession(async ({ req, next, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context
    }
    //  Initialize as empty arrays - resolvers will add items if required
    const setCookies = []
    const setHeaders = []
    //  Initialize PubSub
    const { token } = req.session.get('user') || {}
    const idComp = req.headers.authorization?.split(' ')[1]
    const restaurant = req.headers.restaurant || {}
    const excluded = ['/login', '/forgotpassword', '/register', '/teams/invite/[id]', '/teams/manage/[id]']
    if (excluded.indexOf(req.session) > -1) return next()
    if (token) {
      const User = await jwt.verify(token, process.env.AUTHO_USER_KEY)
      return { req, setCookies: setCookies || [], setHeaders: setHeaders || [], User: User || {}, idComp, restaurant: restaurant || {} }
    }
    return { req, setCookies: [], setHeaders: [], User: null || {}, idComp: null || {}, restaurant: restaurant || {} }
  }),
  subscriptions: {
    path: '/api/graphqlSubscriptions',
    keepAlive: 9000,
    // eslint-disable-next-line no-unused-vars
    onConnect: () => { },
    onDisconnect: () => { }
  }
})
const startServer = apolloServer.start()

export default cors(async (req, res) => {
  cors()
  if (req.method === 'OPTIONS') {
    res.end()
    return
  }
  await startServer
  const handler = (apolloServer.createHandler({ path: '/api/graphql' }))
  return handler(req, res)
})
export const config = {
  api: {
    bodyParser: false,
    playground: true
  }
}
