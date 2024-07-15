import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/userService";

export const useFetchedUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    // enabled: false,
  });
};
