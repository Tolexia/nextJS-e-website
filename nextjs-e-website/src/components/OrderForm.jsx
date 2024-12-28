import { useState } from 'react';
import styles from '@/styles/OrderForm.module.css';

const OrderForm = ({ order, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    name: order?.name || '',
    email: order?.email || '',
    phone: order?.phone || '',
    address: order?.address || '',
    zipcode: order?.zipcode || '',
    city: order?.city || '',
    country: order?.country || '',
    paymentMethod: order?.paymentMethod || '',
    status: order?.status || 'en attente',
    items: order?.items || []
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.section}>
        <h3>Informations client</h3>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nom"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Téléphone"
          required
        />
      </div>

      <div className={styles.section}>
        <h3>Adresse de livraison</h3>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Adresse"
          required
        />
        <input
          type="text"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleInputChange}
          placeholder="Code postal"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Ville"
          required
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="Pays"
          required
        />
      </div>

      <div className={styles.section}>
        <h3>Paiement et statut</h3>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
          required
        >
          <option value="">Sélectionner un mode de paiement</option>
          <option value="e-Money">e-Money</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="en attente">En attente</option>
          <option value="expédiée">Expédiée</option>
          <option value="livrée">Livrée</option>
        </select>
      </div>

      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default OrderForm; 