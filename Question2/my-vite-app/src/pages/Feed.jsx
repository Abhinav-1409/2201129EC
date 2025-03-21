import { useState, useEffect, useRef } from 'react';
import { fetchLatestPosts } from '../api';
import PostCard from '../components/PostCard';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pollingInterval = useRef(null);

  // Function to fetch latest posts
  const getLatestPosts = async () => {
    try {
      const latestPosts = await fetchLatestPosts();
      setPosts(latestPosts);
      setLoading(false);
    } catch (err) {
      setError('Failed to load latest posts');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    getLatestPosts();
    
    // Set up polling for real-time updates
    pollingInterval.current = setInterval(() => {
      getLatestPosts();
    }, 10000); // Poll every 10 seconds
    
    // Clean up on unmount
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Feed</h1>
          <p className="text-gray-600 mt-2">Loading latest posts...</p>
        </div>
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/5 mt-2"></div>
                </div>
              </div>
              <div className="mt-3 h-4 bg-gray-200 rounded"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Feed</h1>
          <p className="text-red-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Feed</h1>
        <p className="text-gray-600 mt-2">
          See the latest posts in real-time
        </p>
      </div>
      
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No posts found</p>
        )}
      </div>
    </div>
  );
}