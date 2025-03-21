import { useState, useEffect } from 'react';
import { fetchTrendingPosts } from '../api';
import PostCard from '../components/PostCard';

export default function TrendingPostsPage() {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        const posts = await fetchTrendingPosts();
        
        // Find the maximum comment count
        const maxCommentCount = Math.max(...posts.map(post => post.commentCount || 0));
        
        // Filter posts with the maximum comment count
        const topPosts = posts.filter(post => post.commentCount === maxCommentCount);
        
        setTrendingPosts(topPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load trending posts');
        setLoading(false);
      }
    };

    getTrendingPosts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Trending Posts</h1>
          <p className="text-gray-600 mt-2">Loading trending posts...</p>
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
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
          <h1 className="text-3xl font-bold text-gray-900">Trending Posts</h1>
          <p className="text-red-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Trending Posts</h1>
        <p className="text-gray-600 mt-2">
          Posts with the highest number of comments
        </p>
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-4 flex items-center space-x-3">
        <span className="text-indigo-600">🔥</span>
        <p className="text-indigo-700">
          These posts are currently generating the most engagement on our platform
        </p>
      </div>
      
      <div className="space-y-6">
        {trendingPosts.length > 0 ? (
          trendingPosts.map((post) => (
            <PostCard key={post.id} post={post} highlight={true} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No trending posts found</p>
        )}
      </div>
    </div>
  );
}