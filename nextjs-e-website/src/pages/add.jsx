import Head from 'next/head'

import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Productslist from '@/components/productslist'
import Link from 'next/link';
import Layout from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

function Add() {
  return (
    <>
      <Head>
        <title>Nextjs E-Website</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Productslist />
      </Layout>
    </>
  )
}

export default Add;
