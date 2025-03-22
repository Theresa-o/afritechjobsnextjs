import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCategoryJobs } from "@/app/services/jobService";
import { useParams } from "next/navigation";
import Link from "next/link";

const RelatedJobs = ({ relatedJobsData }: { relatedJobsData: any }) => {
  return (
    <>
      {relatedJobsData?.results?.map((job: any) => (
        <div key={job.id} className="job-listings mx-auto my-4">
          <Link href={`/jobs/${job.id}`}>
            <div className="listing border-2 border-solid border-gray-300 hover:border-purple-500 active:border-purple-500 cursor-pointer">
              <div className="flex justify-between">
                <div className="flex pt-5 ">
                  <div className="job-logo bg-blue-200 rounded-full h-20 w-20 hidden md:flex flex-shrink-0 md:m-5">
                    <Image
                      src="/afri.png"
                      alt="Afritechjobs Logo"
                      className="rounded-full"
                      width={180}
                      height={37}
                    />
                  </div>{" "}
                  <div>
                    <h2 className="mx-2 my-2 text-xl font-semibold">
                      {job.job_title}
                    </h2>
                    <div className="flex mx-2 my-1">
                      <h3 className="pr-2 text-gray-600 capitalize">
                        {job.company_name}
                      </h3>
                    </div>
                    <div className="flex mx-2 my-2">
                      <div className="job-status flex space-x-2 pr-2 ">
                        <span className="tag bg-green-300 text-green-500 py-1 px-3 rounded-full text-sm">
                          {job?.job_type?.job_type_choices}
                        </span>
                      </div>
                      <div className="job-status flex space-x-2 pr-2 ">
                        <span className="tag bg-yellow-300 text-yellow-500 py-1 px-3 rounded-full text-sm">
                          {job?.job_skills
                            .map((skill: any) => skill.title)
                            .join(", ")}
                        </span>
                      </div>
                      <div className="job-status flex space-x-2 pr-2">
                        <span className="tag bg-blue-200 text-blue-500 py-1 px-3 rounded-full text-sm">
                          {job?.job_level?.job_level_choices}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="p-5 flex items-center">
                    <Image
                      src="/location.svg"
                      alt="Location"
                      className="mr-1"
                      width={17}
                      height={17}
                    />
                    <span className="mr-2 capitalize">
                      {job?.job_location?.[0]?.name}
                      {/* {job.job_location
                  .map((location: any) => location.name)
                  .join(", ")} */}
                    </span>
                  </div>
                  <div>
                    {" "}
                    {/* Posted:{" "} */}
                    {/* {new Date(
                job.date_created
              ).toLocaleDateString()} */}
                    {new Date(job?.date_created).toLocaleDateString()}
                  </div>
                </div>

                {/* <div className="p-5 flex">
<span>Location</span>
<Image
  src="/location.svg"
  alt="Location"
  // className="mr-1"
  width={17}
  height={17}
/>
</div> */}
              </div>

              <div className="job-listing-bottom">
                <div className="bottom-section bg-gray-100 p-4 flex justify-between">
                  <div className="keyword flex">
                    <Image
                      src="/tag.svg"
                      alt="Keywords"
                      className="mr-1"
                      width={17}
                      height={17}
                    />
                    <span className="mr-1">Keywords:</span>
                    {/* <div className="mr-2 hover:text-purple-500 active:text-[#6054ef]-500">
                      {job?.job_type?.job_type_choices} |
                    </div>
                    <div className="mr-2 hover:text-purple-500 active:text-purple-500">
                      sales |
                    </div> */}
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
    </>
  );
};

export default RelatedJobs;
