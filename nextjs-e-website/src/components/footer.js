import styles from "@/styles/footer.module.css"
import Link from 'next/link'

export default function Footer()
{
    return(
    <footer className={styles.footer}>
        <div className={styles.footerLeft}>
            <h7>sneakers</h7>
            <p>Sneakers in an all in one stop to fullfill your style needs. We are a small team of shoes lovers and streetwear specialists who are devoted to helping you shine amongst the crowd.Come and visit our demo facility - we are open 7 days a week.</p>
            <span>Copyright 2023. All Rights Reserved</span>
        </div>
        <div className={styles.footerRight}>
            <div className={styles.links}>
                <Link href = "/">Home</Link>
                <Link href = "/add">New</Link>
            </div>
        </div>
    </footer>
    )
}