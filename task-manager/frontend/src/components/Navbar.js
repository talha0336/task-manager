import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>✅ TaskFlow</div>
      <div className={styles.right}>
        <span className={styles.name}>Hi, {user?.name?.split(' ')[0]}</span>
        <button onClick={logout} className={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
}
