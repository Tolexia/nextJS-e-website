import Layout from '@/components/layout'
import Head from 'next/head'
import styles from '@/styles/Product.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { ReactSVG } from "react-svg";
import React, { useState, useRef,useEffect } from 'react';
import { useRouter } from 'next/router'
import {query, onValue, getDatabase, ref, get, set, push, child, onChildAdded, onChildChanged, onChildRemoved,orderByKey, orderByChild,orderByValue, equalTo  } from "firebase/database"
import firebase_app from "@/components/config"

function Product({item}){
    const refreshCart = useRef(); 
    let [count, setCount] = useState(0);
    const files = JSON.parse(item.filename);
    let mainPic = files[0];
    mainPic = "/images/"+mainPic;
    const thumbnails = [];
    let key = 0;
    files.forEach(img => {
        let src = "/images/"+img
        thumbnails.push(<Image
            key = {key}
            src= {src}
            alt="cart"
            width={100}
            height={100}
            priority
        />)
        
    });
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
        if(refreshCart.current)
        {
            refreshCart.current.cartInit();
            refreshCart.current.setactive("active");
        }
    }
   
    return (
    <>
        <Head>
            <title>Nextjs E-Website</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout ref= {refreshCart} >
            <div className={styles.wrapper}>
                <section className={styles.gallery}>
                <Image
                    className={styles.mainPicture}
                    src= {mainPic}
                    alt="cart"
                    width={500}
                    height={500}
                    priority
                />
                <div className={styles.thumbnails}>
                    {thumbnails}
                </div>
                </section>
                <section className={styles.infos}>
                   <h5 className={styles.brand}>{item.brand}</h5>
                   <h1 className={styles.model}>{item.name}</h1>
                   <p className={styles.description}>
                    {item.description}
                   </p>
                   <div>
                    <div className={styles.price}>
                            <span className={styles.priceValue}>$ {item.price}</span>
                            {item.discount != undefined && parseInt(item.discount) > 0 ? <span className={styles.discount} >{item.discount}%</span> : null}
                    </div>
                        {item.discount != undefined && parseInt(item.discount) > 0 ?  <span className={styles.initial}>$ {parseFloat(item.price)/(parseInt(item.discount)/100)}</span> : null}
                   </div>
                   <div className={styles.handlecart}>
                        <div className={styles.handleitem}>
                            <button type='button' onClick={() => setCount( count > 1 ? count -1 : 0)} className={styles.less}>-</button>
                            <input type='text' className={styles.itemNb}  value = {count} readOnly/>
                            <button type='button' onClick={() => {setCount(count+1)}} className={styles.more}>+</button>
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
Product.getInitialProps = async (context) => {
    let item = {};
    const productName = context.query.id;
    const db = getDatabase(firebase_app);
    return get(query(ref(db, 'shoes'), orderByChild('name'), equalTo(productName)))
    .then(snapshot => {
        item =Object.entries(snapshot.val())[0][1];
        
        return {
            item:item
        }
    })
}

export default Product