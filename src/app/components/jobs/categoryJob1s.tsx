// "use client";

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../loading-spinner";
// import Image from "next/image";

// interface CategoryJobsListProps {
//   categoryId: number;
// }

// const CategoryJobs: React.FC<CategoryJobsListProps> = ({ categoryId }) => {
//   async function getCategoryJobs() {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:8000/jobs?category=${categoryId}`
//       );
//       return await res.json();
//     } catch (err: any) {
//       throw err.response.data;
//     }
//   }

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["categoryJobs", categoryId],
//     queryFn: getCategoryJobs,
//   });

//   if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
//   if (error) return <div>Error loading jobs</div>;

//   return (
//     <section>
//       <div className="job-listings-container">
//         {data?.map((job: any) => (
//           <div key={job.id} className="job-listing mx-auto px-5 m-4 md:w-5/6">
//             <div className="listing border-2 border-solid border-gray-300 hover:border-purple-500 active:border-purple-500 cursor-pointer">
//               <div className="flex justify-between">
//                 <div className="flex pt-5">
//                   <div className="job-logo bg-blue-200 rounded-full h-20 w-20 hidden md:flex flex-shrink-0 md:m-5">
//                     <Image
//                       src="/vercel.svg"
//                       alt="Afritech Logo"
//                       className="rounded-full"
//                       width={180}
//                       height={37}
//                     />
//                   </div>
//                   <div>
//                     <h2 className="mx-2 my-2 text-xl font-semibold">
//                       {job.job_title}
//                     </h2>
//                     <div className="flex mx-2 my-1">
//                       <h3 className="pr-2 text-gray-600">{job.company_name}</h3>
//                     </div>
//                     <div className="flex mx-2 my-2">
//                       <div className="job-status flex space-x-2 pr-2">
//                         <span className="tag bg-green-300 text-green-500 py-1 px-3 rounded-full text-sm">
//                           {job.job_type.job_type_choices}
//                         </span>
//                       </div>
//                       <div className="job-status flex space-x-2 pr-2">
//                         <span className="tag bg-yellow-300 text-yellow-500 py-1 px-3 rounded-full text-sm">
//                           {job.job_skills
//                             .map((skill: any) => skill.title)
//                             .join(", ")}
//                         </span>
//                       </div>
//                       <div className="job-status flex space-x-2 pr-2">
//                         <span className="tag bg-blue-200 text-blue-500 py-1 px-3 rounded-full text-sm">
//                           {job?.job_level
//                             .map((level: any) => level.job_level_choices)
//                             .join(", ")}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="p-5 flex items-center">
//                     <Image
//                       src="/location.svg"
//                       alt="Location"
//                       className="mr-1"
//                       width={17}
//                       height={17}
//                     />
//                     <span className="mr-2">
//                       {job.job_location
//                         .map((location: any) => location.name)
//                         .join(", ")}
//                     </span>
//                   </div>
//                   <div>{new Date(job.date_created).toLocaleDateString()}</div>
//                 </div>
//               </div>
//               <div className="job-listing-bottom">
//                 <div className="bottom-section bg-gray-100 p-4 flex justify-between">
//                   <div className="keyword flex">
//                     <Image
//                       src="/tag.svg"
//                       alt="Keywords"
//                       className="mr-1"
//                       width={17}
//                       height={17}
//                     />
//                     <span className="mr-1">Keywords:</span>
//                     <div className="mr-2 hover:text-purple-500 active:text-purple-500">
//                       {job.job_type.job_type_choices} |
//                     </div>
//                     <div className="mr-2 hover:text-purple-500 active:text-purple-500">
//                       sales |
//                     </div>
//                   </div>
//                   <div className="apply-now md:flex hover:text-purple-500 active:text-purple-500 hidden">
//                     <span>Apply Now</span>
//                     <Image
//                       src="/chevron-double-right.svg"
//                       alt="Apply now"
//                       width={15}
//                       height={15}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CategoryJobs;
