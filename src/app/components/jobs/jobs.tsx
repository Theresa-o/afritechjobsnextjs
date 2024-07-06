"use client";

import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../loading-spinner";
import Link from "next/link";
import Image from "next/image";

export default function Jobs() {
  async function getJobs() {
    try {
      const res = await fetch("http://127.0.0.1:8000/jobs/");
      return await res.json();
    } catch (err: any) {
      throw err.response.data;
    }
  }
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { isLoading, error, data } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => getJobs(),
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
                {data?.map((job: any) => (
                  <div
                    key={job.id}
                    className="job-listing gray mx-auto px-5 items-center justify-center m-4 md:w-5/6 "
                  >
                    <div className="listing h-30 w-full rounded-md ">
                      <div className="border-2 border-gray-500 p-2 h-full w-full flex items-center">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="w-full flex items-center"
                        >
                          <div className="job-logo bg-gray-200 rounded-full h-20 w-20 hidden md:flex flex-shrink-0 md:m-5">
                            <Image
                              src="/vercel.svg"
                              alt="Afritech Logo"
                              className="rounded-full"
                              width={180}
                              height={37}
                            />
                          </div>
                          <div className="job-position-details ml-4 flex-grow m-4 md:m-9">
                            <div className="job-meta flex justify-between align-center w-full">
                              <h2 className="text-xl font-semibold mb-2">
                                {job.job_title}
                              </h2>
                              <p className="text-gray-600 flex">
                                {job.job_location
                                  .map((location: any) => location.name)
                                  .join(", ")}
                              </p>
                            </div>
                            <div className="job-meta flex justify-between align-center w-full">
                              <p className="text-gray-600">
                                {job.company_name}
                              </p>
                              <p className="text-gray-600">
                                {job.job_type.job_type_choices}
                              </p>
                            </div>
                            <div className="job-meta flex justify-between align-center whitespace-nowrap w-full">
                              <p className="text-gray-600">
                                {job.job_skills
                                  .map((skill: any) => skill.title)
                                  .join(", ")}
                              </p>
                              <span className="text-sm text-gray-600">
                                Posted:{" "}
                                {new Date(
                                  job.date_created
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
