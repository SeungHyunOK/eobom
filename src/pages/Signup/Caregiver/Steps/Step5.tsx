import * as React from "react";
import Button from "../../../../components/common/Caregiver/Button";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";
import Title from "../../../../components/common/Caregiver/Title";
import icon_check from "../../../../assets/icons/check.svg";
import icon_checkDone from "../../../../assets/icons/check-done.svg";

interface Step5Props {
  updateFormData: (field: "additionalSignupInfo", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step5({
  updateFormData,
  goBack,
  onNext,
  currentStep,
  totalSteps,
}: Step5Props) {
  // 체크 항목들을 하나의 객체로 관리
  const [checkedItems, setCheckedItems] = React.useState({
    driverLicense: false, // 🪪 운전면허가 있어요
    ownCar: false, // 🚘 자차가 있어요
    dementiaEdu: false, // 📖 치매교육을 이수했어요
    nurseCert: false, // 🏥 간호조무사 자격증이 있어요
    socialWorker: false, // 🧑‍💼 사회복지사 자격증이 있어요
  });

  const handleCheckboxChange =
    (field: keyof typeof checkedItems) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems((prev) => ({
        ...prev,
        [field]: e.target.checked,
      }));
    };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData("additionalSignupInfo", JSON.stringify(checkedItems));
    onNext();
  };

  const renderCheckboxRow = (
    field: keyof typeof checkedItems,
    labelText: string
  ) => {
    const isChecked = checkedItems[field];
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
            w-full font-bold flex items-center leading-[1.87rem]
            py-[0.93rem] pl-[1.31rem] pr-[1.18rem] border-2 rounded-[0.62rem]
            border-[#FAF9F9] cursor-pointer hover:underline
            transition-colors
            ${isChecked ? "bg-[#FFF2CC] border-[#FFAE00]" : ""}
          `}
        >
          {labelText}
          <span className="ml-auto">
            {isChecked ? (
              <img src={icon_checkDone} alt="Done" className="inline-block" />
            ) : (
              <img src={icon_check} alt="NotDone" className="inline-block" />
            )}
          </span>
        </label>
      </div>
    );
  };

  return (
    <>
      <SignupHeader step={currentStep} goBack={goBack}>
        회원가입
      </SignupHeader>
      <Progress currentStep={currentStep} totalSteps={totalSteps} />
      <Title
        subTitle="해당 사항이 많을수록 일자리 매칭 확률이 높아져요"
        className="mb-[2.68rem] px-[1.56rem]"
      >
        📝
        <br />
        일자리 추천을 위하여
        <br />
        해당 사항을 모두 체크해주세요
      </Title>
      <form
        onSubmit={handleNext}
        className="mx-[0.93rem] flex flex-col gap-[1.18rem]"
      >
        {renderCheckboxRow("driverLicense", "🪪 운전면허가 있어요")}
        {renderCheckboxRow("ownCar", "🚘 자차가 있어요")}
        {renderCheckboxRow("dementiaEdu", "📖 치매교육을 이수했어요")}
        {renderCheckboxRow("nurseCert", "🏥 간호조무사 자격증이 있어요")}
        {renderCheckboxRow("socialWorker", "🧑‍💼 사회복지사 자격증이 있어요")}
        <Button type="submit">회원가입 완료</Button>
      </form>
    </>
  );
}
