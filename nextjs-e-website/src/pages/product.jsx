import Head from 'next/head'
import styles from '@/styles/Product.module.css'
import Image from 'next/image'
import { ReactSVG } from "react-svg";
import React, { useState } from 'react';
import { query, getDatabase, ref, orderByChild, equalTo, get } from "firebase/database"
import firebase_app from "@/components/config"
import { useCart } from '@/components/cartContext'
import { parseImageList } from '@/utils/cartImage'

function struckPrice(price, discount) {
    const percent = Number.parseInt(discount, 10);
    const current = Number.parseFloat(price);
    if (!Number.isFinite(percent) || percent <= 0 || percent >= 100) {
        return null;
    }
    if (!Number.isFinite(current)) {
        return null;
    }
    return (current / (1 - percent / 100)).toFixed(2);
}

function Product({item}){
    const { addItem } = useCart();
    const [count, setCount] = useState(0);
    const images = item ? parseImageList(item.filename) : [];
    const [mainPic, setMainPic] = useState(images[0] || "/images/icon-cart.svg");

    if (!item) {
        return <p>Ce produit est introuvable.</p>;
    }

    const previousPrice = struckPrice(item.price, item.discount);

    return (
    <>
        <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description || item.name} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.wrapper}>
            <section className={styles.gallery}>
            <Image
                className={styles.mainPicture}
                src={mainPic}
                alt={item.name}
                width={500}
                height={500}
                priority
            />
            <div className={styles.thumbnails}>
                {images.map((src, index) => (
                    <button
                        key={src}
                        type="button"
                        className={styles.thumbButton}
                        aria-label={`Photo ${index + 1}`}
                        onClick={() => setMainPic(src)}
                    >
                        <Image
                            src={src}
                            alt={item.name}
                            width={100}
                            height={100}
                        />
                    </button>
                ))}
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
                        {previousPrice ? <span className={styles.discount}>{item.discount}%</span> : null}
                </div>
                    {previousPrice ? <span className={styles.initial}>$ {previousPrice}</span> : null}
               </div>
               <div className={styles.handlecart}>
                    <div className={styles.handleitem}>
                        <button type='button' onClick={() => setCount(count > 1 ? count - 1 : 0)} className={styles.less}>-</button>
                        <input type='text' className={styles.itemNb} value={count} readOnly/>
                        <button type='button' onClick={() => {setCount(count + 1)}} className={styles.more}>+</button>
                    </div>
                    <button type='button' className={styles.add2cart} onClick={() => addItem(item, count)}>
                    <ReactSVG
                        className={styles.cartIcon}
                        src="/images/icon-cart.svg"
                    />
                    Add to cart
                    </button>
               </div>
            </section>
        </div>
    </>
    )
}
Product.getInitialProps = async (context) => {
    const productName = context.query.id;
    if (!productName || Array.isArray(productName)) {
        return { item: null };
    }
    const db = getDatabase(firebase_app);
    const snapshot = await get(query(ref(db, 'shoes'), orderByChild('name'), equalTo(productName)));
    const value = snapshot.val();
    if (!value) {
        return { item: null };
    }
    const [id, data] = Object.entries(value)[0];
    return {
        item: { ...data, id }
    };
}

export default Product
