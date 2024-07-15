import axios from "axios";
import { AddJobDTO } from "../types/jobTypes";

const BASE_URL = "http://127.0.0.1:8000/";
// const axiosInstance = axios.create({ baseURL: BASE_URL });
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = async () => {
  const response = await axiosInstance.get("admin/users/user/");
  console.log(response);
  return response.data;
};
