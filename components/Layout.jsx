import Head from 'next/head'
//import styles from '@/styles/Home.module.css'
import Navbar from './Navbar'
import localFont from 'next/font/local';
 
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../public/fonts/Azonix.otf' });

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
      <main 
      className={`${myFont.className}`}
      >
        <Navbar/>
        {children}
      </main>
    </>
  )
}
