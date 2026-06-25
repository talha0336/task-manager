import { useState, useEffect } from 'react';
import styles from './TaskModal.module.css';

export default function TaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState({
    title: '', description: '', status: 'pending', priority: 'medium', dueDate: ''
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({ ...form, dueDate: form.dueDate || undefined });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{task ? 'Edit Task' : 'New Task'}</h3>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Title *</label>
            <input type="text" placeholder="Task title..." value={form.title}
              onChange={e => setForm({...form, title: e.target.value})} required autoFocus />
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <textarea placeholder="Optional description..." value={form.description}
              onChange={e => setForm({...form, description: e.target.value})} rows={3} />
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Priority</label>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label>Due Date</label>
            <input type="date" value={form.dueDate}
              onChange={e => setForm({...form, dueDate: e.target.value})} />
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.saveBtn}>{task ? 'Update Task' : 'Create Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
