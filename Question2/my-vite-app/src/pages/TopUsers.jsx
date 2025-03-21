import { useState, useEffect } from 'react';
import { fetchTopUsers } from '../api';
import UserCard from '../components/UserCard';

export default function TopUsersPage() {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopUsers = async () => {
      try {
        const users = await fetchTopUsers();
        // Sort by post count in descending order
        const sortedUsers = [...users].sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        setTopUsers(sortedUsers);
        setLoading(false);
      } catch (err) {
        setError('Failed to load top users');
        setLoading(false);
      }
    };

    getTopUsers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Top Users</h1>
          <p className="text-gray-600 mt-2">Loading top users...</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 rounded-full h-14 w-14"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>
              </div>
              <div className="mt-4 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Top Users</h1>
          <p className="text-red-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Top Users</h1>
        <p className="text-gray-600 mt-2">
          Users with the highest number of posts on our platform
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topUsers.map((user, index) => (
          <UserCard key={user.id} user={user} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}