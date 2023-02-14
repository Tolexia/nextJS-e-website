import styles from '@/styles/Navbar.module.css'
import Image from 'next/image'
export default function Navbar() {
  return (
    <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Image
            className={styles.logo}
            src="/images/logo.svg"
            alt="sneakers logo"
            width={180}
            height={37}
            priority
          />
          <a>Collections</a>
          <a>Men</a>
          <a>Women</a>
          <a>About</a>
          <a>Contact</a>
        </div>
        <div className={styles.navRight}>
          <Image
            className={styles.test}
            src="/images/icon-cart.svg"
            alt="cart"
            width={21}
            height={21}
            priority
          />
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
