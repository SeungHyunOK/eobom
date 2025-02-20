// src/pages/Signup/Caregiver/Caregiver.tsx
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";
import Step6 from "./Steps/Step6";
import Step7 from "./Steps/Step7";
import Step8 from "./Steps/Step8";
import Step9 from "./Steps/Step9";
import Step10 from "./Steps/Step10";
import Step11 from "./Steps/Step11";
import Step12 from "./Steps/Step12";
import Step13 from "./Steps/Step13";
import Step14 from "./Steps/Step14";

interface FormData {
  id: string;
  pw: string;
  name: string;
  birthday: string;
  gender: string;
  phone: string;
  address: string;
  addressDetail: string;
  qn: string;
  additionalSignupInfo: string;
  extraInfo1: string;
  extraInfo2: string;
  extraInfo3: string;
  extraInfo4: string;
  extraInfo5: string;
  extraInfo6: string;
}

export default function Caregiver() {
  const [step, setStep] = React.useState(0);
  const [showStep, setShowStep] = React.useState(0);
  // 총 15단계가 있으므로 초기 totalStep를 15로 설정
  const [totalStep, setTotalStep] = React.useState(6);
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<FormData>({
    id: "",
    pw: "", // 수정: "password" -> "pw"
    name: "",
    birthday: "",
    gender: "",
    phone: "",
    address: "",
    addressDetail: "",
    qn: "",
    additionalSignupInfo: "",
    extraInfo1: "",
    extraInfo2: "",
    extraInfo3: "",
    extraInfo4: "",
    extraInfo5: "",
    extraInfo6: "",
  });

  const goExtra = React.useCallback(() => {
    setStep((prev) => prev + 1);
    setShowStep(1);
    setTotalStep(4);
  }, []);

  const updateFormData = React.useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const goBack = React.useCallback(() => {
    if (step === 0) {
      navigate(-1);
      return;
    }
    setStep((prev) => prev - 1);
    setShowStep((prev) => prev - 1);
  }, [step, navigate]);

  const goNext = React.useCallback(() => {
    setStep((prev) => prev + 1);
    setShowStep((prev) => prev + 1);
  }, []);

  const Done = React.useCallback(async () => {
    // try {
    //   const response = await fetch(
    //     "http://localhost:4000/api/caregiver/sign_up",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error(`API 오류: ${response.status}`);
    //   }
    //   const result = await response.json();
    // console.log("회원가입 성공", result);
    // 성공 시 후속 처리 (예: 페이지 이동 등)
    // } catch (error) {
    //   console.error("회원가입 전송 중 오류 발생", error);
    //   alert("회원가입 전송 중 오류가 발생했습니다.");
    // }
    console.log("회원가입 성공");
    navigate("/");
  }, []);

  const stepsComponents = React.useMemo(() => {
    return [
      Step0,
      Step1,
      Step2,
      Step3,
      Step4,
      Step5,
      Step6,
      Step7,
      Step8,
      Step9,
      Step10,
      Step11,
      Step12,
      Step13,
      Step14,
    ];
  }, []);

  const CurrentStepComponent = stepsComponents[step];

  const stepProps = {
    Done: Done,
    formData,
    updateFormData,
    goBack,
    onNext: goNext,
    goExtra: goExtra,
    currentStep: showStep + 1,
    totalSteps: totalStep,
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <CurrentStepComponent {...stepProps} />
    </div>
  );
}
