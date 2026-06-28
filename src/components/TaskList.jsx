//components/TaskList.jsx
import React, { useState } from 'react';
import { FaSearch, FaFilter, FaSort, FaTimes } from 'react-icons/fa';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const TaskList = ({ tasks, loading, pagination, filters, onUpdateFilters, onUpdate, onDelete, onRefresh }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleFilterChange = (key, value) => {
    onUpdateFilters({ [key]: value || undefined });
  };

  const clearFilters = () => {
    onUpdateFilters({
      status: undefined,
      priority: undefined,
      search: undefined,
    });
  };

  const handleEditTask = (task) => {
    console.log('Editing task:', task);
    setEditingTask(task);
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await onUpdate(taskData);
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDelete(taskId);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const getTaskId = (task) => {
    return task?.id || task?._id;
  };

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="glass-card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="select-field min-w-[130px]"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="select-field min-w-[130px]"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          

          {(filters.search || filters.status || filters.priority) && (
            <button
              onClick={clearFilters}
              className="p-2 rounded-full hover:bg-white/30 text-gray-500 transition-all duration-300"
              title="Clear filters"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={`skeleton-${n}`} className="glass-card animate-pulse">
              <div className="h-24 bg-white/30 rounded-xl" />
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="glass-card text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
          <p className="text-gray-500">Create your first task using the form above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={getTaskId(task) || Math.random()}
              task={task}
              onUpdate={handleEditTask}
              onDelete={() => handleDeleteTask(getTaskId(task))}
            />
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 glass-card py-3">
          <button
            onClick={() => onUpdateFilters({ page: pagination.currentPage - 1 })}
            disabled={!pagination.hasPrevPage}
            className="px-4 py-2 rounded-xl hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => onUpdateFilters({ page: pagination.currentPage + 1 })}
            disabled={!pagination.hasNextPage}
            className="px-4 py-2 rounded-xl hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Next
          </button>
        </div>
      )}

      {editingTask && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-black/50 via-purple-900/30 to-rose-900/30 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingTask(null);
            }
          }}
        >
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-rose-400/30 to-purple-400/30 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-teal-400/30 to-purple-400/30 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
            
            <div className="relative">
              <TaskForm
                initialData={editingTask}
                isEditing={true}
                onCreate={handleUpdateTask}
                onClose={() => setEditingTask(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;