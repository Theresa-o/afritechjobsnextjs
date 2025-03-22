import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Job from "@/app/components/jobs/job";
import axios from "axios";

const JobListing = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  const id = Number(params.id);

  async function getJob(id: number) {
    try {
      const res = await axios.get(
        `https://teresita.pythonanywhere.com/jobs/${id}/`
      );
      return await res.data;
    } catch (err: any) {
      console.error("Failed to fetch job:", err);
      throw err;
    }
  }

  await queryClient.prefetchQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Job id={id} />
    </HydrationBoundary>
  );
};

export default JobListing;
