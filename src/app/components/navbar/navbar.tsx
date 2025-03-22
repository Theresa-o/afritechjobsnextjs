"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../button";
import Link from "next/link";
import NavBarLinks from "./navbarlinks";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header>
      <nav className="py-5">
        <div className="flex font-medium justify-around">
          <div className="z-50 p-5 md:w-auto w-full cursor-pointer flex justify-between">
            <Image
              src="/afri.png"
              alt="Afritechjobs Logo"
              // className="dark:invert"
              width={100}
              height={24}
              priority
            />
            <div
              className="text-3xl md:hidden cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                className="h-12 w-12 font-extrabold"
                src={isOpen ? "/close.svg" : "/menu.svg"}
                alt="Mobile menu"
                width={60}
                height={24}
              />
            </div>
          </div>

          <ul className="md:flex hidden md:uppercase md:gap-8  md:font-[Poppings] duration-500 my-auto">
            <li>
              <Link
                href="/"
                className={`link ${
                  pathname === "/"
                    ? "md:mt-3 py-7 px-3 inline-block text-purple-200"
                    : "md:mt-3  py-7 px-3 inline-block"
                }`}
              >
                Home
              </Link>
            </li>
            <NavBarLinks />
          </ul>
          <div className="md:flex hidden my-auto">
            <Link href="/add-job">
              <Button
                style="bg-indigo-500 text-white px-6 rounded-full"
                text="POST A JOB"
              />
            </Link>
          </div>
          {/* mobile nav view */}
          <ul
            className={`md:hidden bg-white absolute w-full h-full bottom-0 py-24 pl-4 duration-500 ${
              isOpen ? "left-0" : "left-[-100%]"
            } `}
          >
            <li>
              <Link
                href="/add-job"
                className={`link ${
                  pathname === "/"
                    ? "py-7 px-3 inline-block text-purple-200"
                    : "py-7 px-3 inline-block"
                }`}
              >
                Home
              </Link>
            </li>
            <NavBarLinks />
            <div className="mt-2">
              <Link href="/add-job">
                <Button
                  style="bg-purple-200 text-white px-6 rounded-full flex justify-center"
                  // onClick={() => console.log("Create a form")}
                  text="POST A JOB"
                />
              </Link>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
