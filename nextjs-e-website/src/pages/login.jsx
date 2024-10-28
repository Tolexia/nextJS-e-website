import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '@/components/auth';
import styles from '@/styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (error) {
      setError("Échec de l'authentification. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Connexion au back office</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}