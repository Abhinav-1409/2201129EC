import { useState, useEffect } from 'react';
import { fetchUserById } from '../api';

export default function PostCard({ post, highlight = false }) {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuthor = async () => {
      const userData = await fetchUserById(post.userId);
      setAuthor(userData);
      setLoading(false);
    };
    
    getAuthor();
  }, [post.userId]);

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 animate-pulse ${highlight ? 'border-2 border-indigo-300' : ''}`}>
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-gray-200 h-10 w-10"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/5 mt-2"></div>
          </div>
        </div>
        <div className="mt-3 h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${highlight ? 'border-2 border-indigo-300 ring-2 ring-indigo-100' : 'border border-gray-200'}`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 rounded-full h-10 w-10 flex items-center justify-center text-indigo-600 font-bold">
            {author?.name?.charAt(0) || '?'}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{author?.name || 'Unknown User'}</h3>
            <p className="text-sm text-gray-500">Posts: {author?.postCount || 0}</p>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-gray-800">{post.content}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
            <span>❤️</span>
            <span>Like</span>
          </button>
          
          <div className="flex items-center space-x-1 text-gray-500">
            <span>💬</span>
            <span>{post.commentCount || 0} comments</span>
          </div>
          
          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
            <span>🔄</span>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}