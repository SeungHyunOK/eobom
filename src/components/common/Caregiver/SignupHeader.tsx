// src/components/common/Caregiver/SignupHeader.tsx
import * as React from "react";
import icon_past from "../../../assets/icons/past.svg";

interface SignupHeaderProps {
  step: number;
  goBack: () => void;
  children: React.ReactNode;
}

const SignupHeader: React.FC<SignupHeaderProps> = ({
  step,
  goBack,
  children,
}) => {
  return (
    <div className="relative flex justify-center items-center pt-[3rem] pb-[1.06rem] px-[1.4rem]">
      {step > 0 && (
        <button
          onClick={goBack}
          className="absolute left-[1.4rem] w-[1.25rem] h-[1.25rem]"
        >
          <img src={icon_past} alt="뒤로가기" />
        </button>
      )}
      <h1 className="text-[1.25rem] font-bold">{children}</h1>
    </div>
  );
};

export default SignupHeader;
