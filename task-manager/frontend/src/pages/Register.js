import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>✅ TaskFlow</div>
        <h2 className={styles.title}>Create account</h2>
        <p className={styles.sub}>Start managing your tasks</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input type="text" placeholder="Talha Khan" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" placeholder="Min. 6 characters" value={form.password}
              onChange={e => setForm({...form, password: e.target.value})} required />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p className={styles.switch}>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
