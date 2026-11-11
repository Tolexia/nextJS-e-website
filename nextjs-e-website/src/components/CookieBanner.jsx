import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/CookieBanner.module.css";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const choose = (value) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
    if (value === "accepted") {
      window.dispatchEvent(new Event("cookie-consent-accepted"));
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookies">
      <p>
        La mesure d&apos;audience reste éteinte tant que vous n&apos;acceptez pas.
        <Link href="/cookies"> En savoir plus</Link>
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={() => choose("refused")}>Refuser</button>
        <button type="button" onClick={() => choose("accepted")}>Accepter</button>
      </div>
    </div>
  );
}
