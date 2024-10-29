



import { useState, useEffect } from 'react';
import { getDatabase, ref, get, set } from "firebase/database";
import Layout from '@/components/layout';
import styles from '@/styles/Admin.module.css';
import firebase_app from "@/components/config";
import WithAuth from '@/components/withAuth';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const db = getDatabase(firebase_app);
    const ordersRef = ref(db, 'orders');
    const snapshot = await get(ordersRef);
    if (snapshot.exists()) {
      setOrders(Object.entries(snapshot.val()));
    }
  };
  
  // Appelez fetchOrders dans useEffect
  useEffect(() => {
    fetchOrders();
  }, []);
  
  // Ajoutez cette fonction
  const updateOrderStatus = async (orderId, newStatus) => {
    const db = getDatabase(firebase_app);
    const orderRef = ref(db, `orders/${orderId}`);
    await set(orderRef, { ...orders.find(([id]) => id === orderId)[1], status: newStatus });
    fetchOrders();
  };

  return (
    <Layout>
      <div className={styles.adminContainer}>
        <h1>Administration des Commandes</h1>
        <div className={styles.ordersSection}>
          <ul>
            {orders.map(([id, order]) => (
              <li key={id}>
        Commande #{id.slice(0, 8)} - Statut: {order.status}
        <select
          value={order.status}
          onChange={(e) => updateOrderStatus(id, e.target.value)}
        >
          <option value="en attente">En attente</option>
          <option value="expédiée">Expédiée</option>
          <option value="livrée">Livrée</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default WithAuth(AdminOrders);