import { useRouter } from 'next/router';
import { getDatabase, ref, push } from "firebase/database";
import Layout from '@/components/layout';
import ProductForm from '@/components/ProductForm';
import firebase_app from "@/components/config";
import WithAuth from '@/components/withAuth';
import styles from '@/styles/Admin.module.css';

const AddProduct = () => {
    const router = useRouter();

  const handleSubmit = async (formData) => {
    const db = getDatabase(firebase_app);
    const productsRef = ref(db, 'shoes');
    await push(productsRef, formData);
    router.push('/admin/products');
  };

  return (
    <Layout>
      <div className={styles.adminContainer}>
        <h1>Ajouter un produit</h1>
        <ProductForm onSubmit={handleSubmit} buttonText="Ajouter" />
      </div>
    </Layout>
  );
};

export default WithAuth(AddProduct);