const axios = require('axios');

const AUTH_URL = 'http://20.244.56.144/test/auth';

const credentials = {
    companyName: "IIIT BHAGALPUR",
    clientID: "baab902e-f041-4cc7-9357-e13d3d6dafe5",
    clientSecret: "jBBnBlGaJriyMYmW",
    ownerName: "ABHINAV KUMAR",
    ownerEmail: "abhinav.2201129ec@iiitbh.ac.in",
    rollNo: "2201129EC"
};

async function getAccessToken() {
    try {
        const response = await axios.post(AUTH_URL, credentials);
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response?.data || error.message);
        throw new Error('Failed to authenticate');
    }
}
module.exports = { getAccessToken };