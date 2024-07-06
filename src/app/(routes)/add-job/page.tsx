"use client";

import MultiStepForm from "@/app/components/multi-step-form";
import "@/app/globals.css";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  createdBy: Yup.string(),
  companyName: Yup.string().required("Please provide the name"),
  companyHq: Yup.string(),
  companysWebsite: Yup.string(),
  companysEmail: Yup.string().email("Invalid email address"),
  companysDescription: Yup.string(),
});

const AddJob = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = () => {
    alert("Form submitted!");
  };

  return (
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
          createdBy: "",
          companyName: "",
          companyHq: "",
          companysWebsite: "",
          companysEmail: "",
          companysDescription: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {/* <div className="md:container md:mx-auto ">
          {" "}
          <Form className="bg-white shadow appearance-none rounded w-full px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto">
            {currentStep === 1 && (
              <div className="flex flex-col mb-4 ">
                <div className="mb-4">
                  {" "}
                  <label
                    htmlFor="jobTitle"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Job Title
                  </label>
                  <Field
                    name="jobTitle"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="jobTitle" />
                </div>

                <div className="flex flex-wrap mb-4">
                  <div className="w-full md:w-1/2 pr-10">
                    <label
                      htmlFor="jobCategory"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Job Category
                    </label>
                    <Field
                      name="jobCategory"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="jobCategory" />
                  </div>

                  <div className="w-full md:w-1/2 pl-10">
                    <label
                      htmlFor="jobSkills"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Job Skills
                    </label>
                    <Field
                      name="jobSkills"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="jobSkills" />
                  </div>
                </div>

                <div className="flex flex-wrap mb-4">
                  <div className="w-full md:w-1/2 pr-10">
                    {" "}
                    <label
                      htmlFor="jobType"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Job Type
                    </label>
                    <Field
                      name="jobType"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="jobType" />
                  </div>
                  <div className="w-full md:w-1/2 pl-10">
                    {" "}
                    <label
                      htmlFor="jobLocation"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Job Location
                    </label>
                    <Field
                      name="jobLocation"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="jobLocation" />
                  </div>
                </div>

                <div className="flex flex-wrap mb-4 ">
                  <div className="w-full md:w-1/2 pr-5">
                    {" "}
                    <label
                      htmlFor="jobLevel"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Job Level
                    </label>
                    <Field
                      name="jobLevel"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="jobLevel" />
                  </div>
                  <div className="w-full md:w-1/2 pl-5">
                    <label
                      htmlFor="jobSalary"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Job Salary
                    </label>
                    <Field
                      name="jobSalary"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="jobSalary" />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="jobUrl"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Job Link
                  </label>
                  <Field
                    name="jobUrl"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="jobUrl" />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="jobDescription"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Job Description
                  </label>
                  <Field
                    name="jobDescription"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="jobDescription" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <label htmlFor="createdBy">Created By</label>
                <Field name="createdBy" type="text" />
                <ErrorMessage name="createdBy" />

                <label htmlFor="companyName">Company Name</label>
                <Field name="companyName" type="text" />
                <ErrorMessage name="companyName" />

                <label htmlFor="companyHq">Company Hq</label>
                <Field name="companyHq" type="text" />
                <ErrorMessage name="companyHq" />

                <label htmlFor="companysWebsite">Companys Website</label>
                <Field name="companysWebsite" type="text" />
                <ErrorMessage name="companysWebsite" />

                <label htmlFor="companysEmail">Companys Email</label>
                <Field name="companysEmail" type="email" />
                <ErrorMessage name="companysEmail" />

                <label htmlFor="companysDescription">
                  Companys Description
                </label>
                <Field name="companysDescription" type="text" />
                <ErrorMessage name="jobUcompanysDescriptionrl" />
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <div className="justify-center">
                  <button className="w-full" type="submit">
                    {" "}
                    Submit
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between p-4">
              <button
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={goToNextStep}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              )}
            </div>
          </Form>
        </div> */}
        {({ errors, touched }) => (
          <div className="md:container md:mx-auto">
            <Form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg rounded-lg w-full px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto"
            >
              {currentStep === 1 && (
                <div className="flex flex-col mb-4">
                  <div className="mb-4">
                    <label
                      htmlFor="jobTitle"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Job Title
                    </label>
                    <Field
                      name="jobTitle"
                      type="text"
                      //   onChange={handleSubmit}
                      //   onBlur={handleSubmit}
                      //   value={handleSubmit}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {touched.jobTitle && errors.jobTitle ? (
                      <div className="!text-red-500 text-xs italic mt-2">
                        {errors.jobTitle}
                      </div>
                    ) : null}
                    {/* <ErrorMessage name="jobTitle" className="field-error" /> */}
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 md:pr-5 mb-4">
                      <label
                        htmlFor="jobCategory"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Job Category
                      </label>
                      <Field
                        name="jobCategory"
                        type="text"
                        as="select"
                        // onChange={handleSubmit}
                        // onBlur={handleSubmit}
                        // value={handleSubmit}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        {" "}
                        <option value="NY">New York</option>
                        <option value="SF">San Francisco</option>
                        <option value="CH">Chicago</option>
                        <option value="OTHER">Other</option>
                      </Field>
                      {touched.jobCategory && errors.jobCategory ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.jobCategory}
                        </div>
                      ) : null}
                      {/* <ErrorMessage name="jobCategory" /> */}
                    </div>

                    <div className="w-full md:w-1/2 md:pl-5 mb-4">
                      <label
                        htmlFor="jobSkills"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Job Skills
                      </label>
                      <Field
                        name="jobSkills"
                        type="text"
                        as="select"
                        // onChange={handleSubmit}
                        // onBlur={handleSubmit}
                        // value={handleSubmit}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        {" "}
                        <option value="NY">New York</option>
                        <option value="SF">San Francisco</option>
                        <option value="CH">Chicago</option>
                        <option value="OTHER">Other</option>
                      </Field>
                      {touched.jobCategory && errors.jobCategory ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.jobCategory}
                        </div>
                      ) : null}
                      {/* <ErrorMessage name="jobSkills" /> */}
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 md:pr-5 mb-4">
                      <label
                        htmlFor="jobType"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Job Type
                      </label>
                      <Field
                        name="jobType"
                        type="text"
                        as="select"
                        // onChange={handleSubmit}
                        // onBlur={handleSubmit}
                        // value={handleSubmit}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        {" "}
                        <option value="NY">New York</option>
                        <option value="SF">San Francisco</option>
                        <option value="CH">Chicago</option>
                        <option value="OTHER">Other</option>
                      </Field>
                      {touched.jobCategory && errors.jobCategory ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.jobCategory}
                        </div>
                      ) : null}
                      {/* <ErrorMessage name="jobType" /> */}
                    </div>
                    <div className="w-full md:w-1/2 md:pl-5 mb-4">
                      <label
                        htmlFor="jobLocation"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Job Location
                      </label>
                      <Field
                        name="jobLocation"
                        type="text"
                        as="select"
                        // onChange={handleSubmit}
                        // onBlur={handleSubmit}
                        // value={handleSubmit}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        {" "}
                        <option value="NY">New York</option>
                        <option value="SF">San Francisco</option>
                        <option value="CH">Chicago</option>
                        <option value="OTHER">Other</option>
                      </Field>
                      {touched.jobCategory && errors.jobCategory ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.jobCategory}
                        </div>
                      ) : null}
                      {/* <ErrorMessage name="jobLocation" /> */}
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 md:pr-5 mb-4">
                      <label
                        htmlFor="jobLevel"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Job Level
                      </label>
                      <Field
                        name="jobLevel"
                        type="text"
                        as="select"
                        // onChange={handleSubmit}
                        // onBlur={handleSubmit}
                        // value={handleSubmit}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        {" "}
                        <option value="NY">New York</option>
                        <option value="SF">San Francisco</option>
                        <option value="CH">Chicago</option>
                        <option value="OTHER">Other</option>
                      </Field>
                      {touched.jobLevel && errors.jobLevel ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.jobLevel}
                        </div>
                      ) : null}
                      {/* <ErrorMessage name="jobLevel" /> */}
                    </div>
                    <div className="w-full md:w-1/2 md:pl-5 mb-4">
                      <label
                        htmlFor="jobSalary"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Job Salary
                      </label>
                      <Field
                        name="jobSalary"
                        type="text"
                        // onChange={handleSubmit}
                        // onBlur={handleSubmit}
                        // value={handleSubmit}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {touched.jobSalary && errors.jobSalary ? (
                        <div className="!text-red-500 text-xs italic mt-2">
                          {errors.jobSalary}
                        </div>
                      ) : null}
                      {/* <ErrorMessage name="jobSalary" /> */}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="jobUrl"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Job Link
                    </label>
                    <Field
                      name="jobUrl"
                      type="text"
                      //   onChange={handleSubmit}
                      //   onBlur={handleSubmit}
                      //   value={handleSubmit}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {touched.jobUrl && errors.jobUrl ? (
                      <div className="!text-red-500 text-xs italic mt-2">
                        {errors.jobUrl}
                      </div>
                    ) : null}
                    {/* <ErrorMessage name="jobUrl" /> */}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="jobDescription"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Job Description
                    </label>
                    <Field
                      name="jobDescription"
                      type="textarea"
                      as="textarea"
                      //   onChange={handleSubmit}
                      //   onBlur={handleSubmit}
                      //   value={handleSubmit}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {touched.jobDescription && errors.jobDescription ? (
                      <div className="!text-red-500 text-xs italic mt-2">
                        {errors.jobDescription}
                      </div>
                    ) : null}
                    {/* <ErrorMessage name="jobDescription" /> */}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="createdBy"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Created By
                    </label>
                    <Field
                      name="createdBy"
                      type="text"
                      //   onChange={handleSubmit}
                      //   onBlur={handleSubmit}
                      //   value={handleSubmit}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {touched.createdBy && errors.createdBy ? (
                      <div className="!text-red-500 text-xs italic mt-2">
                        {errors.createdBy}
                      </div>
                    ) : null}
                    {/* <ErrorMessage name="createdBy" /> */}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="companyName"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Company Name
                    </label>
                    <Field
                      name="companyName"
                      type="text"
                      //   onChange={handleSubmit}
                      //   onBlur={handleSubmit}
                      //   value={handleSubmit}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {touched.companyName && errors.companyName ? (
                      <div className="!text-red-500 text-xs italic mt-2">
                        {errors.companyName}
                      </div>
                    ) : null}
                    {/* <ErrorMessage name="companyName" /> */}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="companyHq"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Company HQ
                    </label>
                    <Field
                      name="companyHq"
                      type="text"
                      //   onChange={handleSubmit}
                      //   onBlur={handleSubmit}
                      //   value={handleSubmit}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {touched.companyHq && errors.companyHq ? (
                      <div className="!text-red-500 text-xs italic mt-2">
                        {errors.companyHq}
                      </div>
                    ) : null}
                    {/* <ErrorMessage name="companyHq" /> */}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="companysWebsite"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Company's Website
                    </label>
                    <Field
                      name="companysWebsite"
                      type="text"
                      //   onChange={handleSubmit}
                      //   onBlur={handleSubmit}
                      //   value={handleSubmit}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {touched.companysWebsite && errors.companysWebsite ? (
                      <div className="!text-red-500 text-xs italic mt-2">
                        {errors.companysWebsite}
                      </div>
                    ) : null}
                    {/* <ErrorMessage name="companysWebsite" /> */}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="companysEmail"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Company's Email
                    </label>
                    <Field
                      name="companysEmail"
                      type="email"
                      //   onChange={handleSubmit}
                      //   onBlur={handleSubmit}
                      //   value={handleSubmit}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {touched.companysEmail && errors.companysEmail ? (
                      <div className="!text-red-500 text-xs italic mt-2">
                        {errors.companysEmail}
                      </div>
                    ) : null}
                    {/* <ErrorMessage name="companysEmail" /> */}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="companysDescription"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Company's Description
                    </label>
                    <Field
                      name="companysDescription"
                      type="text"
                      //   onChange={handleSubmit}
                      //   onBlur={handleSubmit}
                      //   value={handleSubmit}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {touched.companysDescription &&
                    errors.companysDescription ? (
                      <div className="!text-red-500 text-xs italic mt-2">
                        {errors.companysDescription}
                      </div>
                    ) : null}
                    {/* <ErrorMessage name="companysDescription" /> */}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex justify-center">hi</div>
              )}

              <div className="flex justify-between p-4">
                {currentStep === 1 ? (
                  <div></div>
                ) : (
                  <button
                    onClick={goToPreviousStep}
                    type="button"
                    className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none"
                  >
                    Previous
                  </button>
                )}

                {currentStep < steps.length ? (
                  <button
                    onClick={goToNextStep}
                    type="button"
                    className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none"
                  >
                    Submit
                  </button>
                )}
              </div>
            </Form>
          </div>
        )}
      </Formik>
      {/* form */}
    </div>
  );
};

export default AddJob;
