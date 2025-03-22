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

export const getCategory = async (filter?: string) => {
  const response = await axiosInstance.get(
    `https://teresita.pythonanywhere.com/jobs/category${
      filter ? `?name=${filter}` : ""
    }`
  );
  // console.log(response);
  return response.data;
};

export const getSkills = async (filter?: string) => {
  const response = await axiosInstance.get(
    `https://teresita.pythonanywhere.com/jobs/skills${
      filter ? `?title=${filter}` : ""
    }`
  );
  // console.log(response);
  return response.data;
};

export const getLocation = async (filter?: string) => {
  const response = await axiosInstance.get(
    `https://teresita.pythonanywhere.com/jobs/locations/${
      filter ? `?name=${filter}` : ""
    }`
  );
  // console.log(response);
  return response.data;
};

export const getJobType = async (filter?: string) => {
  const response = await axiosInstance.get(
    `https://teresita.pythonanywhere.com/jobs/type${
      filter ? `?job_type=${filter}` : ""
    }`
  );
  // console.log(response);
  return response.data;
};

export const getJobLevel = async (filter?: string) => {
  const response = await axiosInstance.get(
    `https://teresita.pythonanywhere.com/jobs/level${
      filter ? `?job_level=${filter}` : ""
    }`
  );
  return response.data;
};

export const getCategoryJobs = async (
  categoryName: string,
  excludeJobId: number
) => {
  const response = await axiosInstance.get(
    `https://teresita.pythonanywhere.com/jobs/?job_category=${categoryName}&exclude_job_id=${excludeJobId}`
  );
  console.log(excludeJobId);
  console.log(categoryName);
  return response.data;
};
