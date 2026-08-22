import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const predictHeartDisease = async (data) => {
  const response = await API.post("/predict", data);
  return response.data;
};

export const getExplanation = async (data) => {
  const response = await API.post("/explain", data);
  return response.data;
};

export const getModelPerformance = async () => {
  const response = await API.get("/models/performance");
  return response.data;
};

export default API;