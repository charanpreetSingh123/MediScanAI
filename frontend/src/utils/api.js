import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Predictions
export const predictBrainTumor = (formData) => API.post("/predict/brain-tumor", formData);
export const predictDR = (formData) => API.post("/predict/diabetic-retinopathy", formData);
export const predictSkinCancer = (formData) => API.post("/predict/skin-cancer", formData);

// Doctor
export const getDoctorDashboard = () => API.get("/doctor/dashboard");
export const getAllPatients = () => API.get("/doctor/patients");
export const getAllScans = () => API.get("/doctor/scans");

// Patient
export const getPatientDashboard = () => API.get("/patient/dashboard");

export default API;