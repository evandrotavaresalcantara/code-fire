import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "http://localhost:8000/v1",
  timeout: 1000,
  validateStatus: () => true,
});

process.env.BASE_URL = "http://localhost:8000";
process.env.DATABASE_URL = "postgres://postgres:123456@localhost:5434/app";
process.env.CORS_ORIGIN = "http://localhost:3000";
