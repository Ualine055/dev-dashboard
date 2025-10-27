// import React, { useEffect, useState } from "react";
// import Navbar from "./components/Navbar";
// import GitHubCard from "./components/GitHubCard";
// import WeatherCard from "./components/WeatherCard";


// export default function App() {
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem("theme") || "light";
//   });

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <div className="min-h-screen">
//       <Navbar theme={theme} setTheme={setTheme} />

//       <div className="max-w-6xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mt-6">Welcome to Your Dashboard</h1>
//         <p className="text-gray-500 dark:text-gray-300">
//           Monitor your GitHub profile and stay updated with current weather conditions.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//           <GitHubCard username="Ualine055" />
//           <WeatherCard city="Kigali" />
//         </div>

//         <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
//           Change the GitHub username in the code to view different profiles. Current user:{" "}
//           <a
//             href="https://github.com/Ualine055"
//             className="text-blue-600 font-medium"
//             target="_blank"
//           >
//             @Ualine055
//           </a>
//         </footer>
//       </div>
//     </div>
//   );
// }



import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import GitHubCard from './components/GitHubCard';
import WeatherCard from './components/WeatherCard';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [githubUsername] = useState('Ualine055');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-linear-to-br from-blue-50 via-gray-50 to-blue-100'}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Monitor your GitHub profile and stay updated with current weather conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GitHubCard username={githubUsername} isDarkMode={isDarkMode} />
          <WeatherCard isDarkMode={isDarkMode} />
        </div>

        {/* <div className={`mt-8 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} shadow-md`}>
          <p className="text-sm text-center">
            Change the GitHub username in the code to view different profiles. Current user: <span className="font-bold text-blue-500">@{githubUsername}</span>
          </p>
        </div> */}
      </main>

      <footer className={`mt-16 py-6 border-t ${isDarkMode ? 'border-gray-800 bg-gray-900 text-gray-400' : 'border-gray-200 bg-white text-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">
            Built with React and Tailwind CSS | Data from GitHub API & Open-Meteo Weather API
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
