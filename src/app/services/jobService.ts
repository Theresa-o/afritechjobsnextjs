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

// export const getCategory = async () => {
//   const response = await axiosInstance.get(
//     `http://127.0.0.1:8000/jobs/category/`
//   );
//   // console.log(response);
//   return response.data;
// };

export const getCategory = async (filter?: string) => {
  const response = await axiosInstance.get(
    `http://127.0.0.1:8000/jobs/category${filter ? `?name=${filter}` : ""}`
  );
  // console.log(response);
  return response.data;
};

export const getSkills = async (filter?: string) => {
  const response = await axiosInstance.get(
    `http://127.0.0.1:8000/jobs/skills${filter ? `?title=${filter}` : ""}`
  );
  // console.log(response);
  return response.data;
};

export const getLocation = async (filter?: string) => {
  const response = await axiosInstance.get(
    `http://127.0.0.1:8000/jobs/locations/${filter ? `?name=${filter}` : ""}`
  );
  // console.log(response);
  return response.data;
};

export const getJobType = async (filter?: string) => {
  const response = await axiosInstance.get(
    `http://127.0.0.1:8000/jobs/type${filter ? `?job_type=${filter}` : ""}`
  );
  // console.log(response);
  return response.data;
};

export const getJobLevel = async (filter?: string) => {
  const response = await axiosInstance.get(
    `http://127.0.0.1:8000/jobs/level${filter ? `?job_level=${filter}` : ""}`
  );
  // console.log(response);
  return response.data;
};

export const getCategoryJobs = async (
  categoryName: string,
  excludeJobId: number
) => {
  const response = await axiosInstance.get(
    // `http://127.0.0.1:8000/jobs/?job_category=${categoryName}`
    `http://127.0.0.1:8000/jobs/?job_category=${categoryName}&exclude_job_id=${excludeJobId}`
  );
  console.log(excludeJobId);
  console.log(categoryName);
  return response.data;
};

// export async function getJobs(query: string = "", filters: any = {}) {
//   try {
//     const url = new URL("http://127.0.0.1:8000/jobs/");
//     if (query) {
//       url.searchParams.append("search", query);
//     }
//     if (filters.category) {
//       url.searchParams.append("category", filters.category);
//     }
//     if (filters.level) {
//       url.searchParams.append("level", filters.level);
//     }
//     if (filters.type) {
//       url.searchParams.append("type", filters.type);
//     }
//     if (filters.location) {
//       url.searchParams.append("location", filters.location);
//     }
//     if (filters.skills) {
//       url.searchParams.append("skills", filters.skills);
//     }

//     const res = await fetch(url.toString(), { cache: 'no-store' });
//     return await res.json();
//   } catch (err: any) {
//     throw err;
//   }
// }

// export const getCategoryJobs = async (categoryName: string) => {
//   const response = await axiosInstance.get(
//     // `http://127.0.0.1:8000/jobs?category=${categoryName}`
//     `http://127.0.0.1:8000/jobs/?category=${categoryName}`
//   );
//   // console.log(response);
//   return response.data;
// };
