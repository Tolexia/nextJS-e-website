import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import styles from '@/styles/Admin.module.css';
import withAuth from '@/components/withAuth';
import { logOut } from '@/components/auth';
import Link from 'next/link';

const Admin = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/login');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <Layout>
      <div className={styles.adminContainer}>
        <h1>Dashboard Administrateur</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>Déconnexion</button>
        <nav className={styles.adminNav}>
          <Link href="/admin/products" className={styles.adminLink}>
           Gestion des Produits
          </Link>
          <Link href="/admin/orders" className={styles.adminLink}>
            Gestion des Commandes
          </Link>
        </nav>
      </div>
    </Layout>
  );
};

export default withAuth(Admin);