import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// Simulation
export const fetchSimulation = () => API.get("/simulation");

// Submit Task
export const submitTask = (taskData) =>
  API.post("/aiTaskSchedular/submitTask", taskData);

// Decisions
export const fetchDecisions = () =>
  API.get("/aiTaskSchedular/decisions");