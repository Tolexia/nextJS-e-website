import Head from 'next/head'

import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Shoeslist from '@/components/shoeslist'
import Link from 'next/link';
import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Content from '@/components/content'
import { limitToFirst, orderByChild, ref, query, get, getDatabase } from 'firebase/database';

const inter = Inter({ subsets: ['latin'] })

function Home(pageProps) {
  // console.log(pageProps)
  const items = pageProps.items
  return (
    <>
      <Head>
        <title>Nextjs E-Website</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Content items = {items} />
      </Layout>
      <Footer />
    </>
  )
}
Home.getInitialProps = async (context) => {
  
  let item = {};
  const db = getDatabase();
  return get(query(ref(db, 'shoes'), orderByChild('name'), limitToFirst(5)))
  .then(snapshot => {
      item =Object.entries(snapshot.val());
      
      return {
          items:item
      }
  })
}
export default Home;
