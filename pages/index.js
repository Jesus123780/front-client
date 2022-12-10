import Head from 'next/head'
import { Home } from '../container/Home'

export default function HomeView () {
  return (
    <div >
      <Head>
        <title>Delibery </title>
        <meta content='Generated by create next app' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <Home />
    </div>
  )
}

HomeView.getLayout = function getLayout (page) {
  return (
    <>
      {page}
    </>
  )
}
