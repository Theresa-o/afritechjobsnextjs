import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Job from "@/app/components/jobs/job";

// async function getJob() {
//   try {
//     const res = await fetch(`http://localhost:3000/jobs/${id}`);
//     return await res.json();
//   } catch (err: any) {
//     throw err.response.data;
//   }
// }

const JobListing = async () => {
  const queryClient = new QueryClient();

  async function getJob(id: number) {
    try {
      const res = await fetch(`http://localhost:3000/jobs/${id}`);
      return await res.json();
    } catch (err: any) {
      throw err.response.data;
    }
  }

  await queryClient.prefetchQuery({
    queryKey: ["job", id],
    queryFn: getJob(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Job />
    </HydrationBoundary>
  );
};

export default JobListing;
