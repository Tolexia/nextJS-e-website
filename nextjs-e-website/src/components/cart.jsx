import {useState, useEffect } from "react"
import styles from "@/styles/Cart.module.css";
import Image from 'next/image'
import Link from 'next/link'

export default function Cart()
{
    let [cart, setCart] = useState(<div></div>)
    let [total, setTotal] = useState(0)
    let shipping = 10;
    useEffect(() => {
        if(localStorage.getItem('cart') != null)
        {
            let i = 0;
            const order = [];
            const cartItems = JSON.parse(localStorage.getItem('cart'));
            cartItems.forEach((item) => {
                setTotal(total + (parseFloat(item.price) * item.nb));
                let files = JSON.parse(item.filename);
                let mainPic = files[0];
                if(!mainPic.match('images'))
                {
                    item.filename = "/images/"+mainPic
                }
                let product = 
                <div id={i}  key={i} value = {i} className = {styles.cartItem}>
                    <Image
                        src= {item.filename}
                        alt={item.name}
                        width={60}
                        height={60}
                    />
                    <div className = {styles.itemDescription}>
                        <span className={styles.itemname}>{item.name}</span>
                        <span className={styles.itemprice}>${item.price}</span>
                    </div>
                    <span data-id = {i}>x{item.nb}</span>
                </div>
                order.push(product)
                i++;
            });
            if(order.length > 0 )
            {
                setCart(
                <div className={styles.items}>
                    {order}
                </div>)
            }
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