import * as React from "react";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";
import Title from "../../../../components/common/Caregiver/Title";
import Button from "../../../../components/common/Caregiver/Button";
import Input from "../../../../components/common/Caregiver/Input";

interface Step13Props {
  updateFormData: (field: "extraInfo6", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

const Step13: React.FC<Step13Props> = ({
  updateFormData,
  goBack,
  onNext,
  currentStep,
  totalSteps,
}) => {
  const [context, setContext] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData("extraInfo6", JSON.stringify(context));
    onNext();
  };

  return (
    <>
      <SignupHeader step={currentStep} goBack={goBack}>
        희망 근무 조건
      </SignupHeader>
      <Progress currentStep={currentStep} totalSteps={totalSteps} />

      <div className="mx-[1.43rem]">
        <Title
          className="mb-[51px]"
          subTitle="2025년 최저시급은 10,030원이에요"
        >
          💰
          <br />
          근무 시에
          <br />
          희망하는 시급을 입력해주세요
        </Title>
      </div>
      <form className="mx-[25px]" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="예시 ) 20,000"
          value={context}
          onChange={setContext}
        />
        <Button>입력완료</Button>
      </form>
    </>
  );
};

export default Step13;
