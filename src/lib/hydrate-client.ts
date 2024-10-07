// import getQueryClient from "@/lib/get-query-client";
// import { QueryClient, dehydrate } from "@tanstack/react-query";
// import { HydrationBoundary } from "@tanstack/react-query";
// import axios from "axios";
// import JobsListings from "../app/(routes)/jobs/page";
// import { cache } from "react";

// export default async function HydratedJob() {
//   const queryClient = cache(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             refetchInterval: 10000,
//             staleTime: 5000,
//           },
//         },
//       })
//   );
//   // const dehydratedState = dehydrate(queryClient());
//   const dehydratedState = dehydrate(queryClient());

//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <JobsListing />
//     </HydrationBoundary>
//   );
// }

// // older
// // "use client";

// // import { Hydrate as RQHydrate, HydrateProps } from "@tanstack/react-query";

// // function Hydrate(props: HydrateProps) {
// //   return <RQHydrate {...props} />;
// // }

// // export default Hydrate;
