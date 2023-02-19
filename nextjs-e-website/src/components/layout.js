import Navbar from './navbar'
import Script from 'next/script'
import styles from "@/styles/layout.module.css";
import React, {useState,useEffect} from 'react';

export default function Layout({children, ...props})
{
    const refreshCart = (data) => {
        setCart(data);
      }
    const [cart, setCart] = useState(<p>Your cart is empty.</p>)
    function removeItemFromCart(index)
    {
        console.log(index)
        const currentCart = JSON.parse(localStorage.getItem('cart'));
        const clone = currentCart
        console.log(clone)
        currentCart.splice(index, 1);
        console.log(currentCart)
        localStorage.setItem('cart', JSON.stringify(currentCart));
        refreshCart();
    }
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
                    />
                    <div className = {styles.itemDescription}>
                        <span>{item.name}</span>
                        <span>${item.price} x {item.nb} <b>${parseFloat(item.price) * item.nb}</b></span>
                    </div>
                    <span onClick={() => removeItemFromCart(i)}>X</span>
                </div>
                order.push(shoe)
                i++;
            });
            setCart(
            <div>
                {order}
            </div>)
        }
    }, [])
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