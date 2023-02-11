import styles from '@/styles/Navbar.module.css'
function handleClick() {
  console.log('increment like count');
}
export default function Navbar() {
  return (
    <nav className={styles.nav}>
        <a className={styles.brand}>sneakers</a>
        <a>Collections</a>
        <a>Men</a>
        <a>Women</a>
        <a>About</a>
        <a>Contact</a>
        <button onClick={handleClick}>Like</button>
    </nav>
  )
}
