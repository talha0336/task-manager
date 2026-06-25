import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../api/axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', sort: 'createdAt' });

  const fetchTasks = useCallback(async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.sort) params.sort = filters.sort;
      const [taskRes, statsRes] = await Promise.all([taskAPI.getTasks(params), taskAPI.getStats()]);
      setTasks(taskRes.data);
      setStats(statsRes.data);
    } catch { toast.error('Failed to load tasks'); }
    finally { setLoading(false); }
  }, [filters]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleSave = async (data) => {
    try {
      if (editTask) {
        await taskAPI.updateTask(editTask._id, data);
        toast.success('Task updated!');
      } else {
        await taskAPI.createTask(data);
        toast.success('Task created!');
      }
      setShowModal(false);
      setEditTask(null);
      fetchTasks();
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving task'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await taskAPI.deleteTask(id);
      toast.success('Task deleted');
      fetchTasks();
    } catch { toast.error('Failed to delete task'); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await taskAPI.updateTask(id, { status });
      fetchTasks();
    } catch { toast.error('Failed to update status'); }
  };

  const openEdit = (task) => { setEditTask(task); setShowModal(true); };
  const openNew = () => { setEditTask(null); setShowModal(true); };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.heading}>My Tasks</h1>
            <p className={styles.sub}>Manage and track your work</p>
          </div>
          <button onClick={openNew} className={styles.addBtn}>+ New Task</button>
        </div>

        <div className={styles.stats}>
          <StatCard label="Total" value={stats.total} color="#667eea" />
          <StatCard label="Pending" value={stats.pending} color="#ed8936" />
          <StatCard label="In Progress" value={stats.inProgress} color="#4299e1" />
          <StatCard label="Completed" value={stats.completed} color="#48bb78" />
        </div>

        <div className={styles.filters}>
          <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select value={filters.priority} onChange={e => setFilters({...filters, priority: e.target.value})}>
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select value={filters.sort} onChange={e => setFilters({...filters, sort: e.target.value})}>
            <option value="createdAt">Newest First</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {loading ? (
          <div className={styles.empty}>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className={styles.empty}>
            <div style={{fontSize:'3rem'}}>📋</div>
            <p>No tasks yet. Click <strong>+ New Task</strong> to get started!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {tasks.map(task => (
              <TaskCard key={task._id} task={task}
                onEdit={openEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}
      </div>
      {showModal && <TaskModal task={editTask} onSave={handleSave} onClose={() => { setShowModal(false); setEditTask(null); }} />}
    </div>
  );
}
