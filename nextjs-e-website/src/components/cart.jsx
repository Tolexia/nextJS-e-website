import styles from "@/styles/Cart.module.css";
import Image from 'next/image'
import Link from 'next/link'
import { resolveCartImage } from '@/utils/cartImage'
import { useCart } from '@/components/cartContext'

export default function Cart()
{
    const { items } = useCart();
    const shipping = 10;
    let computedTotal = 0;

    const order = items.map((item, i) => {
        if (!item || typeof item !== 'object') {
            return null;
        }
        const quantity = Number(item.nb) || 0;
        const totalThisItem = parseFloat(item.price) * quantity;
        const VAT = 0.20 * totalThisItem;
        computedTotal += totalThisItem + VAT;
        const imageSrc = resolveCartImage(item.filename);
        return (
            <div id={i} key={i} className={styles.cartItem}>
                <Image
                    src={imageSrc}
                    alt={item.name || 'Product'}
                    width={60}
                    height={60}
                />
                <div className={styles.itemDescription}>
                    <span className={styles.itemname}>{item.name}</span>
                    <span className={styles.itemprice}>${item.price}</span>
                </div>
                <span data-id={i}>x{quantity}</span>
            </div>
        );
    });

    return (
        <div className={styles.cartSection}>
            <h2>SUMMARY</h2>
            {order.length > 0 ? <div className={styles.items}>{order}</div> : null}
            <div className={styles.resumeItem}>
                <span className={styles.resumeleft}>TOTAL</span>
                <span className={styles.resumeright}>$ {computedTotal}</span>
            </div>
            <div className={styles.resumeItem}>
                <span className={styles.resumeleft}>SHIPPING</span>
                <span className={styles.resumeright}>$ {shipping}</span>
            </div>
            <div className={styles.resumeItem}>
                <span className={styles.resumeleft}>VAT (INCLUDED)</span>
                <span className={styles.resumeright}>$ {0.20*computedTotal}</span>
            </div>
            <div className={styles.resumeItem}>
                <span className={styles.resumeleft}>GRAND TOTAL</span>
                <span className={styles.resumeright}>$ {computedTotal+shipping}</span>
            </div>
            <Link className={styles.link} href = "">CONTINUE & PAY</Link>
        </div>
    )
}
