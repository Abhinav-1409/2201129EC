const axios = require('axios');

// const AUTH_URL = 'http://20.244.56.144/test/auth';
const USERS_URL = 'http://20.244.56.144/test/users';

const { getAccessToken } = require('../utils/auth');

async function getTopUsers(req, res) {
    try {
        const accessToken = await getAccessToken();

        const usersResponse = await axios.get(USERS_URL, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        // Handle different response structures
        const usersData = usersResponse.data.users || usersResponse.data;
        if (!usersData || typeof usersData !== 'object') {
            return res.status(500).json({ message: 'Invalid users API response' });
        }

        const users = Object.entries(usersData)
            .map(([id, name]) => ({ id: Number(id), name }))
            .filter(user => !isNaN(user.id)); // Remove invalid IDs

        if (users.length === 0) {
            return res.status(404).json({ message: "No valid users found" });
        }

        const userPostCounts = await Promise.all(users.map(async (user) => {
            const postsResponse = await axios.get(`${USERS_URL}/${user.id}/posts`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            const postCount = postsResponse.data.posts ? postsResponse.data.posts.length : 0;

            return { id: user.id, name: user.name, postCount };
        }));

        userPostCounts.sort((a, b) => b.postCount - a.postCount);
        const topUsers = userPostCounts.slice(0, 5);

        res.json(topUsers);
    } catch (error) {
        console.error('Error fetching users or posts:', error.response?.data || error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = { getTopUsers };

