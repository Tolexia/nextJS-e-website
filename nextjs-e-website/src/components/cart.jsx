import styles from "@/styles/Cart.module.css";
import Image from 'next/image'
import { resolveCartImage } from '@/utils/cartImage'
import { useCart } from '@/components/cartContext'

export default function Cart()
{
    const { items } = useCart();
    let computedTotal = 0;

    const order = items.map((item, i) => {
        if (!item || typeof item !== 'object') {
            return null;
        }
        const quantity = Number(item.nb) || 0;
        const totalThisItem = (Number.parseFloat(item.price) || 0) * quantity;
        computedTotal += totalThisItem;
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
            <p>Frais de port non facturés. Le serveur recalcule ce total avant Stripe.</p>
        </div>
    )
}
