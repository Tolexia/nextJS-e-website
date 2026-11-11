import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "@/components/cartContext";

const OrderConfirmation = () => {
    const router = useRouter();
    const { clearCart } = useCart();
    const cleared = useRef(false);
    const sessionId = typeof router.query.session_id === "string" ? router.query.session_id : "";

    useEffect(() => {
        if (!sessionId || cleared.current) {
            return;
        }
        cleared.current = true;
        clearCart();
    }, [sessionId, clearCart]);

    return (
        <div>
            <h1>Paiement accepté</h1>
            {sessionId ? (
                <p>Stripe a accepté le paiement. La commande passe au statut payée dès réception de la confirmation.</p>
            ) : (
                <p>Aucune session de paiement n&apos;est associée à cette page.</p>
            )}
            <Link href="/">Retour à l&apos;accueil</Link>
        </div>
    );
};

export default OrderConfirmation;
