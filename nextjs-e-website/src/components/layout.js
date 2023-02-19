import Navbar from './navbar'
import Script from 'next/script'
import styles from "@/styles/layout.module.css";
import React, {useState,useEffect} from 'react';

export default function Layout({children, ...props})
{
    const [cart, setCart] = useState(<p>Your cart is empty.</p>)
    useEffect(() => {
        if(localStorage.getItem('cart') != null)
        {
            let i = 0;
            const order = [];
            const cartItems = JSON.parse(localStorage.getItem('cart'));
            cartItems.forEach((item) => {
                let shoe = 
                <div id={i}  key={i} value = {i} className = {styles.cartItem}>
                    <img
                        src= {item.img}
                        alt={item.name}
                        width={40}
                        height={40}
                        priority
                    />
                    <div className = {styles.itemDescription}>
                        <span>{item.name}</span>
                        <span>${item.price} x {item.nb} <b>${parseFloat(item.price) * item.nb}</b></span>
                    </div>
                </div>
                order.push(shoe)
                i++;
            });
            setCart(
            <div>
                {order}
            </div>)
        }
    })
    return (
        <>
            <Navbar cart = {cart} />
            <main className= {styles.mainwrapper}>
                {React.cloneElement(children, {
                    cart: cart
                })}
            </main> 
        </>
    )
    
}