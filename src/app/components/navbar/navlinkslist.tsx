export const menuLinks = [
  {
    id: 1,
    name: "Community",
    subMenu: true,
    subLinks: [
      {
        subLink: [
          { id: 1, name: "Blog", link: "/blog" },
          { id: 2, name: "Newsletter", link: "/" },
          { id: 3, name: "Events", link: "/" },
          { id: 4, name: "Social Media", link: "/" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Talents",
    subMenu: true,
    subLinks: [
      {
        subLink: [
          { id: 1, name: "Learning Portal", link: "/" },
          { id: 2, name: "Remote Work Resources", link: "/" },
          { id: 3, name: "Create Account", link: "/" },
          { id: 4, name: "Log In", link: "/" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Employers",
    subMenu: true,
    subLinks: [
      {
        subLink: [
          { id: 1, name: "Post A Job", link: "/" },
          { id: 2, name: "Hiring Guide", link: "/" },
          { id: 3, name: "Create Employers Account", link: "/" },
          { id: 4, name: "Log Into Employers Account", link: "/" },
        ],
      },
    ],
  },
];

// ----------
// const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// --------------

// const onPasswordVisibleClick = (e: MouseEvent, inputType: string) => {
//   e.preventDefault();
//   if (inputType === "password") {
//     setPwInputTypePassword(
//       pwInputTypePassword === "password" ? "text" : "password"
//     );
//   } else {
//     setPwInputTypeConfirm(
//       pwInputTypeConfirm === "password" ? "text" : "password"
//     );
//   }
//   // setPwInputType(pwInputType === 'password' ? 'text' : 'password')
// };

// const inputIcon = (inputType: string) => (
//   <span
//     className="cursor-pointer"
//     onClick={(e: any) => onPasswordVisibleClick(e, inputType)}
//   >
//     {/* {inputType === "password" ? <EyeOff size={15} /> : <EyeIcon size={15} />} */}
//     {inputType === "password" ? (
//       showPassword ? (
//         <EyeIcon size={15} />
//       ) : (
//         <EyeOff size={15} />
//       )
//     ) : showConfirmPassword ? (
//       <EyeIcon size={15} />
//     ) : (
//       <EyeOff size={15} />
//     )}
//   </span>
// );
// --------up latest

// const togglePasswordVisibility = () => {
//   setShowPassword(!showPassword);
// };

// const toggleConfirmPasswordVisibility = () => {
//   setShowConfirmPassword(!showConfirmPassword);
// };

// const onPasswordVisibleClick = (e: MouseEvent, inputType: string) => {
//   e.preventDefault();
//   if (inputType === "password") {
//     setPwInputTypePassword(
//       pwInputTypePassword === "password" ? "text" : "password"
//     );
//   } else {
//     setPwInputTypeConfirm(
//       pwInputTypeConfirm === "password" ? "text" : "password"
//     );
//   }
//   // setPwInputType(pwInputType === 'password' ? 'text' : 'password')
// };

// const inputIcon = (inputType: string) => (
//   <span
//     className="cursor-pointer"
//     onClick={(e: any) => onPasswordVisibleClick(e, inputType)}
//   >
//      {inputType === "password" ? (
//       showPassword ? (
//         <EyeIcon size={15} />
//       ) : (
//         <EyeOff size={15} />
//       )
//     ) : showConfirmPassword ? (
//       <EyeIcon size={15} />
//     ) : (
//       <EyeOff size={15} />
//     )}
//     {/* {inputType === "password" ? <EyeOff size={15} /> : <EyeIcon size={15} />} */}
//   </span>
// );

// ----working

// const inputIcon = () => (
//   <span className="cursor-pointer" onClick={togglePasswordVisibility}>
//     {showPassword ? <EyeIcon size={15} /> : <EyeOff size={15} />}
//   </span>
// );

// ------new try
// const inputIcon = (fieldName: string) => (
//   <span
//     className="cursor-pointer"
//     onClick={() => {
//       if (fieldName === "password") {
//         togglePasswordVisibility();
//       } else {
//         toggleConfirmPasswordVisibility();
//       }
//     }}
//   >
//     {fieldName === "password" ? (
//       showPassword ? (
//         <EyeIcon size={15} />
//       ) : (
//         <EyeOff size={15} />
//       )
//     ) : showConfirmPassword ? (
//       <EyeIcon size={15} />
//     ) : (
//       <EyeOff size={15} />
//     )}
//   </span>
// );

// -------------
// type={showPassword ? "text" : "password"}
// suffix={inputIcon("password")}

// type={
//   showConfirmPassword
//     ? "text"
//     : "confirmPassword"
// }
// suffix={inputIcon("confirmPassword")}
