import React from 'react';
import { useEffect, useState } from 'react';

export default function GitHubCard({ isDarkMode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.github.com/users/Ualine055`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message || 'Failed to fetch GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className={`rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin text-blue-500 text-3xl">loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null; //this prevents rendering if no data is available

  return (
    <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-colors duration-300 hover:shadow-xl`}>
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        🧑‍💻 GitHub Profile
      </h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={data.avatar_url}
          alt={data.name}
          className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4 shadow-lg"
        />
        <h3 className="text-2xl font-bold">{data.name || data.login}</h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>@{data.login}</p>
      </div>

      {data.bio && (
        <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} italic`}>
          "{data.bio}"
        </p>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-2xl font-bold text-blue-500">{data.public_repos}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Repos</p>
        </div>
        <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-2xl font-bold text-green-500">{data.followers}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Followers</p>
        </div>
        <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-2xl font-bold text-purple-500">{data.following}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Following</p>
        </div>
      </div>

      <div className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {data.location && (
          <div className="flex items-center gap-2">
            📍 <span>{data.location}</span>
          </div>
        )}
        {data.blog && (
          <div className="flex items-center gap-2">
            🔗
            <a
              href={data.blog.startsWith('http') ? data.blog : `https://${data.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline truncate"
            >
              {data.blog}
            </a>
          </div>
        )}
        {!data.location && !data.blog && (
          <div className="flex items-center gap-2 justify-center">
            👥 <span>GitHub Member</span>
          </div>
        )}
      </div>
    </div>
  );
}

