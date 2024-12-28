import { useState, useEffect } from 'react';
import { getDatabase, ref, get, set } from "firebase/database";
import Layout from '@/components/layout';
import styles from '@/styles/Admin.module.css';
import firebase_app from "@/components/config";
import WithAuth from '@/components/withAuth';
import Link from 'next/link';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const fetchOrders = async () => {
    const db = getDatabase(firebase_app);
    const ordersRef = ref(db, 'orders');
    const snapshot = await get(ordersRef);
    if (snapshot.exists()) {
      setOrders(Object.entries(snapshot.val()));
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    const db = getDatabase(firebase_app);
    const orderRef = ref(db, `orders/${orderId}`);
    await set(orderRef, { ...orders.find(([id]) => id === orderId)[1], status: newStatus });
    fetchOrders();
  };

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      }
      return [...prev, orderId];
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map(([id]) => id));
    } else {
      setSelectedOrders([]);
    }
  };

  const generateShippingLabels = async () => {
    if (selectedOrders.length === 0) {
      alert('Veuillez sélectionner au moins une commande');
      return;
    }

    const selectedOrdersData = orders
      .filter(([id]) => selectedOrders.includes(id))
      .map(([id, order]) => ({
        id,
        ...order
      }));

    try {
      const response = await fetch('/api/generate-shipping-labels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders: selectedOrdersData }),
      });

      if (!response.ok) throw new Error('Erreur lors de la génération des étiquettes');

      // Récupérer le PDF et l'ouvrir dans un nouvel onglet
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la génération des étiquettes');
    }
  };

  return (
    <Layout>
      <div className={styles.adminContainer}>
        <h1>Administration des Commandes</h1>
        <div className={styles.actionsBar}>
          <Link href="/admin/orders/add">
            <button>Nouvelle commande</button>
          </Link>
          <button 
            onClick={generateShippingLabels}
            className={styles.printButton}
            disabled={selectedOrders.length === 0}
          >
            Imprimer les étiquettes ({selectedOrders.length})
          </button>
        </div>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedOrders.length === orders.length}
                />
              </th>
              <th>N° Commande</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(([id, order]) => (
              <tr key={id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(id)}
                    onChange={() => handleCheckboxChange(id)}
                  />
                </td>
                <td>#{id.slice(0, 8)}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(id, e.target.value)}
                  >
                    <option value="en attente">En attente</option>
                    <option value="expédiée">Expédiée</option>
                    <option value="livrée">Livrée</option>
                  </select>
                </td>
                <td>
                  <Link href={`/admin/orders/${id}/edit`}>
                    <button>Modifier</button>
                  </Link>
                  <button onClick={() => deleteOrder(id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default WithAuth(AdminOrders);