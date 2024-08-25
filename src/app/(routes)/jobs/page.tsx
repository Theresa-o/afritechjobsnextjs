import Jobs from "@/app/components/jobs/jobs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function getJobs() {
  try {
    const res = await fetch("http://127.0.0.1:8000/jobs/");
    return await res.json();
  } catch (err: any) {
    throw err.response.data;
  }
}

export default async function JobsPage() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["jobs"],
  //   queryFn: getJobs,
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Jobs />
    </HydrationBoundary>
  );
}
