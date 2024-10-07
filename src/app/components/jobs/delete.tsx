// import { Separator } from "@components/ui/separator";
// import {
//   Banknote,
//   ChevronLeftCircle,
//   ChevronRightCircle,
//   Undo2,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@components/ui/card";
// import { Field, FieldProps, Form, Formik, useField } from "formik";
// import * as Yup from "yup";
// import FormContainer from "@components/ui/Form/FormContainer";
// import FormItem from "@components/ui/Form/FormItem";
// import Input from "@components/ui/custom-input";
// import { useState } from "react";
// import Stepper from "../Stepper";
// import loanIcon from "@/assets/images/loan-icon.png";
// import image from "@/assets/images/hurray.png";
// import { Button } from "@components/ui/button";
// import Select from "@components/ui/custom-select";
// import { Label } from "@components/ui/label";
// import { DataTable } from "@components/ui/data-table";
// import { ColumnDef } from "@tanstack/react-table";
// import { Checkbox } from "@components/ui/checkbox";
// import { Badge } from "@components/ui/badge";
// import { useNavigate } from "react-router-dom";
// import { useCreateLoanApplication } from "@/hooks/use-create-loan-application";
// import { LoanCreationDTO } from "@/types/loan";
// import Loading from "@components/shared/Loading";
// import { useUploadFile } from "@/hooks/use-upload-file";
// import Upload from "@components/ui/Upload";
// import { Toaster } from "sonner";
// import { Tooltip } from "react-tooltip";
// import InfoTippy from "@/assets/images/info-tip.svg";
// import { UploadDocumentData } from "@/types/shareholder";
// import { useUploadLoanFile } from "@/hooks/use-upload-loan-file";
// import BackButton from "@components/shared/BackButton";
// import { NumericFormat } from "react-number-format";

// type LoanTableProps = {
//   date: string;
//   principal: string;
//   interest: string;
//   totalRepayment: string;
// };

// const loanSchema = Yup.object({
//   amount: Yup.number()
//     .required("Amount is required")
//     .positive("Amount must be positive")
//     .max(20000000, "Maximum loan amount is N20,000,000"),
//   tenure: Yup.string().required("Tenure is required"),
// });

// const ApplyForLoan = () => {
//   const [activeStep, setActiveStep] = useState(1);
//   const [loanStage, setLoanStage] = useState(1);
//   const [isLoanEvaluated, setIsLoanEvaluated] = useState(false);
//   const [isLoanProcessing, setIsLoanProcessing] = useState(false);

//   const [inputValue, setInputValue] = useState('');

//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("email")!;

//   const steps = ["Loan Application", "Document Upload", "Loan Status"];

//   const options: any[] = [
//     { value: 1, label: "1 Month" },
//     { value: 2, label: "2 Months" },
//     { value: 3, label: "3 Months" },
//     { value: 4, label: "4 Months" },
//     { value: 5, label: "5 Months" },
//     { value: 6, label: "6 Months" },
//     { value: 7, label: "7 Months" },
//     { value: 8, label: "8 Months" },
//     { value: 9, label: "9 Months" },
//     { value: 10, label: "10 Months" },
//   ];

//   const columns: ColumnDef<LoanTableProps>[] = [
//     {
//       accessorKey: "date",
//       header: "Date",
//       footer: () => {
//         return <div>Total</div>;
//       },
//     },
//     {
//       accessorKey: "principal",
//       header: "Principal",
//       footer: () => {
//         const formatted = new Intl.NumberFormat("en-US", {
//           style: "currency",
//           currency: "NGN",
//         }).format(300000);

//         return <div>{formatted}</div>;
//       },
//     },
//     {
//       accessorKey: "interest",
//       header: "Interest",
//       footer: () => {
//         const formatted = new Intl.NumberFormat("en-US", {
//           style: "currency",
//           currency: "NGN",
//         }).format(300000);

//         return <div>{formatted}</div>;
//       },
//     },
//     {
//       accessorKey: "totalRepayment",
//       header: "Total Repayment",
//       footer: () => {
//         const formatted = new Intl.NumberFormat("en-US", {
//           style: "currency",
//           currency: "NGN",
//         }).format(300000);

//         return <div>{formatted}</div>;
//       },
//     },
//   ];

