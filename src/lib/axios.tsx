import axios from "axios";

// Replace with your actual token
const token = localStorage.getItem("token");

// Set Axios default configurations
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

export default axios;
