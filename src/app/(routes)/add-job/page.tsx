"use client";

import MultiStepForm from "@/app/components/multi-step-form";
import "@/app/globals.css";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "@/app/components/loading-spinner";
import {
  useAddJob,
  useFetchedCategory,
  useFetchedJobLevel,
  useFetchedJobType,
  useFetchedLocation,
  useFetchedSkills,
} from "@/app/hooks/jobHooks";
import { toast, Toaster } from "sonner";
import { useFetchedUsers } from "@/app/hooks/userHooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Tiptap from "@/app/components/tiptap";

const validationSchema = Yup.object({
  jobTitle: Yup.string().required("Job title is required"),
  jobDescription: Yup.string().required("Please describe this role"),
  jobCategory: Yup.string().required("Kindly select a job category"),
  jobSkills: Yup.string().required("Please select skills needed"),
  jobType: Yup.string().required("This is required"),
  jobLocation: Yup.string().required("Please select relevant locations"),
  jobLevel: Yup.string().required("What level is this job?"),
  jobSalary: Yup.string().required("Select a job salary"),
  jobUrl: Yup.string().required("Provide the link for the job"),
  // createdBy: Yup.string(),
  companyName: Yup.string().required("Please provide the name"),
  companyHq: Yup.string(),
  companysWebsite: Yup.string().required("Enter the company's website"),
  companysEmail: Yup.string()
    .email("Invalid email address")
    .required("Enter the company's email"),
  companysDescription: Yup.string().required("What does the company do?"),
});

type JobTypeKeys =
  | "FullTime"
  | "Contract"
  | "Freelance"
  | "Internship"
  | "Parttime";

