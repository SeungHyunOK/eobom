// src/components/Steps/Step1.tsx
import * as React from "react";
import Input from "../../../../components/common/Caregiver/Input";
import Title from "../../../../components/common/Caregiver/Title";
import Button from "../../../../components/common/Caregiver/Button";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";

interface Step1Props {
  formData: {
    name: string;
    birthday: string;
    gender: string;
  };
  updateFormData: (
    field: "name" | "birthday" | "gender",
    value: string
  ) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

const formatBirthday = (input: string): string => {
  // 숫자만 남기고
  const digits = input.replace(/\D/g, "");
  let formatted = "";
  // 최대 6자리까지 포맷 (예: 01.01.01)
  for (let i = 0; i < Math.min(digits.length, 6); i++) {
    if (i > 0 && i % 2 === 0) {
      formatted += ".";
    }
    formatted += digits[i];
  }
  return formatted;
};

const Step1: React.FC<Step1Props> = ({
  formData,
  updateFormData,
  onNext,
  goBack,
  currentStep,
  totalSteps,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current?.checkValidity()) {
      onNext();
    } else {
      formRef.current?.reportValidity();
    }
  };

  return (
    <>
      <SignupHeader step={currentStep} goBack={goBack}>
        회원가입
      </SignupHeader>
      <Progress currentStep={currentStep} totalSteps={totalSteps} />
      <div className="px-[1.56rem] flex flex-col">
        <Title
          subTitle="본인 확인을 위하여 인적 사항을 작성해주세요"
          className="mb-[1.5rem]"
        >
          👋
          <br />
          활동을 위해 보호사님의
          <br />
          기본 인적사항이 필요해요
        </Title>
        <form ref={formRef} className="flex flex-col">
          <Input
            className="mb-[1.88rem]"
            type="Name"
            label="이름"
            value={formData.name}
            onChange={(val) => updateFormData("name", val)}
          />
          <Input
            type="Birthday"
            label="생년월일"
            value={formData.birthday}
            onChange={(val) => updateFormData("birthday", formatBirthday(val))}
          />
          <Input
            type="Gender"
            label="성별"
            value={formData.gender}
            onChange={(val) => updateFormData("gender", val)}
          />
          <Button type="submit" onClick={handleSubmit}>
            입력완료
          </Button>
        </form>
      </div>
    </>
  );
};

export default Step1;