//   const data: LoanTableProps[] = [
//     {
//       date: "29th June 2024",
//       principal: "300,000",
//       interest: "200,0000",
//       totalRepayment: "200,0000",
//     },
//     {
//       date: "29th June 2024",
//       principal: "300,000",
//       interest: "200,0000",
//       totalRepayment: "200,0000",
//     },
//     {
//       date: "29th June 2024",
//       principal: "300,000",
//       interest: "200,0000",
//       totalRepayment: "200,0000",
//     },
//   ];

//   const loanStatus = [
//     "Under Review",
//     "Loan Assessment",
//     "Processing",
//     "Approved",
//   ];

//   const {
//     mutate: createLoan,
//     isSuccess,
//     isLoading,
//   } = useCreateLoanApplication();

//   const {
//     mutate: uploadFile,
//     isLoading: isUploadLoading,
//     isSuccess: isUploadFileSuccessful,
//   } = useUploadLoanFile();

//   const handleLoanCreation = (values: any) => {
//     const { amount, tenure } = values;
//     let data: LoanCreationDTO = {
//       loanAmount: Number(amount),
//       email: userEmail,
//       tenure: tenure,
//     };
//     createLoan(data, {
//       onSuccess: (data) => {
//         const loanRef = data?.data?.reference;
//         if (loanRef) {
//           localStorage.setItem("loanRef", loanRef);
//           setActiveStep((prev) => Math.min(prev + 1, steps.length));
//           setIsLoanEvaluated(true);
//         }
//         // setActiveStep((prev) => Math.min(prev + 1, steps.length));
//         // setIsLoanProcessing(true);
//       },
//     });
//   };

//   const handleUploadLoanDoc = (values: any) => {
//     const { bankStatement } = values;
//     const loanRef = localStorage.getItem("loanRef")!;
//     let data: UploadDocumentData = {
//       reference: loanRef,
//       bankStatement: [{ file: bankStatement, pin: null }],
//       otherFiles: [{ file: bankStatement, pin: null }],
//     };
//     uploadFile(data, {
//       onSuccess: () => {
//         setActiveStep((prev) => Math.min(prev + 1, steps.length));
//         setIsLoanProcessing(true);
//       },
//     });
//   };

//   const NumberField = ({ name, ...props }: any) => {
//     const [field, meta, helpers] = useField(name);

//     const borderColor = !meta.touched
//       ? "border-gray"
//       : meta.touched && meta.error
//       ? "border-red-500"
//       : "border-gray";

//     return (
//       // <div
//       //   className={`flex items-center border border-gray rounded transition-colors duration-200
//       //   ${meta.touched && meta.error ? "border-lime-400" : ""}`}
//       // >
//       <div>
//         <div className="flex items-center border border-gray rounded-md">
//           {/* // <div className={`flex items-center border ${borderColor} rounded-md`}> */}
//           <NumericFormat
//             // {...field}
//             {...props}
//             name={name}
//             thousandSeparator
//             decimalScale={2}
//             fixedDecimalScale
//             allowNegative={false}
//             // valueIsNumericString={true}
//             className="w-full py-2 px-2 border-none focus:outline-[#6DCCA0] outline-1 rounded-md"
//             // onValueChange={(values) => {
//             //   const { floatValue } = values;
//             //   helpers.setValue(floatValue ?? "");
//             // }}

//             value={Number(field.value)}
//             onValueChange={(values: any) => {
//               const { floatValue } = values;
//               helpers.setValue(floatValue);
//               // formik.setFieldValue(field.name, floatValue);
//             }}
//             // value={field.value || 0}
//             // value={"2,007"}
//             // onValueChange={(values: any) => {
//             //   const { floatValue } = values;
//             //   console.log(floatValue)
//             //   console.log(values)
//             //   props.setFieldValue(name, floatValue);
//             //   // helpers.setValue(floatValue ?? "");
//             //   // helpers.setValue(floatValue || 0)
//             // }}
//             // onValueChange={(values) => {
//             //   onChange({
//             //     target: {
//             //       name: props.name,
//             //       value: values.value,
//             //     },
//             //   });
//             // }}

