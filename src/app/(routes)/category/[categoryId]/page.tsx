import React from "react";
import axios from "axios";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CategoryJobsList from "@/app/components/jobs/CategoryJobsList";

const CategoryJobs = async ({ params }: { params: { categoryId: number } }) => {
  const queryClient = new QueryClient();
  const categoryId = Number(params.categoryId);

  async function getCategoryJob(categoryId: number) {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/jobs?category=${categoryId}`
      );
      return await res.data;
    } catch (err: any) {
      console.error("Failed to fetch job:", err);
      throw err;
    }
  }

  await queryClient.prefetchQuery({
    queryKey: ["categoryJobs", categoryId],
    queryFn: () => getCategoryJob(categoryId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryJobsList categoryId={categoryId} />
    </HydrationBoundary>
  );
};

export default CategoryJobs;
