"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import LoadingSpinner from "@/app/components/loading-spinner";
import Button from "@/app/components/button";

interface JobProp {
  id: number;
  title: string;
  company: string;
  location: string;
  contract: string;
  keywords: string[];
  postedDate: string;
  requirements: string;
  description: string;
  benefits: string;
}

const JobListing = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [job, setJob] = useState<JobProp | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJob = async () => {
    try {
      const res = await fetch(`http://localhost:3000/jobs/${id}`);
      const data = await res.json();
      setJob(data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  return (
    <main className=" bg-slate-200 pb-20 md:px-20">
      <div className="container md:container">
        <div className="inner-container flex justify-between mx-auto p-10">
          <div className="flex  place-items-center">
            <Image
              src="/left-arrow.svg"
              alt="All jobs icon"
              className="rounded-full"
              width={30}
              height={20}
            />
            <span className="text-sm md:text-base hidden md:block">
              Back to all jobs
            </span>
          </div>
          <div className="flex place-items-center">
            <span className="text-sm md:text-base text-stone-400 hidden md:block">
              See all CATEGORY jobs
            </span>
            <Image
              src="/right-arrow.svg"
              alt="All category icon"
              className="rounded-full"
              width={30}
              height={20}
            />
          </div>
        </div>
        <div className="job-container bg-white py-10 border-2 rounded-lg ">
          <div className=" flex justify-between  mx-6">
            <div className="link-container flex  row md:gap-2">
              <div className="px-1 md:px-3 flex items-center rounded-md border-inherit border-2">
                <div className="flex items-center place-items-center">
                  <Image
                    src="/copy.svg"
                    alt="Copy"
                    className="rounded-full"
                    width={20}
                    height={15}
                  />
                  <span className="ml-1">copy link</span>
                </div>
              </div>
              <div className="px-3 flex items-center place-items-center rounded-md border-inherit border-2">
                <Image
                  src="/linkedin-share.svg"
                  alt="Linkedin Share"
                  className="rounded-full"
                  width={20}
                  height={20}
                />
                <span className="ml-1 hidden md:block">share</span>
              </div>

              <div className="px-3 flex items-center place-items-center rounded-md border-inherit border-2">
                <Image
                  src="/facebook-share.svg"
                  alt="Facebook Share"
                  className="rounded-full"
                  width={20}
                  height={20}
                />
                <span className="ml-1 hidden md:block">share</span>
              </div>

              <div className="px-3 flex items-center place-items-center rounded-md border-inherit border-2">
                <Image
                  src="/whatsapp-share.svg"
                  alt="Whatsapp Share"
                  className="rounded-full"
                  width={20}
                  height={20}
                />
                <span className="ml-1 hidden md:block">share</span>
              </div>

              <div className="px-3 flex items-center  rounded-md border-inherit border-2">
                <Image
                  src="/twitter-share.svg"
                  alt="Twitter Share"
                  className="rounded-full"
                  width={20}
                  height={20}
                />
                <span className="ml-1 hidden md:block">tweet</span>
              </div>
            </div>
            <div className="hidden md:flex">CATEGORY</div>
          </div>
          <br />
          <hr />
          {isLoading ? (
            <LoadingSpinner isLoading={isLoading} />
          ) : (
            <div className="main-job-listing grid lg:grid-cols-12 gap-10 items-start ">
              <div className="max-w-xs mx-auto sticky grid md:col-span-3 ">
                <div className="mx-6 mt-10  bg-white shadow-lg rounded-lg">
                  <div className="p-5 mb-10 mx-6">
                    <div className="mb-5">
                      <div className="font-bold text-lg">{job?.company}</div>
                      <div className="flex items-center mt-2 space-x-2 text-gray-600">
                        <Image
                          src="/vercel.svg"
                          alt="Afritech Logo"
                          className="object-cover w-8 h-8 rounded-full ring-1 ring-inset ring-black"
                          width={20}
                          height={20}
                        />
                        <p className="text-sm">{job?.title}</p>
                      </div>
                    </div>
                    <div className="mb-5">
                      <div className="font-bold text-lg">{job?.location}</div>
                      <div className="mt-2 text-gray-600">{job?.contract}</div>
                    </div>
                    <div className="pt-4 pb-2 flex flex-wrap">
                      {job?.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                    {/* <div className="pt-4 pb-2 flex">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      <p className="text-gray-600">{job?.keywords}</p>{" "}
                    </span>
                    {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #travel
                    </span> */}
                    {/* </div> */}
                    <div className="flex justify-center">
                      <Button
                        style="bg-indigo-500 text-white px-6 py-2 rounded-full flex justify-center"
                        onClick={() => console.log("apply")}
                        text="APPLY"
                      />
                    </div>
                  </div>
                </div>{" "}
              </div>

              <div className="job-details m-5 md:m-10 grid md:col-span-9">
                <div className="job-title font-bold text-2xl">
                  <h1>{job?.title} </h1>
                </div>
                <div className="job-description my-6">
                  <div className="jd-intro">
                    {job?.description}
                    <br />
                    <br />
                    {job?.description}
                    <br />
                  </div>
                  <div className="jd-requirements my-6">
                    <div className="jd-req-intro">
                      <h2 className="font-bold">Requirements:</h2>
                      <ul>
                        <li>{job?.description}</li>
                        <br />
                        <br />
                        <li>{job?.requirements}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="jd-benefits my-6">
                    <div className="jd-benefits-intro">
                      <h2 className="font-bold">Benefits:</h2>
                      <ul>
                        {job?.benefits.map((benefit: string, index: number) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <a className="font-bold md:text-2xl">
                  <Button
                    style="bg-indigo-500 text-white px-6 py-2 rounded-full flex justify-center"
                    onClick={() => console.log("apply")}
                    text="Apply for this job"
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default JobListing;