//             onBlur={field.onBlur}
//             // onValueChange={(values: any) => {
//             //   const { floatValue } = values;
//             //   props.setFieldValue(name, floatValue);
//             //   // helpers.setValue(floatValue ?? "");
//             // }}
//           />
//         </div>
//         {/* {meta.touched && meta.error ? (
//           <div className="text-red-500 text-sm mt-1">{meta.error}</div>
//         ) : null} */}
//       </div>
//     );
//   };

// //   const NumberField2 = ({ name, ...otherProps }: any) => {
// //     const [field, meta] = useField(name);

// //     const amountConfig = {
// //       ...field,
// //       ...otherProps,
// //       name: "amount",
// //       label: "Amount",
// //       thousandSeparator: ",",
// //       allowNegative: false,
// //       decimalScale: 2,
// //       decimalSeparator: ".",
// //       fixedDecimalScale: true,
// //     };

// //     return <NumericFormat {...amountConfig} />;
// //   };

// //   const NumberField3 = ({ name, ...props }) => {
// //     const [field, meta, helpers] = useField(name);

// //     return (
// //       <div>
// //         <div className="flex items-center border border-gray rounded-md">
// //           <NumericFormat
// //             {...props}
// //             value={field.value} // Set value from Formik
// //             onValueChange={(values) => {
// //               const { floatValue } = values;
// //               console.log(floatValue)
// //               props.setFieldValue(name, floatValue);
// //               // helpers.setValue(floatValue || 0); // Ensure a number is always set
// //             }}
// //             onBlur={field.onBlur} // Properly trigger Formik's blur
// //             thousandSeparator
// //             decimalScale={2}
// //             fixedDecimalScale
// //             allowNegative={false}
// //             // customInput={Input}
// //             className="w-full py-2 px-2 border-none focus:outline-[#6DCCA0] outline-1 rounded-md"
// //           />
// //         </div>
// //         {meta.touched && meta.error ? (
// //           <div className="text-red-500 text-sm mt-1">{meta.error}</div>
// //         ) : null}
// //       </div>
// //     );
// //   };

// //   const NumberField4 = ({ name, ...props }) => {
// //     const [field, meta, helpers] = useField(name);

// //     return (
// //       <div>
// //         <div className="flex items-center border border-gray rounded-md">
// //           {/* <NumericFormat
// //             {...props}
// //             value={field.value} // Set value from Formik
// //             onValueChange={(values) => {
// //               const { floatValue } = values;
// //               console.log(floatValue)
// //               props.setFieldValue(name, floatValue);
// //               // helpers.setValue(floatValue || 0); // Ensure a number is always set
// //             }}
// //             onBlur={field.onBlur} // Properly trigger Formik's blur
// //             thousandSeparator
// //             decimalScale={2}
// //             fixedDecimalScale
// //             allowNegative={false}
// //             customInput={Input}
// //             className="w-full py-2 px-2 border-none focus:outline-[#6DCCA0] outline-1 rounded-md"
// //           /> */}
// //             <NumericFormat
// //                         {...props}
// //   value={1234}
// //   prefix="$"
// //   onValueChange={(values, sourceInfo) => {
// //     console.log(values, sourceInfo);
// //   }}
// // />;
// //         </div>
// //         {meta.touched && meta.error ? (
// //           <div className="text-red-500 text-sm mt-1">{meta.error}</div>
// //         ) : null}
// //       </div>
// //     );
// //   };

// const formatAmount = (value:any) => {
//   if (!value) return '';
//   const amount = parseFloat(value.replace(/,/g, ''));
//   let formattedAmount = new Intl.NumberFormat('en-US', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
//   setInputValue(formattedAmount)
//   return formattedAmount
// };

// const formatAmount3 = (value:any) => {
//   if (!value) return '';
//   const amount = parseFloat(value.replace(/,/g, ''));
//   if (isNaN(amount)) return '';
//   return new Intl.NumberFormat('en-US', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// const parseAmount = (value:any) => {
//   if (!value) return '';
//   return value.replace(/,/g, '');
// };

