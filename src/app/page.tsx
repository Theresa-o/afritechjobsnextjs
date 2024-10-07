import JobsPage from "./(routes)/jobs/page";
import JobsListings from "./(routes)/jobs/page";
import Hero from "./components/hero";
import Jobs from "./components/jobs/jobs";
import Filtering from "./components/query/filtering";
import Search from "./components/query/search";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <>
      <Hero />
      <Search />
      <Filtering />
      <Jobs searchParams={searchParams} />
    </>
  );
}
