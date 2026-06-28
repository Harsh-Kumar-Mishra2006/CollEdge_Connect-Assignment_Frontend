//hooks/useTask.jsx
import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/api';
import toast from 'react-hot-toast';

export const useTasks = (initialFilters = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [filters, setFilters] = useState(initialFilters);
  const [stats, setStats] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.getTasks(filters);
      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await taskService.getTaskStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      await fetchTasks();
      await fetchStats();
      return response.data;
    } catch (error) {
      console.error('Create task error:', error);
      throw error;
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      console.log('Updating task with ID:', taskId);
      console.log('Update data:', taskData);
      
      if (!taskId) {
        throw new Error('Task ID is required for update');
      }
      
      const response = await taskService.updateTask(taskId, taskData);
      
      await fetchTasks();
      await fetchStats();
      
      return response.data;
    } catch (error) {
      console.error('Update task error:', error);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      if (!taskId) {
        throw new Error('Task ID is required for deletion');
      }
      
      const response = await taskService.deleteTask(taskId);
      await fetchTasks();
      await fetchStats();
      return response.data;
    } catch (error) {
      console.error('Delete task error:', error);
      throw error;
    }
  };

  const bulkDeleteTasks = async (ids) => {
    try {
      if (!ids || ids.length === 0) {
        throw new Error('No task IDs provided for bulk deletion');
      }
      
      const response = await taskService.bulkDeleteTasks(ids);
      await fetchTasks();
      await fetchStats();
      return response.data;
    } catch (error) {
      console.error('Bulk delete error:', error);
      throw error;
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const changePage = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  return {
    tasks,
    loading,
    error,
    pagination,
    stats,
    filters,
    createTask,
    updateTask,
    deleteTask,
    bulkDeleteTasks,
    updateFilters,
    changePage,
    refetch: fetchTasks,
    refreshStats: fetchStats,
  };
};