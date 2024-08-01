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
        <div key={menu.id} className="md:my-auto">
          <div className="px-3 text-left cursor-pointer group ">
            <Link
              href="/jobs"
              className={`link ${
                pathname === `/${menu}`
                  ? "md:mt-3 py-7 md:px-3 inline-block text-purple-200 "
                  : " md:mt-3 py-7 md:px-3 inline-block "
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

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@components/ui/card";
// import FormContainer from "@components/ui/Form/FormContainer";
// import FormItem from "@components/ui/Form/FormItem";
// import Input from "@components/ui/custom-input";
// import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
// import * as Yup from "yup";
// import { Label } from "@components/ui/label";
// import { Button } from "@components/ui/button";
// import {
//   ArrowLeft,
//   EyeIcon,
//   EyeOff,
//   LockKeyhole,
//   MailPlus,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import nairaSign from "@/assets/images/naira.svg";
// import Select from "@components/ui/custom-select";
// import { useAccountSetup } from "@/hooks/use-account-setup";
// import Spinner from "@components/ui/spinner";
// import { Toaster, toast } from "sonner";
// import { fetchAccessToken } from "./FetchAccessToken";
// import CustomAmountInput from "./CustomAmountInput";

// const validationSchema = Yup.object().shape({
//   businessName: Yup.string().required("Business name is required"),
//   amountNeeded: Yup.number().required("Amount is required"),
//   businessType: Yup.string().required("Business type is required"),
//   firstname: Yup.string().required("First name is required"),
//   lastname: Yup.string().required("Last name is required"),
//   email: Yup.string().required("Email is required"),
//   phoneNumber: Yup.string().required("Phone number is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters long")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .matches(
//       /[!@#$%^&*(),.?":{}|<>]/,
//       "Password must contain at least one special character"
//     )
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), undefined], "Passwords must match")
//     .required("Confirm password is required"),
// });

// const CreateAccount = () => {
//   const [pwInputType, setPwInputType] = useState("password");
//   const [pwInputTypePassword, setPwInputTypePassword] = useState("password");
//   const [pwInputTypeConfirm, setPwInputTypeConfirm] = useState("password");
//   const [stage, setStage] = useState(1);
//   const [isFormValid, setIsFormValid] = useState(false);

//   const navigate = useNavigate();

//   const { mutate, isLoading, isError, isSuccess } = useAccountSetup();

//   const onPasswordVisibleClick = (e: MouseEvent, inputType: string) => {
//     e.preventDefault();
//     if (inputType === "password") {
//       setPwInputTypePassword(
//         pwInputTypePassword === "password" ? "text" : "password"
//       );
//     } else {
//       setPwInputTypeConfirm(
//         pwInputTypeConfirm === "password" ? "text" : "password"
//       );
//     }
//     // setPwInputType(pwInputType === 'password' ? 'text' : 'password')
//   };

//   const inputIcon = (
//     <span
//       className="cursor-pointer"
//       // onClick={(e: any) => onPasswordVisibleClick(e)}
//     >
//       {pwInputType === "password" ? (
//         <EyeOff size={15} />
//       ) : (
//         <EyeIcon size={15} />
//       )}
//     </span>
//   );

//   const options: any[] = [
//     { value: "1", label: "Starter Business" },
//     { value: "2", label: "Registered Business" },
//   ];

//   const createAccountFn = async (
//     values: any,
//     { setSubmitting, resetForm }: any
//   ) => {
//     const { email, firstname, lastname, password, businessName } = values;
//     let body = {
//       active: true,
//       email,
//       enabled: true,
//       firstName: firstname,
//       firstTimeLogin: true,
//       lastName: lastname,
//       logonActive: true,
//       password,
//       username: businessName,
//     };

//     mutate(body, {
//       onSuccess: () => {
//         setSubmitting(false);
//         resetForm();
//         setTimeout(() => {
//           navigate("/sign-in");
//         }, 3000);
//         toast.success("Account created successfully!");
//         setStage(1);
//       },
//       onError: (error: any) => {
//         setSubmitting(false);
//       },
//     });
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       fetchAccessToken();
//     }
//   }, []);

//   return (
//     <>
//       <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 md:gap-28 max-w-screen-lg mx-auto">
//         <div className="col-span-1 md:col-span-1">
//           <h2 className="text-4xl md:text-6xl text-white font-bold leading-tight md:leading-tight">
//             Business Banking <br /> for Healthcare
//           </h2>
//           <p className="text-primary text-lg mt-6 md:mt-10 leading-snug md:leading-normal">
//             Streamline payments, access loans and seamlessly manage{" "}
//             <br className="hidden md:block" /> your finances - all in one place
//           </p>
//         </div>
//         <div className="col-span-1 md:col-span-1">
//           <Card className="w-full rounded-tr-lg rounded-tl-lg">
//             <CardHeader className="bg-primary text-white rounded-tr-lg rounded-tl-lg">
//               <CardTitle className="text-xl md:text-2xl font-semibold">
//                 Create Account
//               </CardTitle>
//               <CardDescription className="text-white text-lg">
//                 Get a convenient loan of up to N20 million today!
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Formik
//                 initialValues={{
//                   businessName: "",
//                   amountNeeded: "",
//                   businessType: null,
//                   firstname: "",
//                   lastname: "",
//                   phoneNumber: "",
//                   email: "",
//                   password: "",
//                   confirmPassword: "",
//                 }}
//                 onSubmit={(values, { resetForm, setSubmitting }) => {
//                   createAccountFn(values, { setSubmitting, resetForm });
//                 }}
//                 validationSchema={validationSchema}
//               >
//                 {({ values, touched, errors, isSubmitting, validateForm }) => {
//                   useEffect(() => {
//                     validateForm().then((errors) => {
//                       setIsFormValid(Object.keys(errors).length === 0);
//                     });
//                   }, [values, touched]);

//                   return (
//                     <Form>
//                       <FormContainer size="lg">
//                         {stage === 1 && (
//                           <>
//                             <FormItem
//                               label="How much do you need ?"
//                               className="mb-4"
//                               invalid={
//                                 errors.amountNeeded && touched.amountNeeded
//                               }
//                               errorMessage={errors.amountNeeded}
//                             >
//                               <Field
//                                 type="number"
//                                 autoComplete="off"
//                                 prefix={<img src={nairaSign} />}
//                                 name="amountNeeded"
//                                 placeholder=""
//                                 component={Input}
//                               />

//                               {/* <Field name="amountNeeded">
//                                 {({
//                                   field,
//                                   form,
//                                 }: {
//                                   field: any;
//                                   form: FormikProps<any>;
//                                 }) => (
//                                   <CustomAmountInput
//                                     field={field}
//                                     form={form}
//                                     // touched={FieldMetaProps.touched} // Pass Formik's touched
//                                     // errors={FieldMetaProps.errors} // Pass Formik's errors
//                                   />
//                                 )}
//                               </Field> */}
//                             </FormItem>
//                             <FormItem
//                               label="Business Name"
//                               className="mb-4"
//                               invalid={
//                                 errors.businessName && touched.businessName
//                               }
//                               errorMessage={errors.businessName}
//                             >
//                               <Field
//                                 type="text"
//                                 autoComplete="off"
//                                 name="businessName"
//                                 placeholder="Enter business name"
//                                 component={Input}
//                               />
//                             </FormItem>
//                             <FormItem
//                               label="Business Type"
//                               className="mb-4"
//                               size="sm"
//                               invalid={
//                                 errors.businessType && touched.businessType
//                               }
//                               errorMessage={errors.businessType}
//                             >
//                               <Field name="businessType">
//                                 {({ field, form }: FieldProps) => (
//                                   <Select
//                                     field={field}
//                                     placeholder="Select business type"
//                                     form={form}
//                                     options={options}
//                                     value={options.filter(
//                                       (option) =>
//                                         option.value === values.businessType
//                                     )}
//                                     onChange={(option: any) =>
//                                       form.setFieldValue(
//                                         field.name,
//                                         option?.value
//                                       )
//                                     }
//                                   />
//                                 )}
//                               </Field>
//                             </FormItem>
//                             <div
//                               className={
//                                 "gap-x-4 grid grid-cols-1 md:grid-cols-2"
//                               }
//                             >
//                               <FormItem
//                                 label="First Name"
//                                 className="mb-4"
//                                 invalid={errors.firstname && touched.firstname}
//                                 errorMessage={errors.firstname}
//                               >
//                                 <Field
//                                   type="text"
//                                   autoComplete="off"
//                                   name="firstname"
//                                   placeholder="Enter first name"
//                                   component={Input}
//                                 />
//                               </FormItem>
//                               <FormItem
//                                 label="Last Name"
//                                 className="mb-4"
//                                 invalid={errors.lastname && touched.lastname}
//                                 errorMessage={errors.lastname}
//                               >
//                                 <Field
//                                   type="text"
//                                   autoComplete="off"
//                                   name="lastname"
//                                   placeholder="Enter last name"
//                                   component={Input}
//                                 />
//                               </FormItem>
//                             </div>
//                           </>
//                         )}
//                         {stage === 2 && (
//                           <>
//                             <div
//                               className={
//                                 "gap-x-4 grid grid-cols-1 md:grid-cols-2"
//                               }
//                             >
//                               <FormItem
//                                 label="Email Address"
//                                 className="mb-4"
//                                 invalid={errors.email && touched.email}
//                                 errorMessage={errors.email}
//                               >
//                                 <Field
//                                   type="text"
//                                   autoComplete="off"
//                                   name="email"
//                                   placeholder="Enter email"
//                                   component={Input}
//                                 />
//                               </FormItem>
//                               <FormItem
//                                 label="Phone Number"
//                                 className="mb-4"
//                                 invalid={
//                                   errors.phoneNumber && touched.phoneNumber
//                                 }
//                                 errorMessage={errors.phoneNumber}
//                               >
//                                 <Field
//                                   type="text"
//                                   autoComplete="off"
//                                   name="phoneNumber"
//                                   placeholder="Enter Phone Number"
//                                   component={Input}
//                                 />
//                               </FormItem>
//                             </div>
//                             <FormItem
//                               label="Password"
//                               className="mb-4"
//                               invalid={errors.password && touched.password}
//                               errorMessage={errors.password}
//                             >
//                               <Field
//                                 type={pwInputTypePassword}
//                                 suffix={inputIcon}
//                                 prefix={
//                                   <LockKeyhole
//                                     size={15}
//                                     className="text-primary"
//                                   />
//                                 }
//                                 autoComplete="off"
//                                 name="password"
//                                 placeholder="Enter password"
//                                 component={Input}
//                               />
//                             </FormItem>
//                             <FormItem
//                               label="Confirm Password"
//                               className="mb-4"
//                               invalid={
//                                 errors.confirmPassword &&
//                                 touched.confirmPassword
//                               }
//                               errorMessage={errors.confirmPassword}
//                             >
//                               <Field
//                                 type={pwInputTypeConfirm}
//                                 suffix={inputIcon}
//                                 prefix={
//                                   <LockKeyhole
//                                     size={15}
//                                     className="text-primary"
//                                   />
//                                 }
//                                 autoComplete="off"
//                                 name="confirmPassword"
//                                 placeholder="Confirm your password"
//                                 component={Input}
//                               />
//                             </FormItem>
//                           </>
//                         )}
//                         <div className="mt-3">
//                           {stage === 1 ? (
//                             <Button
//                               className="bg-primary w-full"
//                               type="button"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 setStage((prev) => prev + 1);
//                               }}
//                             >
//                               Continue
//                             </Button>
//                           ) : (
//                             <>
//                               <Button
//                                 className="mt-5 bg-primary w-full"
//                                 type="submit"
//                                 disabled={isSubmitting || !isFormValid}
//                               >
//                                 {isSubmitting ? <Spinner /> : "Create Account"}
//                               </Button>
//                               <div className="flex justify-center text-sm">
//                                 <div
//                                   className="flex items-center gap-1 mt-1 font-semibold cursor-pointer"
//                                   onClick={() => setStage((prev) => prev - 1)}
//                                 >
//                                   <ArrowLeft size={13} />
//                                   Go back
//                                 </div>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </FormContainer>
//                     </Form>
//                   );
//                 }}
//               </Formik>
//             </CardContent>
//             <CardFooter className="bg-zinc-100 rounded-sm">
//               <div className="mt-3 text-left">
//                 <p className="block text-sm">Already have an account?</p>
//                 <Label
//                   className="font-bold cursor-pointer underline text-[15px]"
//                   onClick={() => navigate("/sign-in")}
//                 >
//                   Login
//                 </Label>
//               </div>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//       <Toaster richColors position="top-right" />
//     </>
//   );
// };

// export default CreateAccount;
