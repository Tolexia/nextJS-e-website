import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from './auth';

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const router = useRouter();
    const [content, setContent] = useState(<div>Loading...</div>);

    useEffect(() => {
      const user = getCurrentUser();
      if (!user) {
        router.replace('/login');
      }else{
          setContent(<WrappedComponent {...props} />)
      }
    }, [router]);

    return content;
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