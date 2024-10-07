'use client'
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

export const useFetchedCategory = (filter?: string) => {
  return useQuery({
    queryKey: ["category", filter],
    queryFn: () => getCategory(filter),
    // enabled: false,
  });
};

// export const useFetchedCategory = (filter?: string) => {
//   return useQuery({
//     queryKey: ["category", filter],
//     queryFn: () => getCategory(filter),
//     // enabled: false,
//   });
// };

export const useFetchedSkills = (filter?: string) => {
  return useQuery({
    queryKey: ["skills", filter],
    queryFn: () => getSkills(filter),
    // enabled: false,
  });
};

export const useFetchedLocation = (filter?: string) => {
  return useQuery({
    queryKey: ["location", filter],
    queryFn: () => getLocation(filter),
    // enabled: false,
  });
};

export const useFetchedJobType = (filter?: string) => {
  return useQuery({
    queryKey: ["jobtype", filter],
    queryFn: () => getJobType(filter),
    // enabled: false,
  });
};

export const useFetchedJobLevel = (filter?: string) => {
  return useQuery({
    queryKey: ["joblevel", filter],
    queryFn: () => getJobLevel(filter),
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
