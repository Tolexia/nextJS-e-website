import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { getAnalytics } from "firebase/analytics";
import firebase_app from "@/components/config"
import Layout from '@/components/layout'
import { CartProvider } from '@/components/cartContext'

function useStorefrontShell(pathname) {
  return !pathname.startsWith('/admin') && pathname !== '/login'
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showShell = useStorefrontShell(router.pathname);

  if (firebase_app.name && typeof window !== 'undefined') {
    getAnalytics(firebase_app);
  }

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
