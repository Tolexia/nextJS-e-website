import Head from 'next/head'

import { Inter } from '@next/font/google'
import styles from '@/styles/Checkout.module.css'
import Shoeslist from '@/components/shoeslist'
import Link from 'next/link';
import Layout from '@/components/layout'
import Footer from '@/components/footer'
import { limitToFirst, orderByChild, ref, query, get, getDatabase } from 'firebase/database';
import { initializeApp } from "firebase/app"
import Cart from "@/components/cart"

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
        <main className={styles.mainSection}>
            <form method='POST' action='/' className={styles.form}>
              <h1>CHECKOUT</h1>
              <div>
                <h3>BILLING DETAILS</h3>
                <div className={styles.formdiv}>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder='John Doe' required/>
                  </div>
                  <div>
                    <label htmlFor="mail">Email Address</label>
                    <input type="mail" name="mail" id="mail" placeholder='john.doe@gmail.com' required/>
                  </div>
                  <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" name="phone" id="phone" placeholder='0612345678' required/>
                  </div>
                </div>
              </div>
              <div>
                <h3>SHIPPING INFO</h3>
                <div className={styles.formdiv}>
                  <div style={{gridColumn:'1/3'}}>
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" placeholder='101 Helloworld Street' required/>
                  </div>
                  <div>
                    <label htmlFor="zip">ZIP Code</label>
                    <input type="text" name="zip" id="zip" placeholder='10001' required/>
                  </div>
                  <div>
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" placeholder='New York' required/>
                  </div>
                  <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" id="country" placeholder='United States' required/>
                  </div>
                </div>
              </div>
              <div>
                <h3>PAYMENT DETAILS</h3>
                <div className={styles.formdiv}>
                  <div style={{justifyContent:'flex-end'}}>
                    <label>Payment methods</label>
                  </div>
                  <div>
                    <input type="radio" name="paymentmethod" id="emoney" checked/>
                    <label htmlFor="emoney">e-money</label>
                  </div>
                  <div></div>
                  <div>
                    <input type="radio" name="paymentmethod" id="cash" />
                    <label htmlFor="cash">Cash on delivery</label>
                  </div>
                  <div>
                    <label htmlFor="emoneynumber">e-Money Number</label>
                    <input type="text" name="emoneynumber" id="emoneynumber" placeholder='24304530' />
                  </div>
                  <div>
                    <label htmlFor="emoneypin">e-Money PIN</label>
                    <input type="text" name="emoneypin" id="emoneypin" placeholder='6891' />
                  </div>
                </div>
              </div>
            </form>
            <Cart/>
        </main>
      </Layout>
      <Footer />
    </>
  )
}

export default Checkout;
