import styles from "@/styles/footer.module.css"

export default function Footer()
{
    return(
    <footer className={styles.footer}>
        <div>
            <h7>sneakers</h7>
            <p>Sneakers in an all in one stop to fullfill your style needs. We're a small team of shoes lovers and streetwear specialists who are devoted to helping you shine amongst the crowd.Come and visit our demo facility - we're open 7 days a week.</p>
            <span>Copyright 2023. All Rights Reserved</span>
        </div>
        <div>
            <div>
                <a href = "/">Home</a>
                <a href = "/add">New</a>
            </div>
        </div>
    </footer>
    )
}