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
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import RelatedJobs from "./relatedJobs";

interface JobProps {
  id: number;
}

const Job = ({ id }: JobProps) => {
  const router = useRouter();
  const url = location.href;

  async function copyToClip() {
    await navigator.clipboard.writeText(url);
    toast.success("Copied successfully");
  }

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

  const { data: relatedJobsData, isLoading: relatedJobsLoading } = useQuery({
    queryKey: ["relatedJobs", data?.job_category.name],
    queryFn: () => getCategoryJobs(data?.job_category.name),
    enabled: !!data?.job_category.name,
  });

  return (
    // TODO: The currently shown job should not show in related jobs
    <main className=" bg-slate-200 pb-20 md:px-20 overflow-x-hidden">
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
      <div className="job-container  bg-white py-10 border-2 rounded-lg ">
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
                quote={"Check out this awesome job listing: " + data?.job_title}
                hashtag={"#africanjobs"}
              >
                <FacebookIcon size={22} round />
              </FacebookShareButton>
              <span className="ml-1 hidden md:block">share</span>
            </div>

            <div className="px-3 flex items-center place-items-center rounded-md border-inherit border-2">
              <WhatsappShareButton
                url={url}
                title={"Check out this awesome job listing: " + data?.job_title}
                separator=":: "
              >
                <WhatsappIcon size={22} round />
              </WhatsappShareButton>
              <span className="ml-1 hidden md:block">share</span>
            </div>

            <div className="px-3 flex items-center rounded-md border-inherit border-2">
              <TwitterShareButton
                url={url}
                title={"Check out this awesome job listing: " + data?.job_title}
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
                      <div className="bg-purple-100 rounded-full p-2 flex items-center justify-center w-[45px] h-[45px] flex-shrink-0">
                        <Image
                          src="/user.svg"
                          alt="Job title"
                          className="rounded-full border-none"
                          width={25}
                          height={25}
                        />
                      </div>
                      <div className="flex flex-col flex-grow">
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
                          {/* {data?.job_level
                              .map((level: any) => level.job_level_choices)
                              .join(", ")} */}
                          {data?.job_level.job_level_choices}
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
                          {data?.job_location?.[0]?.name}
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
                    <button className="bg-purple-200 text-white py-2  mt-3  w-full flex justify-center rounded-md">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* main job lisitng */}
            <div className="job-details m-2 md:m-10 md:grid md:col-span-9 ">
              <div className="mobile-card md:hidden">
                <HorizontalCards
                  title="Experience Level"
                  content={data?.job_level.job_level_choices}
                />
                <HorizontalCards
                  title="  Job type"
                  content={data?.job_type.job_type_choices}
                />
                <HorizontalCards
                  title="Location"
                  content={data?.job_location?.[0]?.name}
                />
                <HorizontalCards
                  title="Date posted"
                  content={new Date(data?.date_created).toLocaleDateString()}
                />
              </div>
              <div className="job-title font-bold text-base md:text-xl text-left ">
                <h1>{data?.job_title} </h1>
              </div>
              <div className="job-description my-6 break-words">
                <div className="jd-intro">
                  <ReactMarkdown
                    className="markdown"
                    remarkPlugins={[remarkBreaks]}
                  >
                    {data?.job_description}
                  </ReactMarkdown>
                  <br />
                </div>
              </div>
              <a className="font-bold text-xl lg:text-2xl mx-auto flex justify-center">
                <Button
                  style="bg-purple-200 text-white px-10 py-4 rounded-full flex content-center"
                  onClick={() => console.log("apply")}
                  text="Apply for this job"
                />
              </a>

              <div className="font-medium md:font-semibold uppercase text-xl md:text-2xl pt-8 pb-4 ">
                Related Jobs
              </div>
              <div className="job-listings-container">
                {relatedJobsLoading ? (
                  <LoadingSpinner isLoading={isLoading} />
                ) : (
                  <>
                    <RelatedJobs jobData={data} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
};

export default Job;
