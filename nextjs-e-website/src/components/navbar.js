import styles from '@/styles/Navbar.module.css'
export default function Navbar() {
  return (
    <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <a className={styles.brand}>sneakers</a>
          <a>Collections</a>
          <a>Men</a>
          <a>Women</a>
          <a>About</a>
          <a>Contact</a>
        </div>
        <div className={styles.navRight}>

        </div>
    </nav>
  )
}
