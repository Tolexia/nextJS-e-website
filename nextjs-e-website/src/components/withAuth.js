import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logOut, userIsAdmin } from './auth';
import styles from '@/styles/Admin.module.css';

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const router = useRouter();
    const [status, setStatus] = useState('loading');
    const [email, setEmail] = useState('');

    useEffect(() => {
      let active = true;

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          if (active) setStatus('loading');
          router.replace('/login');
          return;
        }

        try {
          const allowed = await userIsAdmin(user);
          if (!active) return;
          if (!allowed) {
            setEmail(user.email || '');
            setStatus('forbidden');
            return;
          }
          setStatus('ok');
        } catch (error) {
          console.error(error);
          if (active) setStatus('forbidden');
        }
      });

      return () => {
        active = false;
        unsubscribe();
      };
    }, [router]);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (status === 'forbidden') {
      return (
        <div className={styles.adminContainer}>
          <h1>Accès refusé</h1>
          <p>Le compte {email} ne peut pas ouvrir l’administration.</p>
          <button type="button" onClick={() => logOut().then(() => router.replace('/login'))}>
            Se déconnecter
          </button>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  // Ajout du displayName pour résoudre l'erreur react/display-name
  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  
  return WithAuthComponent;
};

// Fonction utilitaire pour obtenir le nom d'affichage du composant
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;