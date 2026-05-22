import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-space-ground-task-scheduler-backend.onrender.com",
  withCredentials: true,
});

// Simulation
export const fetchSimulation = () => API.get("/simulation");

// Submit Task
export const submitTask = (taskData) =>
  API.post("/aiTaskSchedular/submitTask", taskData);

// Decisions
export const fetchDecisions = () => API.get("/aiTaskSchedular/decisions");
