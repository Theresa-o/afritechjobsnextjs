"use client";

import { useState } from "react";
import { menuLinks } from "./navlinkslist";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBarLinks = () => {
  const [heading, setHeading] = useState("");
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map((menu) => (
        <div key={menu.id}>
          <div className="px-3 text-left cursor-pointer group ">
            <Link
              href="/jobs"
              className={`link ${
                pathname === `/${menu}`
                  ? "py-7 px-3 inline-block bg-indigo-500"
                  : "py-7 px-3 inline-block"
              }`}
              //   className={({ isActive }) =>
              //     isActive
              //       ? "py-7 flex justify-between md:pr-0 pr-5 group bg-indigo-500"
              //       : "py-7 flex justify-between md:pr-0 pr-5 group"
              //   }
              onClick={() =>
                heading !== menu.name ? setHeading(menu.name) : setHeading("")
              }
            >
              {/* <h1
              className={({ isActive }) =>
                isActive
                  ? "py-7 px-3 inline-block bg-dark"
                  : "py-7 px-3 inline-block"
              }
              onClick={() =>
                heading !== menu.name ? setHeading(menu.name) : setHeading("")
              }
            > */}
              {menu.name}
              <span className="text-xl md:hidden inline">
                {/* <ion-icon
                  name={`${
                    heading === menu.name ? "chevron-up" : "chevron-down"
                  }`}
                ></ion-icon> */}
              </span>
              <span className="text-xl md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:mb-2">
                {/* <ion-icon name="chevron-down"></ion-icon> */}
                {/* <img src="/circle.svg" alt="Hello" /> */}
              </span>
            </Link>
            {menu.subMenu && (
              <div>
                <div className="absolute top-14 hidden group-hover:md:block md:py-5 hover:md:block">
                  <div>
                    {menu.subLinks.map((subLinks, subIndex) => (
                      <div key={subIndex}>
                        {subLinks.subLink.map((eachlink) => (
                          <li
                            key={eachlink.id}
                            className="text-sm text-gray-600 my-2.5"
                          >
                            <a
                              className="hover:text-indigo-500"
                              href={eachlink.link}
                            >
                              {eachlink.name}
                            </a>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* mobile menu */}
          <div className={`${heading === menu.name ? "md:hidden" : "hidden"}`}>
            {menu.subLinks.map((navsublinks, subIndex) => (
              <div key={subIndex}>
                <div>
                  {navsublinks.subLink.map((eachlink) => (
                    <li key={eachlink.id} className="py-3 pl-14">
                      <a className="hover:text-indigo-500" href={eachlink.link}>
                        {eachlink.name}
                      </a>
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavBarLinks;
