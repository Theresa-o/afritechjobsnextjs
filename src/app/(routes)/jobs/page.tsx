import Jobs from "@/app/components/jobs/jobs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// redundant, not in use, find  a WAY TO SCRAP

export default async function JobsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Jobs searchParams={searchParams} />
    </HydrationBoundary>
  );
}

// this should be a comp, not a page
