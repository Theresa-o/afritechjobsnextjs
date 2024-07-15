import Image from "next/image";
import JobsListings from "./(routes)/jobs/page";
import Hero from "./components/hero";
import Providers from "./providers";

export default function Home() {
  return (
    <>
      <Hero />
      <JobsListings />
    </>
  );
}
