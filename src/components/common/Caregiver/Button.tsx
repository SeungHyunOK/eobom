import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  const baseClass =
    "min-w-[20.6rem] active:bg-[#FF8411] hover:bg-[#FF8411] w-11/12 font-bold fixed left-1/2 transform -translate-x-1/2 rounded-[0.63rem] text-[1.18rem] bottom-[1.25rem] h-[2.9rem] bg-[#D4D2D2] text-white";
  return (
    <button {...rest} className={`${baseClass} ${className || ""}`}>
      {children}
    </button>
  );
};

export default Button;
