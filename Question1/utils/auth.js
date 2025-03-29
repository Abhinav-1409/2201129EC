const axios = require("axios");

const AUTH_URL = "http://20.244.56.144/test/auth";

const credentials = {
  companyName: "IIITBH",
  clientID: "4435b0ed-17ff-40ad-ae15-ad5f9996fd4c",
  clientSecret: "MkhNaaCSrPIIhApo",
  ownerName: "Abhinav Kumar",
  ownerEmail: "abhinav.2201129ec@iiitbh.ac.in",
  rollNo: "2201129EC",
};

async function getAccessToken() {
  try {
    const response = await axios.post(AUTH_URL, credentials);
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to authenticate");
  }
}
module.exports = { getAccessToken };
