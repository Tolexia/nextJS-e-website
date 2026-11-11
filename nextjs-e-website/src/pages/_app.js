import '@/styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAnalytics } from "firebase/analytics";
import firebase_app from "@/components/config"
import Layout from '@/components/layout'
import { CartProvider } from '@/components/cartContext'

let analyticsStarted = false;

function enableAnalytics() {
  if (analyticsStarted || typeof window === 'undefined') {
    return;
  }
  analyticsStarted = true;
  try {
    getAnalytics(firebase_app);
  } catch (error) {
    analyticsStarted = false;
    console.error(error);
  }
}

function useStorefrontShell(pathname) {
  return !pathname.startsWith('/admin') && pathname !== '/login'
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showShell = useStorefrontShell(router.pathname);

  useEffect(() => {
    if (window.localStorage.getItem('cookie-consent') === 'accepted') {
      enableAnalytics();
    }
    const onAccept = () => enableAnalytics();
    window.addEventListener('cookie-consent-accepted', onAccept);
    return () => window.removeEventListener('cookie-consent-accepted', onAccept);
  }, []);

  const page = <Component {...pageProps} />;

  if (!showShell) {
    return page;
  }

  return (
    <CartProvider>
      <Layout>{page}</Layout>
    </CartProvider>
  );
}