//   return (
//     <Loading type="cover" loading={isLoading || isUploadLoading}>
//       <BackButton title={"Apply For Loans"} />
//       <Separator />
//       <div className="flex justify-center items-center flex-col mt-5">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-10 w-full max-w-screen-lg">
//           <Card className="w-full md:col-span-4">
//             <CardContent>
//               <Stepper
//                 icon={<Banknote />}
//                 title={"Loan Stages"}
//                 steps={steps}
//                 activeStep={activeStep}
//               />
//             </CardContent>
//           </Card>
//           {!isLoanProcessing && (
//             <Card className="w-full md:col-span-8">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-lg font-normal">
//                   <Undo2
//                     className="cursor-pointer"
//                     onClick={() =>
//                       setActiveStep((prev) => Math.max(prev - 1, 0))
//                     }
//                   />
//                   Loan Application
//                 </CardTitle>
//                 <Separator />
//               </CardHeader>
//               <CardContent className="pt-0">
//                 <h3 className="text-gray-500 mb-5 text-sm">
//                   Kindly Enter Your Details to Access Your Account
//                 </h3>
//                 <Formik
//                   initialValues={{
//                     amount: "",
//                     tenure: null,
//                     bankStatement: "",
//                   }}
//                   validationSchema={loanSchema}
//                   onSubmit={(values, { resetForm, setSubmitting }) => {
//                     handleUploadLoanDoc(values);
//                   }}
//                 >
//                   {({ values, touched, errors, setFieldValue }) => (
//                     <Form>
//                       <FormContainer size="lg">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           <FormItem
//                             label="Amount"
//                             className="mb-4 md:mb-6 md:pb-4 lg:pb-1"
//                             invalid={errors.amount && touched.amount}
//                             errorMessage={errors.amount}
//                           >
//                             {/* <Field
//                               type="number"
//                               autoComplete="off"
//                               name="amount"
//                               placeholder="NGN"
//                               component={Input}
//                             /> */}

// <Field name="amount">
//     {({ field, form }: FieldProps) => (
//       <Input
//         type="text"
//         autoComplete="off"
//         // {...field}
//         field={field}
//         form={form}
//         placeholder="NGN"
//         // value={formatAmount(field.value)}
//         value={inputValue}
//         // value={formatAmount(field.value)}
//         onChange={(e:any) => {
//           console.log(e)
//           formatAmount(e.target.amount)
//           form.setFieldValue(field.name, e.target.amount);
//         }}

//         // onChange={(e) => {
//         //   // Simply set the raw value during typing
//         //   form.setFieldValue(field.name, e.target.value);
//         // }}
//         // onBlur={(e) => {
//         //   const formattedValue = formatAmount(e.target.value);
//         //   form.setFieldValue(field.name, formattedValue);
//         // }}
//         // value={formatAmount(field.value)}
//           // onChange={(e) => {
//           //   const rawValue = parseAmount(e.target.value);
//           //   form.setFieldValue(field.name, rawValue);
//           // }}

//       />
//     )}
//   </Field>

//                             {/*
//                             <Field
//                               type="number"
//                               autoComplete="off"
//                               name="amount"
//                               placeholder="NGN"
//                               component={NumberField}
//                             /> */}

//                             {/* <Field
//                               autoComplete="off"
//                               // type="number"
//                               // displayType="input"
//                               placeholder="NGN"
//                               name="amount"
//                               component={NumberField}
//                               // value={values.amount}
//                               // onValueChange={(values: any) => {
//                               //   const { floatValue } = values;
//                               //   console.log(floatValue)
//                               //   console.log(values)
//                               //   setFieldValue("amount", floatValue);
//                               // }}
//                             /> */}

//                             {/* <Field
//                               autoComplete="off"
//                               placeholder="NGN"
//                               name="amount"
//                               component={NumberField}
//                               setFieldValue={setFieldValue}
//                             /> */}

//                             {/* new */}
//                             {/* <Field name="amount">
//                             {({ field,form: { touched, errors }, meta, }: FieldProps) => (
//                               // type="number"
//                               values= {amount}
//                               placeholder="NGN"
//                               // displayType="input"
//                               component={NumberField}
//                               onValueChange=
//                               {(values: any) => {
//                                 const { floatValue } = values;
//                                 setFieldValue("amount", floatValue);
//                               }}
//                             )}

