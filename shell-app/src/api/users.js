import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function fetchUserById(userId) {
  try {
    console.log(`[API] Fetching user: ${userId}`);
    const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`);
    console.log(`[API] User found:`, response.data);
    return response.data;
  } catch (error) {
    console.log(
      `[API] User not found (${error.response?.status || error.message})`,
    );
    return null; // User not found
  }
}

export async function createUser(user) {
  try {
    console.log(`[API] Creating user:`, user);
    const response = await axios.post(`${API_BASE_URL}/api/users`, user);
    console.log(`[API] User created successfully:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `[API] Error creating user:`,
      error.response?.data || error.message,
    );
    throw error;
  }
}
