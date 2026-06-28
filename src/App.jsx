//App.jsx
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import Hero from './components/Hero';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import { useTasks } from './hooks/useTasks';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const {
    tasks,
    loading,
    pagination,
    stats,
    filters,
    createTask,
    updateTask,
    deleteTask,
    updateFilters,
  } = useTasks({ page: 1, limit: 6, sortBy: 'createdAt', sortOrder: 'desc' });

  const getTaskId = (task) => {
    return task?.id || task?._id;
  };

  const handleUpdateTask = async (taskData) => {
    let taskId = taskData?.id || taskData?._id;
    
    if (!taskId && taskData?.task) {
      taskId = taskData.task.id || taskData.task._id;
    }
    
    if (!taskId) {
      console.error('No task ID found for update', taskData);
      return;
    }
    
    const { id, _id, ...updateData } = taskData;
    
    await updateTask(taskId, updateData);
  };

  const handleDeleteTask = async (taskId) => {
    if (typeof taskId === 'object') {
      taskId = taskId?.id || taskId?._id;
    }
    
    if (!taskId) {
      console.error('No task ID provided for deletion');
      return;
    }
    
    await deleteTask(taskId);
  };

  return (
    <div className="min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffffcc',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#0d9488',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#e11d48',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Hero />

        <div className="mt-12 mb-8">
          <TaskStats stats={stats} />
        </div>

        <div className="mt-12 space-y-8">
          <div className="flex justify-center">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={`px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 ${
                isFormOpen ? 'from-rose-600 to-purple-600' : ''
              }`}
            >
              <FaPlus className={`transition-transform duration-300 ${isFormOpen ? 'rotate-45' : ''}`} />
              {isFormOpen ? 'Close Form' : 'Add New Task'}
            </button>
          </div>

          {isFormOpen && (
            <div className="max-w-2xl mx-auto">
              <TaskForm
                onCreate={async (taskData) => {
                  await createTask(taskData);
                  setIsFormOpen(false);
                }}
                onClose={() => setIsFormOpen(false)}
              />
            </div>
          )}

          <div>
            <TaskList
              tasks={tasks}
              loading={loading}
              pagination={pagination}
              filters={filters}
              onUpdateFilters={updateFilters}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500 bg-white/30 backdrop-blur-lg rounded-xl py-6 border border-white/30 shadow-xl">
          <p className="bg-gradient-to-r from-rose-600 via-purple-600 to-teal-600 bg-clip-text text-transparent font-semibold">
            Task Tracker {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;