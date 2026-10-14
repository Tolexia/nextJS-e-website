import Link from "next/link";
const OrderConfirmation = () => {
    return (
        <div>
            <h1>Commande confirmée</h1>
            <p>Merci pour votre commande !</p>
            <Link href="/">Retour à l&apos;accueil</Link>
        </div>
    );
};

export default OrderConfirmation;
