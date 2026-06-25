import styles from './TaskCard.module.css';

const PRIORITY_COLORS = { high: '#e53e3e', medium: '#ed8936', low: '#48bb78' };
const STATUS_STYLES = {
  'pending': { bg: '#fff5f5', color: '#c53030', label: 'Pending' },
  'in-progress': { bg: '#fffbeb', color: '#b7791f', label: 'In Progress' },
  'completed': { bg: '#f0fff4', color: '#276749', label: 'Completed' }
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const status = STATUS_STYLES[task.status];
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={styles.card} style={{ borderLeft: `4px solid ${PRIORITY_COLORS[task.priority]}` }}>
      <div className={styles.top}>
        <span className={styles.status} style={{ background: status.bg, color: status.color }}>{status.label}</span>
        <div className={styles.actions}>
          <button onClick={() => onEdit(task)} className={styles.editBtn} title="Edit">✏️</button>
          <button onClick={() => onDelete(task._id)} className={styles.deleteBtn} title="Delete">🗑️</button>
        </div>
      </div>
      <h4 className={styles.title} style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none', color: task.status === 'completed' ? '#a0aec0' : '#1a202c' }}>
        {task.title}
      </h4>
      {task.description && <p className={styles.desc}>{task.description}</p>}
      <div className={styles.bottom}>
        <span className={styles.priority} style={{ color: PRIORITY_COLORS[task.priority] }}>
          ● {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} priority
        </span>
        {task.dueDate && (
          <span className={styles.due} style={{ color: isOverdue ? '#e53e3e' : '#718096' }}>
            {isOverdue ? '⚠️ ' : '📅 '}{new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <div className={styles.statusRow}>
        <select value={task.status} onChange={e => onStatusChange(task._id, e.target.value)} className={styles.statusSelect}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
