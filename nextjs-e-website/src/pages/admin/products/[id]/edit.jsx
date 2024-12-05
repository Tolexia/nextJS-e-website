import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import Layout from '@/components/layout';
import ProductForm from '@/components/ProductForm';
import firebase_app from "@/components/config";
import WithAuth from '@/components/withAuth';
import styles from '@/styles/Admin.module.css';

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const db = getDatabase(firebase_app);
    const productRef = ref(db, `shoes/${id}`);
    const snapshot = await get(productRef);
    if (snapshot.exists()) {
      setProduct(snapshot.val());
    }
  };

  const handleSubmit = async (formData) => {
    const db = getDatabase(firebase_app);
    const productRef = ref(db, `shoes/${id}`);
    await update(productRef, formData);
    router.push('/admin/products');
  };

  if (!product) return <div>Chargement...</div>;

  return (
    <Layout>
      <div className={styles.adminContainer}>
        <h1>Modifier le produit</h1>
        <ProductForm 
          product={product} 
          onSubmit={handleSubmit} 
          buttonText="Mettre à jour" 
        />
      </div>
    </Layout>
  );
};

export default WithAuth(EditProduct);