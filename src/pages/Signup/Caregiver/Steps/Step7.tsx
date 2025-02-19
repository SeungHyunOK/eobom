// src/pages/Signup/Caregiver/Steps/Step7.tsx
import * as React from "react";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";
import Title from "../../../../components/common/Caregiver/Title";
import Button from "../../../../components/common/Caregiver/Button";

interface Step7Props {
  updateFormData: (field: "extraInfo1", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

const Step7: React.FC<Step7Props> = ({
  updateFormData,
  goBack,
  onNext,
  currentStep,
  totalSteps,
}) => {
  // 하나의 객체로 통합 관리
  const [info, setInfo] = React.useState({
    friendly: false, // 💕 친절해요
    hygiene: false, // 🧼 위생 관리 철저해요
    experience: false, // 🏥 근무 경험이 많아요
    diligent: false, // 성실해요
    calm: false, // ☕️ 차분해요
    positive: false, // ☀️ 밝고 긍정적이에요
    communication: false, // 💬 소통을 잘 해요
    trustworthy: false, // 🤝 믿음직해요
    emergency: false, // 🚑 응급대처가 가능해요
    meticulous: false, // 📝 꼼꼼해요
  });

  // 체크박스 변경 핸들러
  const handleCheckboxChange =
    (field: keyof typeof info) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInfo((prev) => ({
        ...prev,
        [field]: e.target.checked,
      }));
    };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    updateFormData("extraInfo1", JSON.stringify(info));
    onNext();
  };

  const renderCheckboxRow = (field: keyof typeof info, labelText: string) => {
    const isChecked = info[field];
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          id={field}
          className="sr-only peer"
          checked={isChecked}
          onChange={handleCheckboxChange(field)}
        />
        <label
          htmlFor={field}
          className={`
            text-[#3b3939] px-3 text-lg font-bold flex items-center leading-[1.87rem]
            py-[0.62rem] border-2 rounded-[1.87rem]
            cursor-pointer hover:underline transition-colors no-underline
            ${isChecked ? "bg-[#FFF2CC] border-[#FFAE00]" : "border-[#f9f8f8]"}
          `}
        >
          {labelText}
        </label>
      </div>
    );
  };

  return (
    <>
      <SignupHeader step={currentStep} goBack={goBack}>
        추가정보
      </SignupHeader>
      <Progress currentStep={currentStep} totalSteps={totalSteps} />
      <div className="mx-[1.43rem]">
        <Title className="mb-[2.88rem] ">
          👀
          <br />
          자신을 소개하는
          <br />
          키워드 3가지를 선택해주세요
        </Title>
      </div>
      <form onSubmit={handleNext} className="mx-[1.06rem] flex flex-wrap gap-4">
        {renderCheckboxRow("friendly", "💕 친절해요")}
        {renderCheckboxRow("hygiene", "🧼 위생 관리 철저해요")}
        {renderCheckboxRow("experience", "🏥 근무 경험이 많아요")}
        {renderCheckboxRow("diligent", "🏃‍♂️ 성실해요")}
        {renderCheckboxRow("calm", "☕️ 차분해요")}
        {renderCheckboxRow("positive", "☀️ 밝고 긍정적이에요")}
        {renderCheckboxRow("communication", "💬 소통을 잘 해요")}
        {renderCheckboxRow("trustworthy", "🤝 믿음직해요")}
        {renderCheckboxRow("emergency", "🚑 응급대처가 가능해요")}
        {renderCheckboxRow("meticulous", "📝 꼼꼼해요")}
        <Button type="submit">선택완료</Button>
      </form>
    </>
  );
};

export default Step7;
