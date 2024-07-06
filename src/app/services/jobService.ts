import axios from "axios";
import { AddJobDTO } from "../types/jobTypes";

const BASE_URL = "http://127.0.0.1:8000/";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const createJob = async (data: AddJobDTO) => {
  await axiosInstance.post("jobs", data);
};
