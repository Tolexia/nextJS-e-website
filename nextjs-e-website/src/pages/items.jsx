import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import Layout from '@/components/layout';
import styles from '@/styles/Items.module.css';
import firebase_app from "@/components/config";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Items() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { gender } = router.query;

  useEffect(() => {
    fetchProducts();
  }, [gender]);

  const fetchProducts = async () => {
    const db = getDatabase(firebase_app);
    const productsRef = ref(db, 'shoes');
    const snapshot = await get(productsRef);
    
    if (snapshot.exists()) {
      let items = Object.entries(snapshot.val());
      
      // Filtrer par genre si le paramètre est présent
      if (gender) {
        items = items.filter(([_, product]) => product.gender === gender);
      }
      
      setProducts(items);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.filters}>
          <Link href="/items" className={gender ? styles.filterLink : styles.activeFilter}>
            Tous
          </Link>
          <Link href="/items?gender=homme" className={gender === 'homme' ? styles.activeFilter : styles.filterLink}>
            Homme
          </Link>
          <Link href="/items?gender=femme" className={gender === 'femme' ? styles.activeFilter : styles.filterLink}>
            Femme
          </Link>
        </div>
        
        <div className={styles.grid}>
          {products.map(([id, product]) => {
            const mainImage = JSON.parse(product.filename)[0];
            return (
              <Link href={`/product?id=${encodeURIComponent(product.name)}`} key={id} className={styles.card}>
                <Image
                  src={`/images/${mainImage}`}
                  alt={product.name}
                  width={200}
                  height={200}
                  priority
                />
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
} 