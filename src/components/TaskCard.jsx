//componenets/TaskCard.jsx
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaClock, FaTag } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const taskId = task?.id || task?._id;

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
    completed: 'bg-green-100 text-green-700 border-green-200',
  };

  const priorityColors = {
    low: 'text-teal-600',
    medium: 'text-yellow-600',
    high: 'text-rose-600',
  };

  const priorityIcons = {
    low: '🟢',
    medium: '🟡',
    high: '🔴',
  };

  const handleStatusToggle = async () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const updatedTask = { ...task, status: newStatus };
    await onUpdate(updatedTask);
  };

  const handleEditClick = () => {
    onUpdate(task);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(taskId);
    }
  };

  return (
    <div className="glass-card hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {task.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
              {task.status.replace('-', ' ')}
            </span>
            <span className={`text-sm font-medium ${priorityColors[task.priority]}`}>
              {priorityIcons[task.priority]} {task.priority}
            </span>
          </div>
          
          {task.description && (
            <p className={`text-sm text-gray-600 ${!isExpanded && 'line-clamp-2'}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
            {task.dueDate && (
              <span className="flex items-center gap-1">
                <FaClock />
                {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
              </span>
            )}
            {task.tags && task.tags.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <FaTag className="text-purple-400" />
                {task.tags.map((tag, index) => (
                  <span key={`${taskId}-tag-${index}`} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <span className="text-gray-400">
              Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <button
            onClick={handleStatusToggle}
            className={`p-2 rounded-full transition-all duration-300 ${
              task.status === 'completed'
                ? 'bg-green-100 hover:bg-green-200 text-green-600'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title="Toggle status"
          >
            <FaCheck />
          </button>
          <div className="flex gap-1">
            <button
              onClick={handleEditClick}
              className="p-2 rounded-full hover:bg-purple-100 text-purple-500 transition-all duration-300"
              title="Edit task"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-2 rounded-full hover:bg-rose-100 text-rose-500 transition-all duration-300"
              title="Delete task"
            >
              <FaTrash />
            </button>
          </div>
          {task.description && task.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-purple-500 hover:text-purple-700"
            >
              {isExpanded ? 'Show less' : 'Show more'} 
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;