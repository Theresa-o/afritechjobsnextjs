// import Link from "next/link";

interface ButtonProps {
  text: string;
  style: any;
  onClick?: () => void;
}

const ButtonComponent = ({ text, style, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      <div className={`px-10 py-2 ${style}`}>{text}</div>
    </button>
  );
};

export default ButtonComponent;
