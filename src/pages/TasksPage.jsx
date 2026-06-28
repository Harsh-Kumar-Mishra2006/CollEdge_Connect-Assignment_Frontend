import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import TaskCard from '../components/Tasks/TaskCard';
import TaskForm from '../components/Tasks/TaskForm';
import TaskFilters from '../components/Tasks/TaskFilters';
import '../styles/dashboard.css';
import '../styles/tasks.css';

const TasksPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      
      const response = await axiosInstance.get('/tasks', { params });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
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
            </div>
            <Link to="/" className="btn btn-outline">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div style={{ padding: '2rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h1>Task Management</h1>
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : '+ Create New Task'}
            </button>
          </div>

          {message && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          {showForm && (
            <TaskForm onTaskCreated={() => {
              fetchTasks();
              setShowForm(false);
              showMessage('Task created successfully!');
            }} />
          )}

          <div className="tasks-container">
            <div className="tasks-header">
              <h2>All Tasks ({tasks.length})</h2>
              <TaskFilters filters={filters} onFilterChange={setFilters} />
            </div>

            {tasks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>No tasks found</p>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                  Create Your First Task
                </button>
              </div>
            ) : (
              tasks.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onUpdate={fetchTasks}
                  onDelete={fetchTasks}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;