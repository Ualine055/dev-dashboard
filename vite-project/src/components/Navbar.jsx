import React from 'react';
export default function Navbar({ isDarkMode, toggleTheme }) {
  return (
    <nav className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center`}>
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Developer Dashboard</h1>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            aria-label="Toggle theme"
          >
            <span className="text-xl">{isDarkMode ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

