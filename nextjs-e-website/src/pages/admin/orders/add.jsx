import { useRouter } from 'next/router';
import { getDatabase, ref, push } from "firebase/database";
import Layout from '@/components/layout';
import OrderForm from '@/components/OrderForm';
import firebase_app from "@/components/config";
import WithAuth from '@/components/withAuth';
import styles from '@/styles/Admin.module.css';

const AddOrder = () => {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    const db = getDatabase(firebase_app);
    const ordersRef = ref(db, 'orders');
    await push(ordersRef, {
      ...formData,
      date: new Date().toISOString()
    });
    router.push('/admin/orders');
  };

  return (
    <Layout>
      <div className={styles.adminContainer}>
        <h1>Ajouter une commande</h1>
        <OrderForm onSubmit={handleSubmit} buttonText="Ajouter" />
      </div>
    </Layout>
  );
};

export default WithAuth(AddOrder); 