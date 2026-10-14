import styles from "@/styles/layout.module.css";
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/footer'
import { resolveCartImage } from '@/utils/cartImage'
import { useCart } from '@/components/cartContext'

export default function Layout({ children }) {
    const { items, itemCount, cartOpen, setCartOpen, removeItem } = useCart();
    const [activeMenu, setactiveMenu] = useState(null);

    useEffect(() => {
        const main = document.querySelector('main');
        if (!main) {
            return undefined;
        }
        const closeCart = () => setCartOpen(false);
        main.addEventListener('click', closeCart);
        return () => main.removeEventListener('click', closeCart);
    }, [setCartOpen]);

    const cartPanel = items.length > 0 ? (
        <div>
            {items.map((item, i) => {
                if (!item || typeof item !== 'object') {
                    return null;
                }
                const quantity = Number(item.nb) || 0;
                const imageSrc = resolveCartImage(item.filename);
                return (
                    <div id={i} key={i} className={styles.cartItem}>
                        <Image
                            src={imageSrc}
                            alt={item.name || 'Product'}
                            width={40}
                            height={40}
                        />
                        <div className={styles.itemDescription}>
                            <span>{item.name}</span>
                            <span>${item.price} x {quantity} <b>${parseFloat(item.price) * quantity}</b></span>
                        </div>
                        <span
                            className={styles.removal}
                            data-id={i}
                            onClick={(e) => {
                                if (confirm("Remove this item ?")) {
                                    removeItem(e.target.dataset.id);
                                }
                            }}
                        >
                            X
                        </span>
                    </div>
                );
            })}
            <Link href="/checkout" className={styles.checkout}>checkout</Link>
        </div>
    ) : (
        <p>Your cart is empty.</p>
    );

    return (
        <div className={styles.layout}>
            <nav className={styles.nav}>
                <Link className={styles.logolink} href="/">
                    <Image
                        className={styles.logo}
                        src="/images/logo.svg"
                        alt="sneakers logo"
                        width={138}
                        height={25}
                        priority
                    />
                </Link>
                <div className={styles.burger}>
                    <input type="checkbox" onChange={() => setactiveMenu(activeMenu == null ? styles.active : null)}/>
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul></ul>
                </div>
                <div className={[styles.navLeft, activeMenu].join(' ')}>
                    <Link href="/items?gender=homme">Men</Link>
                    <Link href="/items?gender=femme">Women</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>
                <div className={[styles.navRight, activeMenu].join(' ')}>
                    <div className={styles.cartSection}>
                        <span className={styles.itemcount}>{itemCount}</span>
                        <Image
                            className={styles.test}
                            src="/images/icon-cart.svg"
                            alt="cart"
                            width={30}
                            height={30}
                            priority
                            onClick={() => setCartOpen(!cartOpen)}
                        />
                        <div className={[styles.cartDisplay, !cartOpen && styles.noactive].filter(Boolean).join(' ')} id="cart">
                            <span className={styles.cartDisplayTitle}>Cart</span>
                            <div>
                                {cartPanel}
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
            <main className={styles.mainwrapper}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
