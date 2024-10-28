import Link from "next/link";
import Layout from '@/components/layout'
const OrderConfirmation = () => {
    return (
        <Layout>
        <div>
            <h1>Commande confirmée</h1>
            <p>Merci pour votre commande !</p>
            <Link href="/">Retour à l'accueil</Link>
        </div>
        </Layout>
    );
};

export default OrderConfirmation;
