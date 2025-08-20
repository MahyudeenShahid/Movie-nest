import axios from "axios";

export const movieApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY
    }
})

export const fetchToken = async () => {
  // Logic to fetch token
  try {
    const {data} = await movieApi.get('/authentication/token/new');
    const token = data.request_token;
    if(data.success) {
      // Store the token in localStorage or state management
      localStorage.setItem('tmdb_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/`;
      return token;
    }
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

export const createSessionId = async () => {
    const token = localStorage.getItem('tmdb_token');
    if (token){
  try {
    const response = await movieApi.post(`/authentication/session/new`, {
      request_token: token
    });
    const sessionId = response.data.session_id;
    if (response.data.success) {
      localStorage.setItem('Session_id', sessionId);
      return sessionId;
    }
  } catch (error) {
    console.error("Error fetching session ID:", error);
    throw error;
  }}
};
