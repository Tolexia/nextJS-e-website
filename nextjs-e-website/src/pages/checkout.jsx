import Head from 'next/head'
import styles from '@/styles/Checkout.module.css'
import Cart from "@/components/cart"
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/components/cartContext';

function cartLines(items) {
    const quantities = new Map();
    for (const item of items) {
        if (!item?.id) {
            throw new Error("Un article du panier est trop ancien. Retirez-le, puis ajoutez-le à nouveau depuis sa fiche.");
        }
        const quantity = Number(item.nb) || 0;
        if (quantity <= 0) {
            continue;
        }
        quantities.set(item.id, (quantities.get(item.id) || 0) + quantity);
    }
    if (quantities.size === 0) {
        throw new Error("Le panier est vide.");
    }
    return [...quantities.entries()].map(([id, quantity]) => ({ id, quantity }));
}

function Checkout() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const { items } = useCart();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    zipcode: formData.zipcode,
                    city: formData.city,
                    country: formData.country,
                    items: cartLines(items),
                }),
            });
            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(payload.message || "Le paiement n'a pas pu démarrer.");
            }
            window.location.assign(payload.url);
        } catch (submitError) {
            setError(submitError.message || "Le paiement n'a pas pu démarrer.");
            setSubmitting(false);
        }
    };

    return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Paiement de la commande" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={styles.mainSection}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>CHECKOUT</h1>
                {router.query.canceled && <p className={styles.error}>Paiement annulé. Votre panier est inchangé.</p>}
                {error && <p className={styles.error}>{error}</p>}
                <div>
                <h3>BILLING DETAILS</h3>
                <div className={styles.formdiv}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" name="phone" id="phone" onChange={handleInputChange} required />
                </div>
                </div>
            </div>
            <div>
                <h3>SHIPPING INFO</h3>
                <div className={styles.formdiv}>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="zipcode">ZIP Code</label>
                    <input type="text" name="zipcode" id="zipcode" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" id="country" onChange={handleInputChange} required />
                </div>
                </div>
            </div>
            <p>Le montant est recalculé sur le serveur, puis encaissé par Stripe en dollars.</p>
            <button type="submit" className={styles.submitButton} disabled={submitting || items.length === 0}>
                {submitting ? "REDIRECTION..." : "PAYER"}
            </button>
            </form>
            <Cart/>
        </main>
    </>
  )
}

export default Checkout;
