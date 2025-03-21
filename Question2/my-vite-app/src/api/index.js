const API_BASE_URL = 'http://localhost:3000';

export async function fetchTopUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top users:', error);
    return [];
  }
}

export async function fetchTrendingPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?type=popular`);
    if (!response.ok) {
      throw new Error('Failed to fetch trending posts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    return [];
  }
}

export async function fetchLatestPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?type=latest`);
    if (!response.ok) {
      throw new Error('Failed to fetch latest posts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
}

// Helper function to get user details by ID
export async function fetchUserById(userId) {
  try {
    const users = await fetchTopUsers();
    return users.find(user => user.id === userId) || { 
      name: `User ${userId}`, 
      postCount: 0 
    };
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return { name: `User ${userId}`, postCount: 0 };
  }
}