//                             </Field>{" "} */}
//                             {/* new */}
//                           </FormItem>
//                           <FormItem
//                             label="Tenure"
//                             className="mb-4 md:mb-6 md:pb-4 lg:pb-1"
//                             // size="sm"
//                             invalid={errors.tenure && touched.tenure}
//                           >
//                             <Field name="tenure">
//                               {({ field, form }: FieldProps) => (
//                                 <Select
//                                   field={field}
//                                   placeholder=""
//                                   form={form}
//                                   options={options}
//                                   isDisabled={
//                                     Boolean(errors.amount && touched.amount) ||
//                                     !form.values.amount
//                                   }
//                                   value={options.filter(
//                                     (option) => option.value === values.tenure
//                                   )}
//                                   onChange={(option: any) => {
//                                     form.setFieldValue(
//                                       field.name,
//                                       option?.value,
//                                       false
//                                     );
//                                     form.setFormikState((prevState) => {
//                                       const updatedValues = {
//                                         ...prevState.values,
//                                         [field.name]: option?.value,
//                                       };
//                                       // Call handleLoanCreation after the state is updated
//                                       handleLoanCreation(updatedValues);
//                                       return {
//                                         ...prevState,
//                                         values: updatedValues,
//                                       };
//                                     });
//                                   }}
//                                 />
//                               )}
//                             </Field>
//                           </FormItem>
//                         </div>
//                         {isSuccess && (
//                           <>
//                             <FormItem
//                               label="Upload Bank Statement"
//                               extra={
//                                 <div className="flex items-center">
//                                   <img
//                                     src={InfoTippy}
//                                     alt="Info Tip"
//                                     className="ml-1 cursor-pointer"
//                                     data-tooltip-id="pof-tooltip"
//                                     data-tooltip-html="Upload 6 - 12 months bank statement"
//                                     data-tooltip-variant="dark"
//                                   />
//                                   <Tooltip
//                                     id="pof-tooltip"
//                                     key={"right-end"}
//                                     place={"right-end"}
//                                   />
//                                 </div>
//                               }
//                               invalid={Boolean(
//                                 errors.bankStatement && touched.bankStatement
//                               )}
//                               errorMessage={errors.bankStatement as string}
//                             >
//                               <Field name="bankStatement">
//                                 {({ field, form }: FieldProps<any>) => {
//                                   const { setFieldValue, values } = form;
//                                   const {
//                                     uploadDoc,
//                                     loading,
//                                     uploadedUrls,
//                                     resetUploadedUrl,
//                                   } = useUploadFile(setFieldValue);
//                                   const fieldName = field.name;
//                                   return (
//                                     <Upload
//                                       draggable
//                                       onChange={async (files) => {
//                                         await uploadDoc(files[0], fieldName);
//                                       }}
//                                       loading={loading[fieldName]}
//                                       uploadedUrl={
//                                         values.cacCertificate ||
//                                         uploadedUrls[fieldName]
//                                       }
//                                       setUploadedUrl={() =>
//                                         resetUploadedUrl(fieldName)
//                                       }
//                                     />
//                                   );
//                                 }}
//                               </Field>
//                             </FormItem>

//                             <div className="flex items-center space-x-2 mt-4">
//                               <Checkbox id="terms" />
//                               <label
//                                 htmlFor="terms"
//                                 className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                               >
//                                 Accept terms and conditions
//                               </label>
//                             </div>

