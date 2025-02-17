import { useState } from "react";
import Tab from "../../../components/common/Tab";
import Space from "../../../components/common/Space";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { useNavigate } from "react-router-dom";


function Login() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleClickTab = (index: number) => {
    setTabIndex(index);
    setStep(0);
  }

  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }

  const handleChangeUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, ""));
  }

  const handleNavigateSignup = () => {
    if (tabIndex === 1) {
      navigate("/signup/center");
    }
  }

  const handleNavigateHome = () => {
    navigate("/");
  }

  switch (step) {
    default:
    case 0:
      return (
        <div className="h-full flex flex-col items-center font-pre select-none p-[20px]">
          <Tab tabs={["요양보호사", "센터"]} width="w-1/2" current={tabIndex} onClick={handleClickTab} />
          <div className="w-full h-full flex flex-col justify-center items-center p-[20px]">
            <img className="w-[190px]" src="/assets/icons/logo-full.svg" />
            <Space css="h-[100px]" />
            <button className="w-full h-[48px] flex justify-center items-center bg-[#FF8411] rounded-full text-[16px] text-[#FFFFFF] font-extrabold" onClick={handleNavigateSignup}>
              <img className="mr-[6px]" src="/assets/icons/telephone.svg" />
              전화번호로 시작하기
            </button>
            <Space css="h-[12px]" />
            <div className="flex justify-center">
              <button className="text-[13px] text-[#717171] underline underline-offset-2 text-center font-medium" onClick={() => setStep(1)}>
                이미 가입한 적이 있어요
              </button>
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="h-full flex flex-col items-center font-pre select-none p-[20px]">
          <Tab tabs={["요양보호사", "센터"]} width="w-1/2" current={tabIndex} onClick={handleClickTab} />
          <div className="w-full h-full flex flex-col">
            <Space css={"h-[60px]"} />
            <div className="flex justify-center">
              <img className="w-[140px]" src="/assets/icons/logo-login.svg" />
            </div>
            <Space css={"h-[46px]"} />
            <Input type="id" label="아이디" placeholder="아이디를 입력해주세요" value={userId} onChange={handleChangeUserId} />
            <Space css={"h-[6px]"} />
            <Space css={"h-[14px]"} />
            <Input type="password" label="비밀번호" placeholder="비밀번호를 입력해주세요" value={userPassword} onChange={handleChangeUserPassword} />
            <Space css={"h-[6px]"} />
            {
              false
                ? <p className="text-[13px] text-[#FF8411] font-semibold">
                  아이디 혹은 비밀번호를 다시 확인해주세요
                </p>
                : <Space css="h-[19px]" />
            }
          </div>
          <Button text="로그인" onClick={handleNavigateHome} disabled={false} />
        </div>
      );
  }

}

export default Login;
