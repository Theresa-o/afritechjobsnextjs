"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  useFetchedCategory,
  useFetchedCategoryJobs,
  useFetchedJobLevel,
  useFetchedJobType,
  useFetchedLocation,
  useFetchedSkills,
} from "@/app/hooks/jobHooks";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Filtering = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  type DropdownKey = "category" | "level" | "type" | "location" | "skills";

  const [isDropdownOpen, setIsDropdownOpen] = useState<
    Record<DropdownKey, boolean>
  >({
    category: false,
    level: false,
    type: false,
    location: false,
    skills: false,
  });

  // State to track the selected filter name
  const [selectedFilters, setSelectedFilters] = useState<
    Record<DropdownKey, string>
  >({
    category: "Category",
    level: "Level",
    type: "Type",
    location: "Location",
    skills: "Skills",
  });

  const { data: jobCategory } = useFetchedCategory();
  const { data: jobLevel } = useFetchedJobLevel();
  const { data: jobType } = useFetchedJobType();
  const { data: jobLocation } = useFetchedLocation();
  const { data: jobSkills } = useFetchedSkills();

  const toggleDropdown = (name: DropdownKey) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const closeDropdown = (name: DropdownKey) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleFilterSelect = (key: DropdownKey, value: string) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    // // Close the dropdown after selection
    // setIsDropdownOpen((prevState) => ({
    //   ...prevState,
    //   [key]: false,
    // }));

    // Close the dropdown after selection
    closeDropdown(key);

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.push(`?${currentParams.toString()}`);
  };

  const resetFilter = (key: DropdownKey, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevent dropdown from opening when clicking the reset button
    }

    setSelectedFilters((prevState) => ({
      ...prevState,
      [key]: key.charAt(0).toUpperCase() + key.slice(1), // Reset back to original label
    }));

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete(key);
    router.push(`?${currentParams.toString()}`);

    // Close the dropdown when filter is reset
    closeDropdown(key);
  };

  return (
    <div className="flex justify-center p-4 ">
      <div className="md:flex space-x-6 hidden ">
        <div className="relative">
          <button
            onClick={() => toggleDropdown("category")}
            aria-expanded={isDropdownOpen.category}
            aria-haspopup="true"
            className={`border rounded-md w-28 h-10 flex items-center justify-between px-4 shadow ${
              selectedFilters.category !== "Category"
                ? "bg-purple-200" // Highlight purple if filter is selected
                : ""
            }`}
          >
            <span>{selectedFilters.category}</span>
            <Image
              src={
                selectedFilters.category !== "Category"
                  ? "/close.svg" // Placeholder for X icon
                  : "/chevron-down.svg"
              }
              alt="Dropdown icon"
              width={20}
              height={20}
              onClick={(e) =>
                selectedFilters.category !== "Category"
                  ? resetFilter("category", e) // Reset filter when X is clicked
                  : toggleDropdown("category")
              }
              className="h-5 w-5"
            />
          </button>

          {isDropdownOpen.category && (
            <ul
              className="absolute z-10 bg-purple-100 text-purple-900 mt-2 w-full rounded-md shadow-lg capitalize"
              aria-labelledby="dropdownMenuButton"
            >
              {jobCategory?.results?.map((category: any) => (
                <li
                  key={category.id}
                  // href={`?category=${category.name}`}
                  onClick={() => handleFilterSelect("category", category.name)}
                  className="flex items-center gap-2 p-4 hover:bg-purple-900 hover:text-white rounded transition-all duration-200"
                >
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>{" "}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("level")}
            aria-expanded={isDropdownOpen.level}
            aria-haspopup="true"
            className={`border rounded-md w-28 h-10 flex items-center justify-between px-4 shadow ${
              selectedFilters.level !== "Level"
                ? "bg-purple-200" // Highlight purple if filter is selected
                : ""
            }`}
          >
            <span>{selectedFilters.level}</span>
            <Image
              src={
                selectedFilters.level !== "Level"
                  ? "/close.svg" // Placeholder for X icon
                  : "/chevron-down.svg"
              }
              alt="Dropdown icon"
              width={20}
              height={20}
              onClick={(e) =>
                selectedFilters.category !== "Level"
                  ? resetFilter("level", e) // Reset filter when X is clicked
                  : toggleDropdown("level")
              }
              className="h-5 w-5"
            />
          </button>

          {isDropdownOpen.level && (
            <ul
              className="absolute z-10 bg-purple-100 text-purple-900 mt-2 w-full rounded-md shadow-lg capitalize"
              aria-labelledby="dropdownMenuButton"
            >
              {jobLevel?.results?.map((level: any) => (
                <li
                  key={level.id}
                  // href={`?level=${level.job_level_choices}`}
                  onClick={() =>
                    handleFilterSelect("level", level.job_level_choices)
                  }
                  className="flex items-center gap-2 p-4 hover:bg-purple-900 hover:text-white rounded transition-all duration-200"
                >
                  <span>{level.job_level_choices}</span>
                </li>
              ))}
            </ul>
          )}
        </div>{" "}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("type")}
            aria-expanded={isDropdownOpen.type}
            aria-haspopup="true"
            className={`border rounded-md w-28 h-10 flex items-center justify-between px-4 shadow ${
              selectedFilters.type !== "Type"
                ? "bg-purple-200" // Highlight purple if filter is selected
                : ""
            }`}
          >
            <span>{selectedFilters.type}</span>
            <Image
              src={
                selectedFilters.type !== "Type"
                  ? "/close.svg" // Placeholder for X icon
                  : "/chevron-down.svg"
              }
              alt="Dropdown icon"
              width={20}
              height={20}
              onClick={(e) =>
                selectedFilters.type !== "Type"
                  ? resetFilter("type", e) // Reset filter when X is clicked
                  : toggleDropdown("type")
              }
              className="h-5 w-5"
            />
          </button>

          {isDropdownOpen.type && (
            <ul
              className="absolute z-10 bg-purple-100 text-purple-900 mt-2 w-full rounded-md shadow-lg capitalize"
              aria-labelledby="dropdownMenuButton"
            >
              {jobType?.results?.map((type: any) => (
                <li
                  key={type.id}
                  // href={`?type=${type.job_type_choices}`}
                  onClick={() =>
                    handleFilterSelect("type", type.job_type_choices)
                  }
                  className="flex items-center gap-2 p-4 hover:bg-purple-900 hover:text-white rounded transition-all duration-200"
                >
                  <span>{type.job_type_choices}</span>
                </li>
              ))}
            </ul>
          )}
        </div>{" "}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("location")}
            aria-expanded={isDropdownOpen.location}
            aria-haspopup="true"
            className={`border rounded-md w-28 h-10 flex items-center justify-between px-4 shadow ${
              selectedFilters.location !== "Location"
                ? "bg-purple-200" // Highlight purple if filter is selected
                : ""
            }`}
          >
            <span>{selectedFilters.location}</span>
            <Image
              src={
                selectedFilters.location !== "Location"
                  ? "/close.svg" // Placeholder for X icon
                  : "/chevron-down.svg"
              }
              alt="Dropdown icon"
              width={20}
              height={20}
              onClick={(e) =>
                selectedFilters.location !== "Location"
                  ? resetFilter("location", e) // Reset filter when X is clicked
                  : toggleDropdown("location")
              }
              className="h-5 w-5"
            />
          </button>

          {isDropdownOpen.location && (
            <ul
              className="absolute z-10 bg-purple-100 text-purple-900 mt-2 w-full rounded-md shadow-lg capitalize"
              aria-labelledby="dropdownMenuButton"
            >
              {jobLocation?.results?.map((location: any) => (
                <li
                  key={location.id}
                  // href={`?location=${location.name}`}
                  onClick={() => handleFilterSelect("location", location.name)}
                  className="flex items-center gap-2 p-4 hover:bg-purple-900 hover:text-white rounded transition-all duration-200"
                >
                  <span>{location.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>{" "}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("skills")}
            aria-expanded={isDropdownOpen.skills}
            aria-haspopup="true"
            className={`border rounded-md w-28 h-10 flex items-center justify-between px-4 shadow ${
              selectedFilters.skills !== "Skills"
                ? "bg-purple-200" // Highlight purple if filter is selected
                : ""
            }`}
          >
            <span>{selectedFilters.skills}</span>
            <Image
              src={
                selectedFilters.skills !== "Skills"
                  ? "/close.svg" // Placeholder for X icon
                  : "/chevron-down.svg"
              }
              alt="Dropdown icon"
              width={20}
              height={20}
              onClick={(e) =>
                selectedFilters.skills !== "Skills"
                  ? resetFilter("skills", e) // Reset filter when X is clicked
                  : toggleDropdown("skills")
              }
              className="h-5 w-5"
            />
          </button>

          {isDropdownOpen.skills && (
            <ul
              className="absolute z-10 bg-purple-100 text-purple-900 mt-2 w-full rounded-md shadow-lg capitalize"
              aria-labelledby="dropdownMenuButton"
            >
              {jobSkills?.results?.map((skills: any) => (
                <li
                  key={skills.id}
                  // href={`?skills=${skills.title}`}
                  onClick={() => handleFilterSelect("skills", skills.title)}
                  className="flex items-center gap-2 p-4 hover:bg-purple-900 hover:text-white rounded transition-all duration-200"
                >
                  <span>{skills.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default Filtering;