//                             <div className="mt-5 w-full">
//                               <Button type="submit" className="w-full h-10">
//                                 Proceed
//                               </Button>
//                             </div>
//                           </>
//                         )}
//                       </FormContainer>
//                     </Form>
//                   )}
//                 </Formik>
//               </CardContent>
//             </Card>
//           )}
//           {isLoanProcessing && (
//             <Card className="w-full md:col-span-8">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-lg font-semibold">
//                   <Banknote />
//                   Loan Status
//                 </CardTitle>
//                 <Separator />
//               </CardHeader>
//               <CardContent className="pt-0">
//                 <div className="flex overflow-x-auto gap-5">
//                   {loanStatus.map((status: any, idx: number) => (
//                     <Badge
//                       key={idx}
//                       className={`flex items-center justify-center h-10 min-w-40 hover:bg-gray-300 ${
//                         loanStage === idx + 1
//                           ? "bg-header text-white"
//                           : "bg-gray-300 text-header"
//                       }`}
//                     >
//                       <div
//                         className={`rounded-full w-5 h-5 flex justify-center items-center mr-1 ${
//                           loanStage === idx + 1
//                             ? "bg-emerald-800 text-white"
//                             : "bg-gray-400 text-white"
//                         }`}
//                       >
//                         {idx + 1}
//                       </div>
//                       {status}
//                     </Badge>
//                   ))}
//                 </div>
//                 <Separator className="mt-2" />
//                 <div className="mt-5">
//                   <h3 className="text-lg font-semibold">Congratulations</h3>
//                   <br />
//                   <p>
//                     Hurray!!!!!! Your loan is currently under review. An email
//                     will be sent to on the status of your application, usually
//                     within 24-48hrs. Go to your loan dashboard to monitor your
//                     loans.
//                   </p>
//                   <br />
//                 </div>
//                 <div className="mt-5 w-full">
//                   <Button
//                     className="w-full h-12"
//                     onClick={() => navigate("/loan-dashboard")}
//                   >
//                     Go to Loan Dashboard
//                   </Button>
//                 </div>
//               </CardContent>
//               <CardFooter className="p-0">
//                 <img src={image} alt="" className="object-cover" />
//               </CardFooter>
//             </Card>
//           )}
//         </div>
//       </div>
//       <Toaster richColors position="top-right" />
//     </Loading>
//   );
// };

// export default ApplyForLoan;

// import { Separator } from "@components/ui/separator";
// import { useState } from "react";
// import AddNewShareHolderDialog from "../account-setup/AddNewShareHolderDialog";
// import BusinessProfileForm from "./BusinessProfileForm";
// import RolesAndPermissions from "./RolesAndPermissions";
// import AddNewUserDialog from "./AddNewUserDialog";
// import Passwords from "./Passwords";
// import BackButton from "@components/shared/BackButton";
// import { CreatePin } from "./CreatePin";
// import ResetPin from "./ResetPin";
// import ChangePin from "./ChangePin";
// import Loading from "@components/shared/Loading";
// const UserManagement = () => {
//   const [activeTab, setActiveTab] = useState("Create PIN");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAddNewUserDialogOpen, setIsAddNewUserDialogOpen] = useState(false);

//   const tabs = [
//     // { name: "Business Profile" },
//     // { name: "Roles & Permissions" },
//     // { name: "Passwords" },
//     { name: "Create PIN" },
//     { name: "Change PIN" },
//     { name: "Reset PIN" },
//   ];

//   const options: any[] = [
//     { value: "1", label: "Payment Type 1" },
//     { value: "2", label: "Payment Type 2" },
//   ];

//   return (
//     <Loading loading={isLoading} type="cover">
//       <BackButton title={"User Settings"} />
//       <Separator />
//       <div className="w-full border-b mt-8">
//         <div className="flex justify-start overflow-auto space-x-8">
//           {tabs.map((tab) => (
//             <div
//               key={tab.name}
//               className={`cursor-pointer pb-2 whitespace-nowrap ${
//                 activeTab === tab.name
//                   ? "text-green-500 border-b-2 border-green-500"
//                   : "text-gray-500"
//               }`}
//               onClick={() => setActiveTab(tab.name)}
//             >
//               {tab.name}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-center items-center flex-col mt-10">
//         {/* {activeTab === "Business Profile" && (
//           <BusinessProfileForm options={options} setIsOpen={setIsOpen} />
//         )}
//         {activeTab === "Passwords" && <Passwords />} */}
//         {activeTab === "Create PIN" && (
//           <CreatePin setIsLoading={setIsLoading} />
//         )}
//         {activeTab === "Change PIN" && (
//           <ChangePin setIsLoading={setIsLoading} />
//         )}
//         {activeTab === "Reset PIN" && <ResetPin setIsLoading={setIsLoading} />}
//       </div>
//       {/* {activeTab === "Roles & Permissions" && (
//         <RolesAndPermissions
//           setIsAddNewUserDialogOpen={setIsAddNewUserDialogOpen}
//         />
//       )} */}
//       <AddNewShareHolderDialog isOpen={isOpen} setIsOpen={setIsOpen} />
//       <AddNewUserDialog
//         isOpen={isAddNewUserDialogOpen}
//         setIsOpen={setIsAddNewUserDialogOpen}
//       />
//     </Loading>
//   );
// };

// export default UserManagement;
