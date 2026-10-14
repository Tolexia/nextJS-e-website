import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * Link that skips default viewport prefetch and warms the route on intent.
 */
export default function IntentLink({ href, children, ...props }) {
  const router = useRouter();

  const prefetchRoute = () => {
    if (href) {
      router.prefetch(href);
    }
  };

  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={prefetchRoute}
      onFocus={prefetchRoute}
      {...props}
    >
      {children}
    </Link>
  );
}
