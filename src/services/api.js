//services/api.js
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`Response received from ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout - please try again');
    } else if (error.code === 'ERR_NETWORK') {
      toast.error('Cannot connect to server. Please check if backend is running.');
    } else if (error.response) {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } else {
      toast.error('Network error - please check your connection');
    }
    return Promise.reject(error);
  }
);

export const taskService = {
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      toast.success('Task created successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTasks: async (params = {}) => {
    try {
      const response = await api.get('/tasks', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    try {
      console.log('Sending update request:', { id, taskData });
      
      const cleanedData = { ...taskData };
      if (cleanedData.dueDate) {
        if (cleanedData.dueDate instanceof Date) {
          cleanedData.dueDate = cleanedData.dueDate.toISOString();
        }
      }
      
      const response = await api.put(`/tasks/${id}`, cleanedData);
      
      console.log('Update response:', response.data);
      
      if (response.data.status === 'success') {
        toast.success(response.data.message || 'Task updated successfully!');
      }
      
      return response.data;
    } catch (error) {
      console.error('Update API error:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      toast.success('Task deleted successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  bulkDeleteTasks: async (ids) => {
    try {
      const response = await api.delete('/tasks/bulk/delete', { data: { ids } });
      toast.success(`${response.data.data.deletedCount} tasks deleted!`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTaskStats: async () => {
    try {
      const response = await api.get('/tasks/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;