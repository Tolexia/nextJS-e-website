import { useState, useEffect } from 'react';
import { getDatabase, ref, get, push, remove } from "firebase/database";
import Layout from '@/components/layout';
import styles from '@/styles/Admin.module.css';
import firebase_app from "@/components/config";
import WithAuth from '@/components/withAuth';
import Link from 'next/link';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', brand: '', description: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const db = getDatabase(firebase_app);
    const productsRef = ref(db, 'shoes');
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      setProducts(Object.entries(snapshot.val()));
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const db = getDatabase(firebase_app);
    const productsRef = ref(db, 'shoes');
    await push(productsRef, newProduct);
    setNewProduct({ name: '', price: '', brand: '', description: '' });
    fetchProducts();
  };

  const deleteProduct = async (productId) => {
    const db = getDatabase(firebase_app);
    const productRef = ref(db, `shoes/${productId}`);
    await remove(productRef);
    fetchProducts();
  };
  return (
    <Layout>
      <div className={styles.adminContainer}>
        <h1>Administration des produits</h1>
        <Link href="/admin/products/add">
          <button>Ajouter un nouveau produit</button>
        </Link>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Marque</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(([id, product]) => (
              <tr key={id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>
                  <Link href={`/admin/products/${id}/edit`}>
                    <button>Modifier</button>
                  </Link>
                  <button onClick={() => deleteProduct(id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default WithAuth(AdminProducts);