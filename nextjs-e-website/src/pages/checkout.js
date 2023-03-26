import Head from 'next/head'

import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Shoeslist from '@/components/shoeslist'
import Link from 'next/link';
import Layout from '@/components/layout'
import Footer from '@/components/footer'
import { limitToFirst, orderByChild, ref, query, get, getDatabase } from 'firebase/database';
import { initializeApp } from "firebase/app";

const inter = Inter({ subsets: ['latin'] })

function Checkout(pageProps) {
  return (
    <>
      <Head>
        <title>Nextjs E-Website</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main style={{display:'flex'}}>
            
        </main>
      </Layout>
      <Footer />
    </>
  )
}

export default Checkout;
