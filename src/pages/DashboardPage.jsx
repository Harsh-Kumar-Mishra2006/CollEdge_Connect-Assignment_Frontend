import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import TaskCard from '../components/Tasks/TaskCard';
import '../styles/dashboard.css';
import '../styles/tasks.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    'in-progress': 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [tasksRes, statsRes] = await Promise.all([
        axiosInstance.get('/tasks?limit=5'),
        axiosInstance.get('/tasks/stats')
      ]);
      
      setRecentTasks(tasksRes.data.tasks);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading"><div className="loading-spinner"></div></div>;
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-container">
          <div className="nav-brand">
            📋 TaskManager
          </div>
          <div className="nav-user">
            <div className="user-info">
              <div className="user-avatar">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <span>{user?.username}</span>
              <span className="badge">({user?.role})</span>
            </div>
            <Link to="/tasks" className="btn btn-outline">All Tasks</Link>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div style={{ padding: '2rem 0' }}>
          <h1 style={{ marginBottom: '2rem' }}>Welcome back, {user?.username}! 👋</h1>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-title">Total Tasks</div>
              <div className="stat-value">{stats.total || 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Completed</div>
              <div className="stat-value">{stats.completed || 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">In Progress</div>
              <div className="stat-value">{stats['in-progress'] || 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Pending</div>
              <div className="stat-value">{stats.pending || 0}</div>
            </div>
          </div>

          <div className="tasks-container">
            <div className="tasks-header">
              <h2>Recent Tasks</h2>
              <Link to="/tasks" className="btn btn-primary">View All Tasks</Link>
            </div>
            {recentTasks.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--gray)', padding: '2rem' }}>
                No tasks yet. Create your first task!
              </p>
            ) : (
              recentTasks.map(task => (
                <TaskCard key={task._id} task={task} onUpdate={fetchDashboardData} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;