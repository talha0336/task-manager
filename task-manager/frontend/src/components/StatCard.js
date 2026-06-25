import styles from './StatCard.module.css';

export default function StatCard({ label, value, color }) {
  return (
    <div className={styles.card} style={{ borderTop: `4px solid ${color}` }}>
      <div className={styles.value} style={{ color }}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
