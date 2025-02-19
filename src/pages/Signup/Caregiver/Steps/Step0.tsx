// src/components/Steps/Step0.tsx
import * as React from "react";
import Input from "../../../../components/common/Caregiver/Input";
import Button from "../../../../components/common/Caregiver/Button";
import Title from "../../../../components/common/Caregiver/Title";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";
import PasswordInput from "../../../../components/common/Caregiver/Inputs/PasswordInput";

interface Step0Props {
  formData: {
    id: string;
    password: string;
  };
  updateFormData: (field: "id" | "password", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

const Step0: React.FC<Step0Props> = React.memo(
  ({ updateFormData, formData, onNext, goBack, currentStep, totalSteps }) => {
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          <Title>
            🔑
            <br />
            사용하실 아이디와
            <br />
            비밀번호를 입력해주세요
          </Title>
          {/* onSubmit 이벤트로 엔터키 제출까지 처리 */}
          <form ref={formRef} className="flex flex-col" onSubmit={handleSubmit}>
            <Input
              id="id"
              type="Id"
              label="아이디"
              value={formData.id}
              onChange={(val) => updateFormData("id", val)}
              className="mb-[2.12rem]"
            />
            <PasswordInput
              label="비밀번호"
              value={formData.password}
              onChange={(val) => updateFormData("password", val)}
            />
            <Button type="submit">입력완료</Button>
          </form>
        </div>
      </>
    );
  }
);

export default Step0;
