"use client";

import React, { useState } from "react";
import Button from "../button";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../loading-spinner";
import axios from "axios";
import HorizontalCards from "../horizontalCards";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import { toast, Toaster } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { getCategoryJobs } from "@/app/services/jobService";

interface JobProps {
  id: number;
}

const Job = ({ id }: JobProps) => {
  const router = useRouter();
  // const pathname = usePathname();
  // console.log(pathname + "path");
  const url = location.href;

  async function copyToClip() {
    await navigator.clipboard.writeText(url);
    toast.success("Copied successfully");
  }
  // console.log(id);
  // console.log("hello");

  //   async function getJob(id: number) {
  //     try {
  //       const res = await fetch(`http://localhost:3000/jobs/${id}/`);
  //       return await res.json();
  //     } catch (err: any) {
  //       throw err.response.data;
  //     }
  //   }

  async function getJob(id: number) {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/jobs/${id}/`);
      return await res.data;
    } catch (err: any) {
      console.error("Failed to fetch job:", err);
      throw err;
    }
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id),
  });

  // if (error) {
  //   console.error("Error fetching job data:", error);
  // }

  // if (isLoading) {
  //   console.log("Loading");
  // }

  // console.log(data);

  const { data: relatedJobsData, isLoading: relatedJobsLoading } = useQuery({
    queryKey: ["relatedJobs", data?.job_category.id],
    queryFn: () => getCategoryJobs(data?.job_category.id),
  });

  // const relatedJobs = useQuery(["relatedJobs", data?.job_category.id], () => getCategoryJobs(data?.job_category.id), {
  //   enabled: !!data?.job_category.id,
  // });

  return (
    // <div>
    //   <div className="font-bold text-lg">{data?.company_name}</div>
    //   <div className="flex items-center mt-2 space-x-2 text-gray-600">
    //     <Image
    //       src="/vercel.svg"
    //       alt="Afritech Logo"
    //       className="object-cover w-8 h-8 rounded-full ring-1 ring-inset ring-black"
    //       width={20}
    //       height={20}
    //     />
    //     <p className="text-sm">{data?.job_title}</p>
    //   </div>
    // </div>
    <main className=" bg-slate-200 pb-20 md:px-20">
      <div className="">
        <div className="inner-container flex justify-between mx-auto p-10">
          <div
            className="flex cursor-pointer place-items-center"
            onClick={() => router.push("/")}
          >
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
          <div
            className="flex place-items-center cursor-pointer"
            onClick={() => router.push(`/category/${data?.job_category.name}`)}
          >
            <span className="text-sm md:text-base hidden md:block">
              See all{" "}
              <span className="font-bold uppercase">
                {data?.job_category.name}
              </span>{" "}
              jobs
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
        <div className="job-container md:container md:mx-auto bg-white py-10 border-2 rounded-lg ">
          <div className=" flex justify-between mx-6 sticky">
            <div className="link-container flex  row md:gap-2 cursor-pointer">
              <div className="px-1 md:px-3 flex items-center rounded-md border-inherit border-2">
                <div
                  className="flex items-center place-items-center"
                  onClick={copyToClip}
                >
                  {/* <button type="button" > */}{" "}
                  <Image
                    src="/copy.svg"
                    alt="Copy"
                    className="rounded-full"
                    width={20}
                    height={15}
                  />
                  <span className="ml-1">copy link</span>
                  {/* </button> */}
                </div>
              </div>
              <div className="px-3 flex items-center place-items-center rounded-md border-inherit border-2">
                <LinkedinShareButton url={url}>
                  <LinkedinIcon size={22} round />
                </LinkedinShareButton>
                <span className="ml-1 hidden md:block">share</span>
              </div>
              <div className="px-3 flex items-center place-items-center rounded-md border-inherit border-2">
                <FacebookShareButton
                  url={url}
                  quote={
                    "Check out this awesome job listing: " + data?.job_title
                  }
                  hashtag={"#africanjobs"}
                >
                  <FacebookIcon size={22} round />
                </FacebookShareButton>
                <span className="ml-1 hidden md:block">share</span>
              </div>

              <div className="px-3 flex items-center place-items-center rounded-md border-inherit border-2">
                <WhatsappShareButton
                  url={url}
                  title={
                    "Check out this awesome job listing: " + data?.job_title
                  }
                  separator=":: "
                >
                  <WhatsappIcon size={22} round />
                </WhatsappShareButton>
                <span className="ml-1 hidden md:block">share</span>
              </div>

              <div className="px-3 flex items-center rounded-md border-inherit border-2">
                <TwitterShareButton
                  url={url}
                  title={
                    "Check out this awesome job listing: " + data?.job_title
                  }
                >
                  <TwitterIcon size={22} round />
                </TwitterShareButton>
                <span className="ml-1 hidden md:block">tweet</span>
              </div>
            </div>
            <div className="hidden md:flex uppercase font-bold">
              {data?.job_category.name}
            </div>
          </div>
          <br />
          <hr />
          {isLoading ? (
            <LoadingSpinner isLoading={isLoading} />
          ) : (
            <div className="job-listing grid lg:grid-cols-12 gap-10 text-sm md:text-base">
              <div className="sidebar-summary max-w-xs mx-auto sticky md:grid md:col-span-3 hidden">
                <div className="mx-6 mt-10 bg-white shadow-lg rounded-lg w-full max-h-svh">
                  <div className="p-5 mx-6">
                    <div className="">
                      <h2 className="font-bold text-lg m-5">Job Overview</h2>
                      <div className="flex gap-4 my-5">
                        <div className="bg-purple-100 rounded-full p-2 flex items-center justify-center w-[45px] h-[45px]">
                          <Image
                            src="/user.svg"
                            alt="Job title"
                            className="rounded-full border-none"
                            width={25}
                            height={25}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-sm mb-2 capitalize">
                            Job Title
                          </div>
                          <div className="font-light text-sm capitalize">
                            {data?.job_title}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 my-5">
                        <div className="bg-purple-100 rounded-full p-2 flex items-center justify-center w-[45px] h-[45px]">
                          <Image
                            src="/company-name.svg"
                            alt="Company name"
                            className="rounded-full border-none"
                            width={25}
                            height={25}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-sm mb-2 capitalize">
                            Company name
                          </div>
                          <div className="font-light text-sm capitalize">
                            {data?.company_name}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 my-5">
                        <div className="bg-purple-100 rounded-full p-2 flex items-center justify-center w-[45px] h-[45px]">
                          <Image
                            src="/briefcase.svg"
                            alt="Experience Level"
                            className="rounded-full border-none"
                            width={25}
                            height={25}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-sm mb-2 capitalize">
                            Experience Level
                          </div>
                          <div className="font-light text-sm capitalize">
                            {data?.job_level
                              .map((level: any) => level.job_level_choices)
                              .join(", ")}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 my-5">
                        <div className="bg-purple-100 rounded-full p-2 flex items-center justify-center w-[45px] h-[45px]">
                          <Image
                            src="/location.svg"
                            alt="Location"
                            className="rounded-full border-none"
                            width={25}
                            height={25}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-sm mb-2 capitalize">
                            Location
                          </div>
                          <div className="font-light text-sm capitalize">
                            {data?.job_location.name}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 my-5">
                        <div className="bg-purple-100 rounded-full p-2 flex items-center justify-center w-[45px] h-[45px]">
                          <Image
                            src="/salary.svg"
                            alt="Offered Salary"
                            className="rounded-full border-none"
                            width={25}
                            height={25}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-sm mb-2 capitalize">
                            Offered Salary
                          </div>
                          <div className="font-light text-sm capitalize">
                            {data?.job_salary_range}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 my-5">
                        <div className="bg-purple-100 rounded-full p-2 flex items-center justify-center w-[45px] h-[45px]">
                          <Image
                            src="/jobtype.svg"
                            alt="Job type"
                            className="rounded-full border-none"
                            width={25}
                            height={25}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-sm mb-2 capitalize">
                            Job type
                          </div>
                          <div className="font-light text-sm capitalize">
                            {data?.job_type.job_type_choices}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 my-5">
                        <div className="bg-purple-100 rounded-full p-2 flex items-center justify-center w-[45px] h-[45px]">
                          <Image
                            src="/dateposted.svg"
                            alt="Date posted"
                            className="rounded-full border-none"
                            width={25}
                            height={25}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-sm mb-2 capitalize">
                            Date posted
                          </div>
                          <div className="font-light text-sm capitalize">
                            {new Date(data?.date_created).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center w-full">
                      {/* <Button
                        style="bg-purple-200 text-white py-2 w-full flex justify-center "
                        onClick={() => console.log("apply")}
                        text="APPLY"
                      /> */}
                      <button className="bg-purple-200 text-white py-2  mt-3  w-full flex justify-center rounded-md">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* main job lisitng */}
              <div className="job-details m-5 md:m-10 grid md:col-span-9">
                <div className="mobile-card md:hidden">
                  <HorizontalCards
                    title="Experience Level"
                    content={data?.job_level
                      .map((level: any) => level.job_level_choices)
                      .join(", ")}
                  />

                  <HorizontalCards
                    title="  Job type"
                    content={data?.job_type.job_type_choices}
                  />
                  <HorizontalCards
                    title="Location"
                    content={data?.job_location.name}
                  />
                  <HorizontalCards
                    title="Date posted"
                    content={new Date(data?.date_created).toLocaleDateString()}
                  />
                </div>
                <div className="job-title font-bold text-base md:text-xl text-left">
                  <h1>{data?.job_title} </h1>
                </div>
                <div className="job-description my-6">
                  <div className="jd-intro">
                    {data?.job_description}
                    <br />
                    <br />
                    {data?.job_description}
                    <br />
                  </div>
                  <div className="jd-requirements my-6">
                    <div className="jd-req-intro">
                      <h2 className="font-bold text-base md:text-xl">
                        Requirements:
                      </h2>
                      <ul>
                        <li>{data?.job_description}</li>
                        <br />
                        <br />
                        <li>{data?.job_description}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="jd-benefits my-6">
                    <div className="jd-benefits-intro">
                      <h2 className="font-bold">Benefits:</h2>
                      <ul>
                        {data?.job_benefits &&
                          data?.job_benefits.map(
                            (benefit: string, index: number) => (
                              <li key={index}>{benefit}</li>
                            )
                          )}
                      </ul>
                    </div>
                  </div>
                </div>
                <a className="font-bold md:text-2xl mx-auto">
                  <Button
                    style="bg-purple-200 text-white px-10 py-2 rounded-full flex content-center"
                    onClick={() => console.log("apply")}
                    text="Apply for this job"
                  />
                </a>

                <div className="font-medium md:font-semibold uppercase text-xl md:text-2xl pt-8 pb-4 ">
                  Related Jobs
                </div>
                {/* <section>
                  <div>
                    <div> */}
                <div className="job-listings-container">
                  {relatedJobsLoading ? (
                    <LoadingSpinner isLoading={isLoading} />
                  ) : (
                    <>
                      {relatedJobsData?.map((job: any) => (
                        <div key={job.id} className="job-listings mx-auto my-4">
                          {/* <div className="listing border-2 border-solid border-gray-300 hover:border-afri-purple-500 active:border-afri-purple-500 p-4"> */}

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
                                  <h2 className="mx-2 my-2 text-xl font-semibold">
                                    {job.job_title}
                                  </h2>
                                  <div className="flex mx-2 my-1">
                                    <h3 className="pr-2 text-gray-600">
                                      {job.company_name}
                                    </h3>
                                    {/* <div className="pr-2"> $250 - $800 / month</div> */}
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
                                        {job?.job_level
                                          .map(
                                            (level: any) =>
                                              level.job_level_choices
                                          )
                                          .join(", ")}{" "}
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
                                  <span className="mr-2">
                                    {" "}
                                    {job.job_location
                                      .map((location: any) => location.name)
                                      .join(", ")}
                                  </span>
                                </div>
                                <div>
                                  {" "}
                                  {/* Posted:{" "} */}
                                  {new Date(
                                    job.date_created
                                  ).toLocaleDateString()}
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
                                  <div className="mr-2 hover:text-purple-500 active:text-[#6054ef]-500">
                                    {job.job_type.job_type_choices} |
                                  </div>
                                  <div className="mr-2 hover:text-purple-500 active:text-purple-500">
                                    sales |
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
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            //     </section>
            //   </div>
            // </div>
          )}
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
};

export default Job;
