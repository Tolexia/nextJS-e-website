import Layout from '@/components/layout';
import styles from '@/styles/About.module.css';
import Image from 'next/image';

export default function About() {
  return (
    <Layout>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1>Our Passion for Sneakers</h1>
          <p className={styles.subtitle}>
            Discover excellence and authenticity in every pair
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
            <h2>Our Story</h2>
            <p>
              Since our inception, we&apos;ve been committed to offering the finest sneakers with exceptional customer service. Our passion for sneakers drives us to meticulously select each model to ensure style, comfort, and quality.
            </p>
          </div>

          <div className={styles.qualitySection}>
            <h2>Our Quality Commitment</h2>
            <div className={styles.qualityGrid}>
              <div className={styles.qualityItem}>
                <h3>Guaranteed Authenticity</h3>
                <p>Each pair is authenticated and sourced directly from official manufacturers.</p>
              </div>
              <div className={styles.qualityItem}>
                <h3>Premium Selection</h3>
                <p>We choose only the best models from the most reputable brands.</p>
              </div>
              <div className={styles.qualityItem}>
                <h3>Dedicated Customer Service</h3>
                <p>Our team is available 7 days a week to answer your questions and provide guidance.</p>
              </div>
              <div className={styles.qualityItem}>
                <h3>Careful Delivery</h3>
                <p>Premium packaging and fast shipping for a perfect shopping experience.</p>
              </div>
            </div>
          </div>

          <div className={styles.promiseSection}>
            <h2>Our Customer Promise</h2>
            <ul>
              <li>30-day satisfaction guarantee or money back</li>
              <li>Competitive and transparent pricing</li>
              <li>Personalized order tracking</li>
              <li>Exclusive loyalty program</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
} 