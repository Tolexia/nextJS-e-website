import Navbar from './navbar'
import Script from 'next/script'
import styles from "@/styles/layout.module.css";
import React, {useState,useEffect, useImperativeHandle, forwardRef} from 'react';

 const Layout = forwardRef(({children}, ref) => 
{
    const [cart, setCart] = useState(<p>Your cart is empty.</p>)
    useImperativeHandle(
        ref,
        () => ({
                cartInit
        }),
        [cart]
      );
    function removeItemFromCart(index)
    {
        const currentCart = JSON.parse(localStorage.getItem('cart'));
        const clone = currentCart
        currentCart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(currentCart));
        cartInit();
    }
    function cartInit() {
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
                    <span data-id = {i} onClick={e => removeItemFromCart(e.target.dataset.id)}>X</span>
                </div>
                order.push(shoe)
                i++;
            });
            setCart(
            <div>
                {order}
            </div>)
        }
    }
    useEffect(() => {
        cartInit()
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
    
})
export default Layout;