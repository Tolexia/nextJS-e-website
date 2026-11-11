import LegalPage from "@/components/LegalPage";
import { seller, sellerField } from "@/config/seller";

export default function Confidentialite() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      description="Données collectées pour la commande et la mesure d'audience."
    >
      <h2>Responsable</h2>
      <p>{sellerField(seller.name)} — {sellerField(seller.email)}</p>
      <h2>Commande</h2>
      <p>
        Nom, e-mail, téléphone et adresse sont enregistrés pour livrer la
        commande et prouver le paiement. Base : exécution du contrat. Durée :
        le temps des obligations comptables applicables, à préciser avec le
        conseil du vendeur avant ouverture.
      </p>
      <h2>Paiement</h2>
      <p>
        Les données de carte sont saisies chez Stripe. Ce site ne les stocke pas.
      </p>
      <h2>Mesure d&apos;audience</h2>
      <p>
        Google Analytics via Firebase ne démarre qu&apos;après acceptation du
        bandeau cookies. Le refus n&apos;empêche pas de commander.
      </p>
      <h2>Droits</h2>
      <p>
        Accès, rectification, effacement, limitation, opposition et portabilité :
        {sellerField(seller.email)}. Réclamation possible auprès de la CNIL.
      </p>
    </LegalPage>
  );
}
