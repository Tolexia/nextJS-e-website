import styles from '@/styles/Navbar.module.css'
import Image from 'next/image'
import React, { useState } from 'react';

export default function Navbar() {
  let [active, setactive] = useState(styles.noactive);
  return (
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
            <Image
              className={styles.test}
              src="/images/icon-cart.svg"
              alt="cart"
              width={21}
              height={21}
              priority
              onClick={() => setactive(active == styles.noactive ? active = styles.active : active = styles.noactive)}
              /> 
            <div className={[styles.cartDisplay, active].join(' ')} id = "cart">
              <span className={styles.cartDisplayTitle}>Cart</span>
              <div>
                <p>
                  <span>
                    Your cart is empty.
                  </span>
                </p>
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
  )
}
