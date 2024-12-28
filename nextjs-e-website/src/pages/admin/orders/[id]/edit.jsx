import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import Layout from '@/components/layout';
import OrderForm from '@/components/OrderForm';
import firebase_app from "@/components/config";
import WithAuth from '@/components/withAuth';
import styles from '@/styles/Admin.module.css';

const EditOrder = () => {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const fetchOrder = async () => {
    const db = getDatabase(firebase_app);
    const orderRef = ref(db, `orders/${id}`);
    const snapshot = await get(orderRef);
    if (snapshot.exists()) {
      setOrder(snapshot.val());
    }
  };

  const handleSubmit = async (formData) => {
    const db = getDatabase(firebase_app);
    const orderRef = ref(db, `orders/${id}`);
    await update(orderRef, formData);
    router.push('/admin/orders');
  };

  if (!order) return <div>Chargement...</div>;

  return (
    <Layout>
      <div className={styles.adminContainer}>
        <h1>Modifier la commande</h1>
        <OrderForm 
          order={order} 
          onSubmit={handleSubmit} 
          buttonText="Mettre à jour" 
        />
      </div>
    </Layout>
  );
};

export default WithAuth(EditOrder); 