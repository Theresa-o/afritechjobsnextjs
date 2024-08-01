import { useMutation, useQuery } from "@tanstack/react-query";
import { AddJobDTO } from "../types/jobTypes";
import {
  createJob,
  getCategory,
  getCategoryJobs,
  getJobLevel,
  getJobType,
  getLocation,
  getSkills,
} from "../services/jobService";
import { toast } from "sonner";

export const useAddJob = () => {
  return useMutation({
    mutationFn: (data: AddJobDTO) => createJob(data),

    onError: (data: any) => {
      toast.error(data.message);
    },

    onSuccess: (data) => {
      return data;
    },
  });
};

export const useFetchedCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
    // enabled: false,
  });
};

export const useFetchedSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkills(),
    // enabled: false,
  });
};

export const useFetchedLocation = () => {
  return useQuery({
    queryKey: ["location"],
    queryFn: () => getLocation(),
    // enabled: false,
  });
};

export const useFetchedJobType = () => {
  return useQuery({
    queryKey: ["jobtype"],
    queryFn: () => getJobType(),
    // enabled: false,
  });
};

export const useFetchedJobLevel = () => {
  return useQuery({
    queryKey: ["joblevel"],
    queryFn: () => getJobLevel(),
    // enabled: false,
  });
};

export const useFetchedCategoryJobs = (categoryId: string) => {
  return useQuery({
    queryKey: ["categoryJobs", categoryId],
    queryFn: () => getCategoryJobs(categoryId),
    // enabled: false,
  });
};
