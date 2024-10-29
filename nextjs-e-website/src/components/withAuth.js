import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from './auth';

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const user = getCurrentUser();
      if (!user) {
        router.replace('/login');
      }
    }, [router]);

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