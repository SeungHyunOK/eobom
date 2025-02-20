// src/components/Steps/Step2.tsx
import * as React from "react";
import Input from "../../../../components/common/Caregiver/Input";
import Title from "../../../../components/common/Caregiver/Title";
import Button from "../../../../components/common/Caregiver/Button";
import Modal from "../../../../components/common/Caregiver/Modal";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";

interface Step2Props {
  formData: {
    phone: string;
  };
  updateFormData: (field: "phone", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

const Step2: React.FC<Step2Props> = ({
  formData,
  updateFormData,
  onNext,
  goBack,
  currentStep,
  totalSteps,
}) => {
  const [otpTime, setOtpTime] = React.useState(180);
  const [generatedCode, setGeneratedCode] = React.useState("");
  const [userInputCode, setUserInputCode] = React.useState("");
  const [isCodeSent, setIsCodeSent] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const validatePhone = (phone: string): boolean => {
    // 예: 010-1234-5678 형식을 검사 (정확히 3-4-4 자리 숫자와 하이픈)
    const phonePattern = /^\d{3}-\d{4}-\d{4}$/;
    return phonePattern.test(phone);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendVerificationCode();
  };

  React.useEffect(() => {
    if (isCodeSent && otpTime > 0) {
      const timer = setInterval(() => {
        setOtpTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (otpTime === 0) {
      alert("인증번호 시간이 만료되었습니다. 재전송 해주세요.");
    }
  }, [isCodeSent, otpTime]);

  const sendVerificationCode = () => {
    if (!formData.phone) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!validatePhone(formData.phone)) {
      alert("전화번호 형식이 올바르지 않습니다. 예시: 010-1234-5678");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setIsCodeSent(true);
    setIsModalOpen(true);
    setOtpTime(180);
    console.log(`인증번호 발송됨: ${code}`);
    alert(`인증번호가 발송되었습니다.${code}`);
  };

  const verifyCode = () => {
    if (userInputCode === generatedCode) {
      alert("전화번호 인증이 완료되었습니다.");
      setIsModalOpen(false);
      onNext();
    } else {
      alert("인증번호가 올바르지 않습니다. 다시 입력해주세요.");
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
          subTitle="본인확인은 최초 1회만 필요해요"
          className="mb-[1.87rem]"
        >
          📞
          <br />
          본인확인을 위해
          <br />
          전화번호를 입력해주세요
        </Title>
        <form onSubmit={handlePhoneSubmit}>
          <Input
            type="Phone"
            value={formData.phone}
            onChange={(val) => updateFormData("phone", val)}
          />
          <Button type="submit">인증번호 발송</Button>
        </form>
        {isCodeSent && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="flex flex-col">
              <h1 className="text-[1.38rem] mb-[3.43rem] text-center leading-[1.75rem] font-bold">
                문자메시지로 전송 받은
                <br />
                인증번호를 입력해주세요
              </h1>
              <Input
                type="Otp"
                value={userInputCode}
                onChange={(val) => setUserInputCode(val)}
                otpTime={otpTime}
              />
              <button
                className="mt-[0.81rem] text-[0.81rem] leading-[1.75rem] text-[#717171] underline self-end"
                onClick={() => {
                  sendVerificationCode();
                }}
              >
                인증번호 재전송
              </button>

              <Button type="button" onClick={verifyCode}>
                입력 완료
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Step2;
