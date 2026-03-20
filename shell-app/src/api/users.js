import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function fetchUserById(userId, userInfo = {}) {
  try {
    console.log(`[API] Fetching/syncing user: ${userId}`);
    // Use POST to allow creating user if needed
    const response = await axios.post(
      `${API_BASE_URL}/api/users/${userId}`,
      userInfo,
    );
    console.log(`[API] User synced:`, response.data);
    return response.data;
  } catch (error) {
    console.log(
      `[API] User sync failed (${error.response?.status || error.message})`,
    );
    return null;
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