const AddJob = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [companysDescription, setCompanysDescription] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const { mutate, isPending, isError, isSuccess } = useAddJob();
  const { data: categories, isLoading: isLoadingCategories } =
    useFetchedCategory();
  const { data: skills, isLoading: isLoadingSkills } = useFetchedSkills();

  const { data: locations, isLoading: isLoadingLocations } =
    useFetchedLocation();
  const { data: jobTypes, isLoading: isLoadingJobTypes } = useFetchedJobType();
  const { data: jobLevels, isLoading: isLoadingJobLevels } =
    useFetchedJobLevel();

  // const { data: users, isLoading: isLoadingUsers } = useFetchedUsers();

  const router = useRouter();

  const createJobFn = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const {
      jobTitle,
      jobDescription,
      jobCategory,
      jobSkills,
      jobType,
      jobLocation,
      jobLevel,
      jobSalary,
      jobUrl,
      // createdBy,
      companyName,
      companyHq,
      companysWebsite,
      companysEmail,
      companysDescription,
      id,
    } = values;

    let body = {
      id: id,
      job_title: jobTitle,
      job_description: jobDescription,
      job_category: jobCategory,
      job_skills: jobSkills,
      job_type: jobType,
      job_location: jobLocation,
      job_level: jobLevel,
      job_salary_range: jobSalary,
      job_application_link: jobUrl,
      // created_by: createdBy,
      company_name: companyName,
      company_hq: companyHq,
      companys_website: companysWebsite,
      company_contact_email: companysEmail,
      company_description: companysDescription,
    };

    mutate(body, {
      onSuccess: () => {
        setSubmitting(false);
        resetForm();
        setTimeout(() => {
          // navigate('/sign-in')
          router.push("/");
        }, 3000);
        toast.success("Job created successfully!");
      },
      onError: (error: any) => {
        setSubmitting(false);
        toast.error(error.message);
      },
    });
  };

  const steps = [
    { id: 1, title: "Job Information" },
    { id: 2, title: "Company Information" },
    { id: 3, title: "Submit" },
  ];

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const jobTypeIcons: Record<JobTypeKeys, string> = {
    FullTime: "/fulltimeIcon.svg",
    Contract: "/contractIcon.svg",
    Freelance: "/freelanceIcon.svg",
    Internship: "/internshipIcon.svg",
    Parttime: "/parttimeIcon.svg",
  };

  return (
    <section>
      <div>
        <MultiStepForm
          steps={steps}
          currentStep={currentStep}
          isAccountSetup={true}
          stepColor="purple"
        />
        {/* form */}
        <Formik
          initialValues={{
            jobTitle: "",
            jobDescription: "",
            jobCategory: "",
            jobSkills: "",
            jobType: "",
            jobLocation: "",
            jobLevel: "",
            jobSalary: "",
            jobUrl: "",
            // createdBy: "",
            companyName: "",
            companyHq: "",
            companysWebsite: "",
            companysEmail: "",
            companysDescription: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            createJobFn(values, {
              setSubmitting,
              resetForm,
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            isValid,
            setTouched,
          }) => (
            <div className="md:container md:mx-auto mb-12">
              <Form className="bg-white shadow-lg rounded-lg w-full px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto">
                {currentStep === 1 && (
                  <div className="flex flex-col mb-2">
                    <div className="mb-4">
                      <label
                        htmlFor="jobTitle"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Job Title{" "}
                        <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                          *
                        </span>
                      </label>
                      <Field
                        name="jobTitle"
                        type="text"
                        className="shadow appearance-none border rounded w-full capitalize py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {touched.jobTitle && errors.jobTitle ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.jobTitle}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap">
                      <div className="w-full md:w-1/2 md:pr-5 mb-2">
                        <label
                          htmlFor="jobCategory"
                          className="block text-gray-700 text-sm font-bold"
                        >
                          Job Category{" "}
                          <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <Field
                            name="jobCategory"
                            type="text"
                            as="select"
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black text-sm capitalize leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            {isLoadingCategories ? (
                              <option>Loading...</option>
                            ) : (
                              categories?.results?.map((category: any) => (
                                <option
                                  key={category.id}
                                  value={category.id}
                                  label={category.name}
                                />
                              ))
                            )}
                          </Field>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <Image
                              src="/chevron-down.svg"
                              alt="Dropdown icon"
                              width={20}
                              height={20}
                              className="h-5 w-5"
                            />
                          </div>
                        </div>
                        {touched.jobCategory && errors.jobCategory ? (
                          <div className="!text-red-500 text-xs italic mt-2">
                            {errors.jobCategory}
                          </div>
                        ) : null}
                      </div>

                      <div className="w-full md:w-1/2 md:pl-5 mb-2">
                        <label
                          htmlFor="jobSkills"
                          className="block text-gray-700 text-sm font-bold"
                        >
                          Job Skills{" "}
                          <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <Field
                            name="jobSkills"
                            as="select"
                            className="shadow appearance-none capitalize border rounded w-full py-2 px-3 bg-white text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            {isLoadingSkills ? (
                              <option>Loading...</option>
                            ) : (
                              skills?.results?.map((skill: any) => (
                                <option
                                  key={skill.id}
                                  value={skill.id}
                                  label={skill.title}
                                />
                              ))
                            )}
                          </Field>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <Image
                              src="/chevron-down.svg"
                              alt="Dropdown icon"
                              width={20}
                              height={20}
                              className="h-5 w-5"
                            />
                          </div>
                        </div>
                        {touched.jobSkills && errors.jobSkills ? (
                          <div className="!text-red-500 text-xs italic mt-2">
                            {errors.jobSkills}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                      {isLoadingJobTypes ? (
                        <div>Loading job types...</div>
                      ) : (
                        <>
                          <label
                            htmlFor="jobType"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Job Type{" "}
                            <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                              *
                            </span>
                          </label>
                          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                            {jobTypes?.results?.map((type: any) => (
                              <div
                                key={type.id}
                                className="flex-1 mb-2 md:mb-0"
                              >
                                <div className="relative flex items-center">
                                  <Field
                                    type="radio"
                                    id={type.id}
                                    name="jobType"
                                    value={type.id}
                                    checked={values.jobType === type.id}
                                    className="hidden"
                                    onChange={() => {
                                      setFieldValue("jobType", type.id);
                                    }}
                                  />
                                  <label
                                    htmlFor={type.id}
                                    className={`cursor-pointer shadow w-full md:w-[150px] border rounded py-2 pl-3 pr-3 capitalize bg-white text-black text-sm leading-tight focus:outline-none focus:shadow-outline flex items-center ${
                                      values.jobType === type.id
                                        ? "!bg-purple-100 border-purple-100"
                                        : "bg-white border-gray-300"
                                    }`}
                                  >
                                    <Image
                                      src={
                                        jobTypeIcons[
                                          type.job_type_choices as JobTypeKeys
                                        ]
                                      }
                                      alt={type.job_type_choices}
                                      width={20}
                                      height={20}
                                      className="mr-2"
                                    />
                                    {type.job_type_choices}
                                  </label>
                                </div>
                                {touched.jobType && errors.jobType && (
                                  <div className="!text-red-500 text-xs italic mt-2">
                                    {errors.jobType}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap">
                      <div className="w-full md:w-1/2 md:pr-5 mb-2">
                        <label
                          htmlFor="jobLevel"
                          className="block text-gray-700 text-sm font-bold"
                        >
                          Job Level{" "}
                          <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <Field
                            name="jobLevel"
                            type="text"
                            as="select"
                            className="shadow appearance-none border rounded w-full py-3 px-3 capitalize bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            {isLoadingJobLevels ? (
                              <option>Loading...</option>
                            ) : (
                              jobLevels?.results?.map((level: any) => (
                                <option
                                  key={level.id}
                                  value={level.id}
                                  className="!bg-lime-300"
                                  style={{ backgroundColor: "red" }}
                                >
                                  {level.job_level_choices}
                                </option>
                              ))
                            )}
                          </Field>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <Image
                              src="/chevron-down.svg"
                              alt="Dropdown icon"
                              width={20}
                              height={20}
                              className="h-5 w-5"
                            />
                          </div>
                        </div>
                        {touched.jobLevel && errors.jobLevel ? (
                          <div className="!text-red-500 text-xs italic mt-2">
                            {errors.jobLevel}
                          </div>
                        ) : null}
                      </div>
                      <div className="w-full md:w-1/2 md:pl-5 mb-2">
                        <label
                          htmlFor="jobLocation"
                          className="block text-gray-700 text-sm font-bold"
                        >
                          Job Location{" "}
                          <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <Field
                            name="jobLocation"
                            type="text"
                            as="select"
                            className="shadow appearance-none border rounded w-full py-3 px-3 capitalize bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            {isLoadingLocations ? (
                              <option>Loading...</option>
                            ) : (
                              locations?.results?.map((location: any) => (
                                <option key={location.id} value={location.id}>
                                  {location.name}
                                </option>
                              ))
                            )}
                          </Field>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <Image
                              src="/chevron-down.svg"
                              alt="Dropdown icon"
                              width={20}
                              height={20}
                              className="h-5 w-5"
                            />
                          </div>
                        </div>
                        {touched.jobLocation && errors.jobLocation ? (
                          <div className="!text-red-500 text-xs italic mt-2">
                            {errors.jobLocation}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-wrap">
                      <div className="w-full md:w-1/2 md:pr-5 mb-2">
                        <label
                          htmlFor="jobSalary"
                          className="block text-gray-700 text-sm font-bold"
                        >
                          Job Salary{" "}
                          <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                            *
                          </span>
                        </label>
                        <Field
                          name="jobSalary"
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {touched.jobSalary && errors.jobSalary ? (
                          <div className="!text-red-500 text-xs italic mt-2">
                            {errors.jobSalary}
                          </div>
                        ) : null}
                      </div>

                      <div className="w-full md:w-1/2 md:pl-5 mb-2">
                        <label
                          htmlFor="jobUrl"
                          className="block text-gray-700 text-sm font-bold"
                        >
                          Job Link{" "}
                          <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                            *
                          </span>
                        </label>
                        <Field
                          name="jobUrl"
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {touched.jobUrl && errors.jobUrl ? (
                          <div className="!text-red-500 text-xs italic mt-2">
                            {errors.jobUrl}
                          </div>
                        ) : null}
                        {/* <ErrorMessage name="jobUrl" /> */}
                      </div>
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="jobDescription"
                        className="block text-gray-700 text-sm font-bold"
                      >
                        Job Description{" "}
                        <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                          *
                        </span>
                      </label>
                      {/* <Field
                        name="jobDescription"
                        type="textarea"
                        as="textarea"
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline"
                      /> */}
                      <Tiptap
                        editorContent={jobDescription}
                        onChange={setJobDescription}
                      />

                      {touched.jobDescription && errors.jobDescription ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.jobDescription}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <div className="mb-2">
                      <label
                        htmlFor="companyName"
                        className="block text-gray-700 text-sm font-bold"
                      >
                        Company Name{" "}
                        <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                          *
                        </span>
                      </label>
                      <Field
                        name="companyName"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 capitalize bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {touched.companyName && errors.companyName ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.companyName}
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="companyHq"
                        className="block text-gray-700 text-sm font-bold"
                      >
                        Company HQ
                      </label>
                      <Field
                        name="companyHq"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 capitalize bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {touched.companyHq && errors.companyHq ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.companyHq}
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="companysWebsite"
                        className="block text-gray-700 text-sm font-bold"
                      >
                        Company&apos;s Website{" "}
                        <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                          *
                        </span>
                      </label>
                      <Field
                        name="companysWebsite"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {touched.companysWebsite && errors.companysWebsite ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.companysWebsite}
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="companysEmail"
                        className="block text-gray-700 text-sm font-bold"
                      >
                        Company's Email{" "}
                        <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                          *
                        </span>
                      </label>
                      <Field
                        name="companysEmail"
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {touched.companysEmail && errors.companysEmail ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.companysEmail}
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="companysDescription"
                        className="block text-gray-700 text-sm font-bold"
                      >
                        Company's Description{" "}
                        <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                          *
                        </span>
                      </label>
                      {/* <Field
                        name="companysDescription"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline"
                      /> */}
                      <Tiptap
                        editorContent={companysDescription}
                        onChange={setCompanysDescription}
                      />
                      {touched.companysDescription &&
                      errors.companysDescription ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.companysDescription}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="flex flex-col justify-center">
                    <h1>Thank You.</h1>
                    <h2>The team would review and provide feedback</h2>
                  </div>
                )}

                <div className="flex justify-between p-4">
                  {currentStep === 1 ? (
                    <div></div>
                  ) : (
                    <button
                      onClick={goToPreviousStep}
                      type="button"
                      className="px-6 py-2 min-w-[120px] text-center text-white bg-purple-900 border border-purple-900 rounded active:text-purple-200  hover:bg-transparent hover:text-purple-900 focus:outline-none"
                    >
                      Previous
                    </button>
                  )}

                  {currentStep === 1 || currentStep === 2 ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        goToNextStep();
                      }}
                      type="button"
                      className="px-6 py-2 min-w-[120px] text-center text-white bg-purple-900 border border-purple-900 rounded active:text-purple-200 hover:bg-transparent hover:text-purple-900 focus:outline-none"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className="px-6 py-2 min-w-[120px] text-center text-white bg-purple-900 border border-purple-900 rounded active:text-purple-200 hover:bg-transparent hover:text-purple-900 focus:outline-none"
                    >
                      {isValid ? "Incomplete form" : "Submit"}
                    </button>
                  )}
                </div>
              </Form>
            </div>
          )}
        </Formik>
        <Toaster richColors position="top-right" />{" "}
      </div>
    </section>
  );
};

export default AddJob;
