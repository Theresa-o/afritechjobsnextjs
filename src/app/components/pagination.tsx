"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  data: any;
}

export default function Pagination({ data, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = 5;
  const totalPages = Math.ceil(data.count / pageSize);
  console.log(totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const goToPage = (pageNumber: number) => {
    router.push(createPageURL(pageNumber));
  };

  return (
    <div className="flex">
      {currentPage > 1 && (
        <button
          className="flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md dark:bg-gray-800 dark:text-gray-600"
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>
      )}

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={`${
              currentPage === pageNumber ? "bg-purple-200" : ""
            } items-center px-4 py-2 mx-1 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-200`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* {data.previous && ( */}
      {currentPage < totalPages && (
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="flex items-center px-4 py-2 mx-1 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-200"
        >
          Next
        </button>
      )}
    </div>
  );
}
