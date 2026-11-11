import LegalPage from "@/components/LegalPage";
import { seller, sellerField } from "@/config/seller";

export default function MentionsLegales() {
  return (
    <LegalPage
      title="Mentions légales"
      description="Éditeur du site, hébergeur et contact."
    >
      <h2>Édition</h2>
      <p>Directeur de la publication : {sellerField(seller.publicationDirector)}</p>
      <h2>Hébergement de l&apos;application</h2>
      <p>
        {seller.host}, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
        La base de données et les images sont hébergées par Google Firebase
        (Google Ireland Ltd pour les clients européens).
      </p>
      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, photographies et marques présentés sur ce site restent la
        propriété de leurs titulaires. Toute reproduction non autorisée est interdite.
      </p>
    </LegalPage>
  );
}
