import styles from './Header.module.css';

interface HeaderProps {
  logout: () => void;
}

export function Header({ logout }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav>
        <h1>✏️ Tasks</h1>
        <button onClick={logout}>logout</button>
      </nav>
    </header>
  );
}