import Head from "next/head";
import { seller, sellerField, sellerIsComplete } from "@/config/seller";
import styles from "@/styles/Legal.module.css";

export default function LegalPage({ title, description, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <article className={styles.article}>
        {!sellerIsComplete() && (
          <p className={styles.warning} role="status">
            Identité du vendeur incomplète dans la configuration. Ne pas ouvrir
            la boutique au public tant que le nom, l&apos;adresse, le SIRET et
            l&apos;e-mail ne sont pas renseignés.
          </p>
        )}
        <h1>{title}</h1>
        <p>{sellerField(seller.name)}, {sellerField(seller.legalForm)}</p>
        <p>{sellerField(seller.address)}</p>
        <p>SIRET : {sellerField(seller.siret)}</p>
        <p>TVA : {sellerField(seller.vatNumber)}</p>
        <p>Contact : {sellerField(seller.email)} {seller.phone ? ` / ${seller.phone}` : ""}</p>
        {children}
      </article>
    </>
  );
}
