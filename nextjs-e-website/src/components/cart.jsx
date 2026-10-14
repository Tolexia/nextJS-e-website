import {useState, useEffect } from "react"
import styles from "@/styles/Cart.module.css";
import Image from 'next/image'
import Link from 'next/link'
import { parseCartFromStorage, resolveCartImage } from '@/utils/cartImage'

export default function Cart()
{
    let [cart, setCart] = useState(<div></div>)
    let [total, setTotal] = useState(0)
    let shipping = 10;
    useEffect(() => {
        const cartItems = parseCartFromStorage();
        let i = 0;
        const order = [];
        let computedTotal = 0;
        cartItems.forEach((item) => {
            if (!item || typeof item !== 'object') {
                return;
            }
            const quantity = Number(item.nb) || 0;
            const totalThisItem = parseFloat(item.price) * quantity;
            const VAT = 0.20 * totalThisItem;
            computedTotal += totalThisItem + VAT;
            const imageSrc = resolveCartImage(item.filename);
            let product = 
            <div id={i}  key={i} value = {i} className = {styles.cartItem}>
                <Image
                    src= {imageSrc}
                    alt={item.name || 'Product'}
                    width={60}
                    height={60}
                />
                <div className = {styles.itemDescription}>
                    <span className={styles.itemname}>{item.name}</span>
                    <span className={styles.itemprice}>${item.price}</span>
                </div>
                <span data-id = {i}>x{quantity}</span>
            </div>
            order.push(product)
            i++;
        });
        setTotal(computedTotal);
        if(order.length > 0 )
        {
            setCart(
            <div className={styles.items}>
                {order}
            </div>)
        }
    }, [])
    return (
        <div className={styles.cartSection}>
            <h2>SUMMARY</h2>
            {cart}
            <div className={styles.resumeItem}>
                <span className={styles.resumeleft}>TOTAL</span>
                <span className={styles.resumeright}>$ {total}</span>
            </div>
            <div className={styles.resumeItem}>
                <span className={styles.resumeleft}>SHIPPING</span>
                <span className={styles.resumeright}>$ {shipping}</span>
            </div>
            <div className={styles.resumeItem}>
                <span className={styles.resumeleft}>VAT (INCLUDED)</span>
                <span className={styles.resumeright}>$ {0.20*total}</span>
            </div>
            <div className={styles.resumeItem}>
                <span className={styles.resumeleft}>GRAND TOTAL</span>
                <span className={styles.resumeright}>$ {total+shipping}</span>
            </div>
            <Link className={styles.link} href = "">CONTINUE & PAY</Link>
        </div>
    )
}