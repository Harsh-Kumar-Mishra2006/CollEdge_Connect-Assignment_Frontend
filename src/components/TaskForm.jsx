//components/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaTags, FaCalendarAlt, FaEdit, FaSave, FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';

const TaskForm = ({ onCreate, onClose, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'pending',
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate ? format(new Date(initialData.dueDate), 'yyyy-MM-dd') : '',
    tags: initialData?.tags?.join(', ') || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'pending',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate ? format(new Date(initialData.dueDate), 'yyyy-MM-dd') : '',
        tags: initialData.tags?.join(', ') || '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (formData.dueDate && new Date(formData.dueDate) <= new Date()) {
      newErrors.dueDate = 'Due date must be in the future';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setIsSubmitting(true);
  
  const taskId = initialData?.id || initialData?._id;
  
  const taskData = {
    title: formData.title.trim(),
    description: formData.description.trim(),
    status: formData.status,
    priority: formData.priority,
    dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
    tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
  };

  console.log('Submitting task data:', { isEditing, taskId, taskData });

  try {
    if (isEditing && taskId) {
   
      await onCreate({ ...taskData, id: taskId });
    } else {
      await onCreate(taskData);
    }
    
    if (!isEditing) {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
        tags: '',
      });
      setErrors({});
    }
    if (onClose) onClose();
  } catch (error) {
    console.error('Failed to save task:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', icon: '🟢' },
    { value: 'medium', label: 'Medium', icon: '🟡' },
    { value: 'high', label: 'High', icon: '🔴' },
  ];

  return (
    <div className="relative">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-rose-200/20 to-purple-200/20 rounded-full blur-2xl animate-float" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-teal-200/20 to-purple-200/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '-2s' }} />

      <div className="relative glass-card animate-slide-down p-6 md:p-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-purple-400 to-teal-400 rounded-t-2xl" />

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-rose-100 to-purple-100">
              {isEditing ? (
                <FaEdit className="text-2xl text-purple-600" />
              ) : (
                <FaPlus className="text-2xl text-rose-600" />
              )}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold gradient-text">
                {isEditing ? 'Edit Task' : 'Add New Task'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {isEditing ? 'Update your task details below' : 'Create a new task to get started'}
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/50 transition-all duration-300 group"
              aria-label="Close"
            >
              <FaTimes className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`input-field pl-4 pr-4 py-3 ${errors.title ? 'border-rose-400 ring-rose-400/20' : ''}`}
                placeholder="Enter task title..."
              />
              {formData.title && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs text-green-500">✓</span>
                </div>
              )}
            </div>
            {errors.title && (
              <p className="mt-2 text-sm text-rose-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-rose-500" />
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="input-field resize-none py-3"
              placeholder="Enter task description..."
            />
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-400">
                {formData.description.length}/500
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, status: option.value }))}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                      formData.status === option.value
                        ? `${option.color} ring-2 ring-offset-2 ring-purple-400 scale-105`
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {priorityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: option.value }))}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                      formData.priority === option.value
                        ? 'bg-gradient-to-r from-rose-100 to-purple-100 ring-2 ring-offset-2 ring-purple-400 scale-105'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-1">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaCalendarAlt className="inline mr-2 text-purple-500" />
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`input-field py-3 ${errors.dueDate ? 'border-rose-400 ring-rose-400/20' : ''}`}
            />
            {errors.dueDate && (
              <p className="mt-2 text-sm text-rose-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-rose-500" />
                {errors.dueDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaTags className="inline mr-2 text-teal-500" />
              Tags <span className="text-xs text-gray-400">(comma separated)</span>
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="input-field py-3"
              placeholder="e.g., urgent, frontend, api"
            />
            {formData.tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.split(',').map((tag, index) => {
                  const trimmedTag = tag.trim();
                  if (!trimmedTag) return null;
                  return (
                    <span
                      key={index}
                      className="tag-pill animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      #{trimmedTag}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              {isEditing ? (
                <>
                  <FaSave />
                  {isSubmitting ? 'Updating...' : 'Update Task'}
                </>
              ) : (
                <>
                  <FaPlus />
                  {isSubmitting ? 'Creating...' : 'Create Task'}
                </>
              )}
            </span>
          </button>

          {isEditing && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <FaArrowLeft className="text-sm" />
              Cancel and Go Back
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default TaskForm;