import axios from "axios";
import { AddJobDTO } from "../types/jobTypes";

const BASE_URL = "https://teresita.pythonanywhere.com/";
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
