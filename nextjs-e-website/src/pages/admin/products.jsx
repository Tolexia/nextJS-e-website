import { useState, useEffect } from 'react';
import { getDatabase, ref, get, push, remove } from "firebase/database";
import Layout from '@/components/layout';
import styles from '@/styles/Admin.module.css';
import firebase_app from "@/components/config";
import withAuth from '@/components/withAuth';

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
        <form onSubmit={addProduct}>
          <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Nom du produit" required />
          <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Prix" required />
          <input type="text" name="brand" value={newProduct.brand} onChange={handleInputChange} placeholder="Marque" required />
          <textarea name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Description" required />
          <button type="submit">Ajouter un produit</button>
        </form>
        <ul>
          {products.map(([id, product]) => (
            <li key={id}>
              {product.name} - ${product.price}
              <button onClick={() => deleteProduct(id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default withAuth(AdminProducts);