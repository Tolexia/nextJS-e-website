import Shoeslist from '@/components/shoeslist'
import Layout from '@/components/layout'
import Head from 'next/head'
import styles from '@/styles/Product.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Product(){
    return (
    <>
        <Head>
            <title>Nextjs E-Website</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <div className={styles.wrapper}>
                <section className={styles.gallery}>
                <Image
                    className={styles.mainPicture}
                    src= "/images/image-product-1.jpg"
                    alt="cart"
                    width={500}
                    height={500}
                    priority
                />
                </section>
                <section className={styles.infos}>
                   <h5 className={styles.brand}>sneaker company</h5>
                   <h1 className={styles.model}>Fall Limited Edition Sneakers</h1>
                   <p className={styles.description}>
                        These low-profile sneakers are your perfect casual wear companion. Featuring a durable outer sole, they'll withstand everything the weather can offer.
                   </p>
                   <div className={styles.price}>
                        <span className={styles.priceValue}>$ 125.00</span>
                        <span className={styles.discount} >50%</span>
                   </div>
                   <span className={styles.initial}>250 &euro;</span>
                   <div className={styles.handlecart}>

                   </div>
                </section>
            </div>
        </Layout>
    </>
    )
}