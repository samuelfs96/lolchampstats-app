import Head from 'next/head'
//import styles from '@/styles/Home.module.css'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({
    children,
    title
}) {
  return (
    <>
    <Head>
        <title>{title}</title>
        <meta name="description" content="Application to show statistics of lol champions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar/>
          {children}
        <Footer/>
      </main>
    </>
  )
}
