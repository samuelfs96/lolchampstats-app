import Layout from '@/components/layout'
import logo from '@/public/images/logo.svg'

export default function Home() {
  return (
    <>
      <Layout title="Lol Champion Stats">
        <img src={logo.src} alt="logo" />
      </Layout>
    </>
  )
}
