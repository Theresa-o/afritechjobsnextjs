import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="grid lg:grid-cols-2 my-10 pt-10">
        <div className="ml-4 md:ml-10 mb-10 md:mb-1">
          <div className="h-auto w-20">
            <Image
              src="/afri.png"
              alt="Afritechjobs Logo"
              // className="dark:invert"
              width={100}
              height={24}
              className="mb-4"
              priority
            />
          </div>
          <p>The leading job board for African TechStars</p>
          <small>2023 AfriTechJobs. All rights reserved</small>
        </div>
        <div className="grid grid-cols-3 md:grid-rows-1 md:gap-x-10 mx-5 gap-x-5 ">
          <div className="">
            <h6 className="font-bold leading-2 md:leading-5 md:text-xl">
              Post A Job
            </h6>
            <ul className="mt-3 text-sm md:text-base">
              <li className="mt-1">Pricing</li>
              <li className="mt-1">Remote work tools</li>
              <li className="mt-1">Hiring candidate</li>
              <li className="mt-1">Sign in Employer</li>
            </ul>
          </div>
          <div className="">
            <h6 className="font-bold leading-2 md:leading-5 md:text-xl">
              Find A Job
            </h6>
            <ul className="mt-3 text-sm md:text-base">
              <li className="mt-1 ">Job by level</li>
              <li className="mt-1">Job by duration</li>
              <li className="mt-1">Job by country</li>
              <li className="mt-1">Learning resources</li>
              <li className="mt-1">Sign in Candidate</li>
            </ul>
          </div>
          <div className="">
            <h6 className="font-bold leading-2 md:leading-5 md:text-xl">
              About Us
            </h6>
            <ul className="mt-3 text-sm md:text-base">
              <li className="mt-1">Blog</li>
              <li className="mt-1">Contact us</li>
              <li className="mt-1">FAQs</li>
              <li className="mt-1">Privacy & terms</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
