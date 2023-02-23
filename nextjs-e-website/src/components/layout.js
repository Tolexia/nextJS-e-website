import Script from 'next/script'
import styles from "@/styles/layout.module.css";
import React, {useState,useEffect, useImperativeHandle, forwardRef} from 'react';
import Image from 'next/image'
import Link from 'next/link'

 const Layout = forwardRef(({children}, ref) => 
{
    let [active, setactive] = useState(styles.noactive);
    let [itemcount, setitemcount] = useState(0);
    const [cart, setCart] = useState(<p>Your cart is empty.</p>)
    useImperativeHandle(
        ref,
        () => ({
                cartInit,
                setactive,
        }),
        [cart,styles.active,styles.noactive]
      );
    function removeItemFromCart(index)
    {
        const currentCart = JSON.parse(localStorage.getItem('cart'));
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
            let newItemCount = 0;
            cartItems.forEach((item) => {
                newItemCount += item.nb;
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
                    <span className= {styles.removal} data-id = {i} onClick={e => confirm("Remove this item ?") ? removeItemFromCart(e.target.dataset.id) : ""}>X</span>
                </div>
                order.push(shoe)
                i++;
            });
            setCart(
            <div>
                {order}
                <Link className={styles.checkout}>checkout</Link>
            </div>)
            setitemcount(newItemCount)
        }
    }
    useEffect(() => {
        cartInit()
    }, [])
    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.navLeft}>
                <Image
                    className={styles.logo}
                    src="/images/logo.svg"
                    alt="sneakers logo"
                    width={138}
                    height={20}
                    priority
                />
                <a>Collections</a>
                <a>Men</a>
                <a>Women</a>
                <a>About</a>
                <a>Contact</a>
                </div>
                <div className={styles.navRight}>
                <div className={styles.cartSection}>
                    <span className={styles.itemcount}>{itemcount}</span>
                    <Image
                    className={styles.test}
                    src="/images/icon-cart.svg"
                    alt="cart"
                    width={21}
                    height={21}
                    priority
                    onClick={() => setactive(active == styles.noactive ? styles.active : styles.noactive)}
                    /> 
                    <div className={[styles.cartDisplay, active].join(' ')} id = "cart">
                    <span className={styles.cartDisplayTitle}>Cart</span>
                    <div>
                        {cart}
                    </div>
                    </div>
                </div>
                <Image
                    className={styles.avatar}
                    src="/images/tolexia.jpg"
                    alt="Next.js Logo"
                    width={45}
                    height={45}
                    priority
                />
                </div>
            </nav>
            <main className= {styles.mainwrapper}>
                {React.cloneElement(children, {
                    cart: cart
                })}
            </main> 
        </>
    )
    
})
export default Layout;