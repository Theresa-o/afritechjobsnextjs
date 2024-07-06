import { useMutation } from "@tanstack/react-query";
import { AddJobDTO } from "../types/jobTypes";
import { createJob } from "../services/jobService";
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
