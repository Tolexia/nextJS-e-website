import {useState, useEffect } from "react"
import styles from "@/styles/Cart.module.css";
import Image from 'next/image'

export default function Cart()
{
    let [cart, setCart] = useState(<div></div>)
    let [total, setTotal] = useState(0)
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
                <div>
                    {order}
                </div>)
            }
        }
    }, [])
    return (
        <div className={styles.cartSection}>
            <h2>SUMMARY</h2>
            {cart}
        </div>
    )
}