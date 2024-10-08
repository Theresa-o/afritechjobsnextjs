"use client";

import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../loading-spinner";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../pagination";

export default function Jobs({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
    level?: string;
    type?: string;
    location?: string;
    skills?: string;
  };
}) {
  const jokeParams = useSearchParams();
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const level = searchParams?.level || "";
  const type = searchParams?.type || "";
  const location = searchParams?.location || "";
  const skills = searchParams?.skills || "";
  const currentPage = Number(searchParams?.page) || 1;
  const router = useRouter();

  async function getJobs(query = "", filters: any = {}, page = 1) {
    try {
      // Build the URL with the search query
      const url = new URL("http://127.0.0.1:8000/jobs/");
      if (query) {
        url.searchParams.append("search", query);
      }
      if (filters.category) {
        url.searchParams.append("job_category", filters.category);
      }
      if (filters.level) {
        url.searchParams.append("job_level", filters.level);
      }
      if (filters.type) {
        url.searchParams.append("job_type", filters.type);
      }
      if (filters.location) {
        url.searchParams.append("job_location", filters.location);
      }
      if (filters.skills) {
        url.searchParams.append("job_skills", filters.skills);
      }
      url.searchParams.append("page", page.toString());
      const res = await fetch(url.toString(), { cache: "no-store" });
      // router.push(`/jobs/${currentPage}`);
      return await res.json();
    } catch (err: any) {
      throw err;
    }
  }

  const filters = { category, level, type, location, skills };

  const { isLoading, error, data } = useQuery({
    queryKey: ["jobs", query, filters, currentPage],
    queryFn: () => getJobs(query, filters, currentPage),
    // keepPreviousData: true,
  });

  return (
    <section>
      <div>
        <div>
          <div className="job-listings-container">
            {isLoading ? (
              <LoadingSpinner isLoading={isLoading} />
            ) : (
              <>
                {data?.results?.map((job: any) => (
                  <div
                    key={job.id}
                    className="job-listings mx-auto px-5 md:px-5 m-4 md:w-5/6"
                  >
                    <Link href={`/jobs/${job.id}`}>
                      <div className="listing border-2 border-solid border-gray-300 hover:border-purple-500 active:border-purple-500  cursor-pointer">
                        <div className="flex justify-between">
                          <div className="flex pt-5  ">
                            <div className="job-logo bg-blue-200 rounded-full h-20 w-20 hidden md:flex flex-shrink-0 md:m-5">
                              <Image
                                src="/vercel.svg"
                                alt="Afritech Logo"
                                className="rounded-full"
                                width={180}
                                height={37}
                              />
                            </div>{" "}
                            <div>
                              <h2 className="mx-2 my-2 text-md md:text-xl font-semibold break-words">
                                {job.job_title}
                              </h2>
                              <div className="flex mx-2 my-1">
                                <h3 className="pr-2 text-sm md:text-base text-gray-600 capitalize">
                                  {job.company_name}
                                </h3>
                              </div>
                              <div className="flex mx-2 my-2">
                                <div className="job-status flex space-x-2 pr-2 ">
                                  <span className="tag bg-green-300 text-green-500 py-1 px-3 rounded-full text-sm">
                                    {job.job_type.job_type_choices}
                                  </span>
                                </div>
                                <div className="job-status flex space-x-2 pr-2 ">
                                  <span className="tag bg-yellow-300 text-yellow-500 py-1 px-3 rounded-full text-sm">
                                    {job.job_skills
                                      .map((skill: any) => skill.title)
                                      .join(", ")}
                                  </span>
                                </div>
                                <div className="job-status flex space-x-2 pr-2">
                                  <span className="tag bg-blue-200 text-blue-500 py-1 px-3 rounded-full text-sm">
                                    {job.job_level.job_level_choices}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="p-5 flex items-center text-sm md:text-base">
                              <Image
                                src="/location.svg"
                                alt="Location"
                                className="mr-1"
                                width={17}
                                height={17}
                              />
                              <span className="mr-2 capitalize">
                                {" "}
                                {job.job_location
                                  .map((location: any) => location.name)
                                  .join(", ")}
                              </span>
                            </div>
                            <div>
                              {" "}
                              {/* Posted:{" "} */}
                              {new Date(job.date_created).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="job-listing-bottom">
                          <div className="bottom-section bg-gray-100 p-4 flex justify-between">
                            <div className="keyword flex flex-wrap text-sm md:text-base">
                              <Image
                                src="/tag.svg"
                                alt="Keywords"
                                className="mr-1"
                                width={17}
                                height={17}
                              />
                              <span className="mr-1">Keywords:</span>
                              <div className="mr-2 hover:text-purple-500 active:text-[#6054ef]-500">
                                {job.job_type.job_type_choices} |
                              </div>
                              <div className="mr-2 hover:text-purple-500 active:text-purple-500">
                                {job.job_location.name}
                              </div>
                            </div>
                            <div className="apply-now md:flex hover:text-purple-500 active:text-purple-500 hidden ">
                              <span>Apply Now</span>
                              <Image
                                src="/chevron-double-right.svg"
                                alt="Apply now"
                                // className="rounded-full"
                                width={15}
                                height={15}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                <div className="mt-5 flex w-full justify-center">
                  <Pagination data={data} currentPage={currentPage} />
                  {/* <Pagination
                    currentPage={currentPage}
                    // totalPages={totalPages}
                  /> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
