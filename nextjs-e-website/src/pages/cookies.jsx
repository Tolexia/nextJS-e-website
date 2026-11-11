import LegalPage from "@/components/LegalPage";

export default function Cookies() {
  return (
    <LegalPage
      title="Cookies"
      description="Cookies de panier et de mesure d'audience."
    >
      <h2>Nécessaires</h2>
      <p>
        Le panier est gardé dans le stockage local du navigateur. Ce n&apos;est
        pas un cookie tiers. Il n&apos;est pas utilisé pour suivre la navigation.
      </p>
      <h2>Mesure d&apos;audience</h2>
      <p>
        Firebase Analytics n&apos;est activé que si vous acceptez. Vous pouvez
        refuser, ou effacer le choix en supprimant la clé cookie-consent du
        stockage local.
      </p>
    </LegalPage>
  );
}
