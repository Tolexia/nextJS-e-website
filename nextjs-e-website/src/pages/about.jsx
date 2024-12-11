import Layout from '@/components/layout';
import styles from '@/styles/About.module.css';
import Image from 'next/image';

export default function About() {
  return (
    <Layout>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1>Notre Passion pour les Sneakers</h1>
          <p className={styles.subtitle}>
            Découvrez l'excellence et l'authenticité dans chaque paire
          </p>
        </section>

        <section className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/about-hero.jpg"
              alt="Sneakers collection"
              width={600}
              height={400}
              priority
              className={styles.aboutImage}
            />
          </div>

          <div className={styles.textSection}>
            <h2>Notre Histoire</h2>
            <p>
              Depuis notre création, nous nous sommes engagés à offrir les meilleures sneakers avec un service client exceptionnel. Notre passion pour les sneakers nous pousse à sélectionner méticuleusement chaque modèle pour vous garantir style, confort et qualité.
            </p>
          </div>

          <div className={styles.qualitySection}>
            <h2>Notre Engagement Qualité</h2>
            <div className={styles.qualityGrid}>
              <div className={styles.qualityItem}>
                <h3>Authenticité Garantie</h3>
                <p>Chaque paire est authentifiée et provient directement des fabricants officiels.</p>
              </div>
              <div className={styles.qualityItem}>
                <h3>Sélection Premium</h3>
                <p>Nous choisissons uniquement les meilleurs modèles des marques les plus réputées.</p>
              </div>
              <div className={styles.qualityItem}>
                <h3>Service Client Dévoué</h3>
                <p>Notre équipe est disponible 7j/7 pour répondre à vos questions et vous conseiller.</p>
              </div>
              <div className={styles.qualityItem}>
                <h3>Livraison Soignée</h3>
                <p>Emballage premium et livraison rapide pour une expérience d'achat parfaite.</p>
              </div>
            </div>
          </div>

          <div className={styles.promiseSection}>
            <h2>Notre Promesse Client</h2>
            <ul>
              <li>Satisfaction garantie ou remboursé sous 30 jours</li>
              <li>Prix compétitifs et transparents</li>
              <li>Suivi personnalisé de chaque commande</li>
              <li>Programme de fidélité exclusif</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
} 