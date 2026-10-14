import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import styles from '@/styles/Items.module.css';
import firebase_app from "@/components/config";
import IntentLink from '@/components/IntentLink';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SKELETON_COUNT = 8;

export default function Items() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { gender } = router.query;

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      const db = getDatabase(firebase_app);
      const productsRef = ref(db, 'shoes');
      const snapshot = await get(productsRef);

      if (cancelled) {
        return;
      }

      if (snapshot.exists()) {
        let items = Object.entries(snapshot.val());

        if (gender) {
          items = items.filter(([_, product]) => product.gender === gender);
        }

        setProducts(items);
      } else {
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [gender]);

  return (
      <div className={styles.container}>
        <div className={styles.filters}>
          <IntentLink href="/items" className={gender ? styles.filterLink : styles.activeFilter}>
            Tous
          </IntentLink>
          <IntentLink href="/items?gender=homme" className={gender === 'homme' ? styles.activeFilter : styles.filterLink}>
            Homme
          </IntentLink>
          <IntentLink href="/items?gender=femme" className={gender === 'femme' ? styles.activeFilter : styles.filterLink}>
            Femme
          </IntentLink>
        </div>
        
        <div className={styles.grid}>
          {loading
            ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <div key={`skeleton-${i}`} className={styles.skeletonCard} aria-hidden="true">
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonLine} />
                  <div className={[styles.skeletonLine, styles.skeletonLineShort].join(' ')} />
                </div>
              ))
            : products.map(([id, product]) => {
                const mainImage = JSON.parse(product.filename)[0];
                const href = `/product?id=${encodeURIComponent(product.name)}`;
                return (
                  <IntentLink href={href} key={id} className={styles.card}>
                    <Image
                      src={`/images/${mainImage}`}
                      alt={product.name}
                      width={200}
                      height={200}
                      priority
                    />
                    <h3>{product.name}</h3>
                    <p className={styles.price}>${product.price}</p>
                  </IntentLink>
                );
              })}
        </div>
      </div>
  );
}
