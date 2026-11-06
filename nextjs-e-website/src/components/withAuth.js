import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAdminUser, waitForAuthUser } from './auth';

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const router = useRouter();
    const [content, setContent] = useState(<div>Loading...</div>);

    useEffect(() => {
      let cancelled = false;

      (async () => {
        const user = await waitForAuthUser();
        if (!user) {
          router.replace('/login');
          return;
        }

        const admin = await isAdminUser(user);
        if (!admin) {
          router.replace('/login');
          return;
        }

        if (!cancelled) {
          setContent(<WrappedComponent {...props} />);
        }
      })();

      return () => {
        cancelled = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps -- gate once per mount
    }, [router]);

    return content;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthComponent;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
