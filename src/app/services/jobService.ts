import axios from "axios";
import { AddJobDTO } from "../types/jobTypes";

const BASE_URL = "http://127.0.0.1:8000";
// const axiosInstance = axios.create({ baseURL: BASE_URL });
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createJob = async (data: AddJobDTO) => {
  await axiosInstance.post("/post-a-job/", data);
};

export const getCategory = async () => {
  const response = await axiosInstance.get(
    `http://127.0.0.1:8000/jobs/category/`
  );
  // console.log(response);
  return response.data;
};

export const getSkills = async () => {
  const response = await axiosInstance.get(
    `http://127.0.0.1:8000/jobs/skills/`
  );
  // console.log(response);
  return response.data;
};

export const getLocation = async () => {
  const response = await axiosInstance.get(
    `http://127.0.0.1:8000/jobs/locations/`
  );
  // console.log(response);
  return response.data;
};

export const getJobType = async () => {
  const response = await axiosInstance.get(`http://127.0.0.1:8000/jobs/type `);
  // console.log(response);
  return response.data;
};

export const getJobLevel = async () => {
  const response = await axiosInstance.get(`http://127.0.0.1:8000/jobs/level`);
  // console.log(response);
  return response.data;
};

export const getCategoryJobs = async (categoryId: string) => {
  const response = await axiosInstance.get(
    `http://127.0.0.1:8000/jobs?category=${categoryId}`
  );
  // console.log(response);
  return response.data;
};
