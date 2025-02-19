// src/components/Steps/Step4.tsx
import * as React from "react";
import Button from "../../../../components/common/Caregiver/Button";
import Input from "../../../../components/common/Caregiver/Input";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";
import Title from "../../../../components/common/Caregiver/Title";

interface Step4Props {
  formData: {
    qn: string;
  };
  updateFormData: (field: "qn", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

const Step4: React.FC<Step4Props> = ({
  formData,
  updateFormData,
  goBack,
  onNext,
  currentStep,
  totalSteps,
}) => {
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.qn) {
      alert("주소를 선택해주세요.");
      return;
    }
    onNext();
  };

  return (
    <>
      <SignupHeader step={currentStep} goBack={goBack}>
        회원가입
      </SignupHeader>
      <Progress currentStep={currentStep} totalSteps={totalSteps} />
      <div className="px-[1.56rem] flex flex-col">
        <Title
          subTitle="요양보호사 자격증이 없으면 활동이 어려워요 "
          className="mb-[3.18rem]"
        >
          ✅<br />
          요양보호사 자격증의
          <br />
          문서확인번호를 입력해주세요
        </Title>
        <form className="flex flex-col" onSubmit={handleNext}>
          <Input
            type="Qn"
            value={formData.qn}
            onChange={(val) => updateFormData("qn", val)}
          />
          <Button type="submit">입력완료</Button>{" "}
        </form>
      </div>
    </>
  );
};

export default Step4;
