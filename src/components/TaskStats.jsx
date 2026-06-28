//components/TaskStats.jsx
import React from 'react';
import { FaTasks, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const TaskStats = ({ stats }) => {
  if (!stats) return null;

  const getStatusCount = (status) => {
    const found = stats.byStatus?.find(s => s._id === status);
    return found ? found.count : 0;
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total || 0,
      icon: <FaTasks className="text-2xl" />,
      gradient: 'from-rose-400 to-purple-400',
      bg: 'from-rose-50/50 to-purple-50/50',
    },
    {
      title: 'Completed',
      value: getStatusCount('completed'),
      icon: <FaCheckCircle className="text-2xl" />,
      gradient: 'from-green-400 to-teal-400',
      bg: 'from-green-50/50 to-teal-50/50',
    },
    {
      title: 'In Progress',
      value: getStatusCount('in-progress'),
      icon: <FaClock className="text-2xl" />,
      gradient: 'from-blue-400 to-purple-400',
      bg: 'from-blue-50/50 to-purple-50/50',
    },
    {
      title: 'Pending',
      value: getStatusCount('pending'),
      icon: <FaExclamationCircle className="text-2xl" />,
      gradient: 'from-yellow-400 to-orange-400',
      bg: 'from-yellow-50/50 to-orange-50/50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`glass-card bg-gradient-to-br ${stat.bg} transform hover:scale-105 transition-all duration-300 animate-float`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold gradient-text bg-gradient-to-r ${stat.gradient}">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-full bg-gradient-to-br ${stat.gradient} text-white`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;