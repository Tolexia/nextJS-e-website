import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from './auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const user = getCurrentUser();
      if (!user) {
        router.replace('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;