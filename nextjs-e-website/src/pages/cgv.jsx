import LegalPage from "@/components/LegalPage";
import { seller, sellerField } from "@/config/seller";

export default function Cgv() {
  return (
    <LegalPage
      title="Conditions générales de vente"
      description="Prix, paiement, livraison et rétractation."
    >
      <h2>Prix</h2>
      <p>
        Le prix payé est celui enregistré sur la fiche produit au moment de la
        commande, en dollars américains. Le montant est recalculé par le serveur.
        Un prix modifié dans le navigateur n&apos;est pas pris en compte.
      </p>
      <h2>Paiement</h2>
      <p>
        Le paiement est encaissé par Stripe. La commande reste en attente de
        paiement jusqu&apos;à confirmation de Stripe, puis passe au statut payée.
      </p>
      <h2>Livraison</h2>
      <p>
        Les frais de port ne sont pas encore facturés séparément. L&apos;adresse
        saisie au checkout est l&apos;adresse de livraison.
      </p>
      <h2>Rétractation</h2>
      <p>
        Pour un achat à distance auprès d&apos;un vendeur établi en France, le
        client consommateur dispose de 14 jours pour se rétracter, à compter de
        la réception. La demande se fait à {sellerField(seller.email)}. Le
        remboursement est dû dans les 14 jours suivant la demande, via le moyen
        de paiement utilisé.
      </p>
      <h2>Médiation</h2>
      <p>
        Le médiateur de la consommation compétent doit être indiqué ici avant
        l&apos;ouverture au public.
      </p>
    </LegalPage>
  );
}
