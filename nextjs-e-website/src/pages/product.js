import Layout from '@/components/layout'
import Head from 'next/head'
import styles from '@/styles/Product.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { ReactSVG } from "react-svg";
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

export default function Product(){
    const[cart, setCart] = useState(null)
    const refreshCart = (data) => {
        setCart(data);
      }
    const [count, setCount] = useState(0);
    const item = {
        price : 125,
        name : "Fall Limited Edition Sneakers",
        img : "/images/image-product-1.jpg",
    }
    function addItemToCart(count, item)
    {
        item.nb = count;
        if(localStorage.getItem('cart') == null)
        {
            const json = JSON.stringify([item]);
            localStorage.setItem('cart', json)
        }
        else
        {
            const currentCart = JSON.parse(localStorage.getItem('cart'));
            currentCart.push(item);
            localStorage.setItem('cart', JSON.stringify(currentCart));
        }
        refreshCart()
    }
    return (
    <>
        <Head>
            <title>Nextjs E-Website</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout refreshCart = {refreshCart}>
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
                   <div>
                    <div className={styles.price}>
                            <span className={styles.priceValue}>$ 125.00</span>
                            <span className={styles.discount} >50%</span>
                    </div>
                   <span className={styles.initial}>$ 250.00</span>
                   </div>
                   <div className={styles.handlecart}>
                        <div className={styles.handleitem}>
                            <button type='button' onClick={() => setCount( count > 1 ? count + -1 : 0)} className={styles.less}>-</button>
                            <input type='text' className={styles.itemNb} defaultValue = {count}/>
                            <button type='button' onClick={() => setCount(count + 1)} className={styles.more}>+</button>
                        </div>
                        <button type='button' className={styles.add2cart} onClick = {() => addItemToCart(count, item)}>
                        <ReactSVG
                            className={styles.cartIcon}
                            src="/images/icon-cart.svg"
                            // alt="cart"
                            // width={17}
                            // height={17}
                            // priority
                        />
                        Add to cart
                        </button>
                   </div>
                </section>
            </div>
        </Layout>
    </>
    )
}