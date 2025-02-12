import { useState } from "react";
import ProgressBar from "../../../components/common/ProgressBar";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import FormTitle from "../../../components/common/FormTitle";
import Explanation from "../../../components/common/Explanation";
import Input from "../../../components/common/Input";
import Space from "../../../components/common/Space";
import CheckButton from "../../../components/common/CheckButton";
import BottomSheet from "../../../components/common/BottomSheet";
import { useDaumPostcodePopup } from "react-daum-postcode";
import Label from "../../../components/common/Label";


function Signup() {
  const [step, setStep] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userIdValidation, setUserIdValidation] = useState<boolean | null>(null);
  const [userPasswordValidation, setUserPasswordValidation] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");
  const [centerAddress, setCenterAddress] = useState<string>("");
  const [centerAddressDetail, setCenterAddressDetail] = useState<string>("");
  const [centerName, setCenterName] = useState<string>("");
  const [centerOwnerName, setCenterOwnerName] = useState<string>("");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  const [showerTruck, setShowerTruck] = useState<boolean | null>(null);
  const [centerRating, setCenterRating] = useState<number | null>(null);
  const openSearchAddress = useDaumPostcodePopup();

  const TOTAL = 5;

  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    setUserIdValidation(null);
  }

  const handleChangeUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, ""));
    setUserPasswordValidation(null);
  }

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }

  const handleChangeUserPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value.replace(/[^0-9]/g, "");
    if (phone.length <= 7) {
      setUserPhoneNumber(phone.replace(/^(\d{3})(\d{1,4})$/, "$1-$2"));
    }
    else if (phone.length <= 11) {
      setUserPhoneNumber(phone.replace(/^(\d{3})(\d{4})(\d{1,4})$/, "$1-$2-$3"));
    }
  }

  const handleSendAuthCode = (value: boolean) => {
    setOpenBottomSheet(value);
  }

  const handleChangeCenterAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCenterAddressDetail(e.target.value);
  }

  const handleChangeCenterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCenterName(e.target.value);
  }

  const handleChangeRegistrationNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationNumber(e.target.value);
  }

  const handleChangeCenterOwnerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCenterOwnerName(e.target.value);
  }

  const handleClickDone = () => {
    setStep(prev => prev + 1);
  }

  const handleClickPrev = () => {
    if (step <= 0) return;
    setStep(prev => prev - 1);
  }

  const handleCheckValidation = () => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).+$/;
    console.log(userPassword);
    if (!regex.test(userPassword)) {
      setUserPasswordValidation(false);
      return;
    }
    handleClickDone();
  }

  const CloseButton = (resetData: () => void) => {
    return (
      <button onClickCapture={(e) => { e.stopPropagation(); e.preventDefault(); resetData(); }}>
        <img src="/assets/icons/close-bold-small.svg" />
      </button>
    );
  }

  const BodyComponent = () => {
    switch (step) {
      case 0:
        return (
          <div className="h-full flex flex-col h-full ">
            <div className="flex-1">
              <Space css={"h-[36px]"} />
              <img className="w-[24px]" src="/assets/images/key.png" />
              <FormTitle content={<>사용하실 아이디와<br />비밀번호를 입력해주세요"</>} />
              <Space css={"h-[46px]"} />
              <Input type="id" label="아이디" placeholder="아이디를 입력해주세요" value={userId} onChange={handleChangeUserId} />
              <Space css={"h-[6px]"} />
              {
                userIdValidation === false ?
                  <p className="text-[13px] text-[#FF8411] font-semibold">
                    다른 아이디를 사용해주세요
                  </p>
                  : <Space css="h-[19px]" />
              }
              <Space css={"h-[14px]"} />
              <Input type="password" label="비밀번호" placeholder="비밀번호를 입력해주세요" value={userPassword} onChange={handleChangeUserPassword} />
              <Space css={"h-[6px]"} />
              {
                userPasswordValidation === false ?
                  <p className="text-[13px] text-[#FF8411] font-semibold">
                    영문, 숫자, 특수기호 3가지를 포함해주세요
                  </p>
                  : <Space css="h-[19px]" />
              }
            </div>
            <Button text="입력 완료" onClick={handleCheckValidation} disabled={!userId || !userPassword || userIdValidation === false || userPasswordValidation === false} />
          </div>
        );
      case 1:
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <Space css={"h-[36px]"} />
              <img className="w-[24px]" src="/assets/images/waving-hand.png" />
              <FormTitle content={<>반갑습니다, 관리자님!<br />관리자님의 성함을 입력해주세요</>} />
              <Space css={"h-[14px]"} />
              <Explanation text="가입을 위해서 관리자님의 기본 인적사항이 필요해요" />
              <Space css={"h-[46px]"} />
              <Input type="text" placeholder="예시 ) 홍길동" value={userName} onChange={handleChangeUserName} />
            </div>
            <Button text="입력 완료" onClick={handleClickDone} disabled={!userName} />
          </div >
        );
      case 2:
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <Space css={"h-[36px]"} />
              <img className="w-[24px]" src="/assets/images/telephone.png" />
              <FormTitle content={<>본인확인을 위해<br />전화번호를 입력해주세요</>} />
              <Space css={"h-[14px]"} />
              <Explanation text="본인확인은 최초 1회만 필요해요" />
              <Space css={"h-[46px]"} />
              <Input type="text" placeholder="예시 ) 010-1234-5678" value={userPhoneNumber} onChange={handleChangeUserPhoneNumber} />
            </div>
            <Button text="인증번호 발송" onClick={() => handleSendAuthCode(true)} disabled={!userPhoneNumber} />
            {
              openBottomSheet ?
                <BottomSheet start={Date.now()} close={() => handleSendAuthCode(false)} />
                : null
            }
          </div>
        );
      case 3:
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <Space css={"h-[36px]"} />
              <img className="w-[24px]" src="/assets/images/house.png" />
              <FormTitle content={<>소속 확인을 위해<br />센터의 주소를 입력해주세요</>} />
              <Space css={"h-[14px]"} />
              <Explanation text="1개의 센터로 여러 명이 가입할 수 있어요" />
              <Space css={"h-[46px]"} />
              <Input type="text" placeholder="예시 ) 효자로 12, 세종로 1-57" value={centerAddress} onClick={() => openSearchAddress({ onComplete: (data) => setCenterAddress(data.address) })} suffix={centerAddress ? CloseButton(() => setCenterAddress("")) : null} />
              {
                centerAddress ?
                  <>
                    <Space css={"h-[28px]"} />
                    <Input type="text" placeholder="동, 호수 등 상세주소 입력" value={centerAddressDetail} onChange={handleChangeCenterAddressDetail} suffix={centerAddressDetail ? CloseButton(() => setCenterAddressDetail("")) : null} />
                    <Space css={"h-[28px]"} />
                    <Input type="text" placeholder="센터 이름 입력" value={centerName} onChange={handleChangeCenterName} suffix={centerName ? CloseButton(() => setCenterName("")) : null} />
                  </>
                  : null
              }
            </div>
            <Button text="입력 완료" onClick={handleClickDone} disabled={!centerAddress} />
          </div>
        );
      case 4:
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <Space css={"h-[36px]"} />
              <img className="w-[24px]" src="/assets/images/check-mark.png" />
              <FormTitle content={<>소속 센터 검증을 위해<br />몇 가지 정보가 필요해요</>} />
              <Space css={"h-[14px]"} />
              <Explanation text="안전한 구인구직을 위해 사업자 여부를 확인할게요" />
              <Space css={"h-[24px]"} />
              <Input type="text" label="사업자등록번호" placeholder="예시 ) 1234567890" value={registrationNumber} onChange={handleChangeRegistrationNumber} suffix={centerAddress ? CloseButton(() => setRegistrationNumber("")) : null} />
              <Space css={"h-[28px]"} />
              <Input type="text" label="대표자 성명" placeholder="예시 ) 홍길동" value={centerOwnerName} onChange={handleChangeCenterOwnerName} suffix={centerOwnerName ? CloseButton(() => setCenterOwnerName("")) : null} />
              <Space css={"h-[28px]"} />
              <Input type="text" label="개원 일자" placeholder="YY.MM.DD" value={""} />
            </div>
            <Button text="입력 완료" onClick={handleClickDone} disabled={false} />
          </div>
        );
      case 5:
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <Space css={"h-[36px]"} />
              <img className="w-[24px]" src="/assets/images/memo.png" />
              <FormTitle content={<>매칭 확률을 높이기 위하여<br />추가 정보를 입력해주세요</>} />
              <Space css={"h-[14px]"} />
              <Explanation text="구직자가 궁금해하는 정보예요" />
              <Space css={"h-[46px]"} />
              <Label text="센터 등급" />
              <Space css={"h-[18px]"} />
              <CheckButton text="A등급" width="w-[70px]" onClick={() => setCenterRating(0)} checked={centerRating === 0} />
              <CheckButton text="B등급" width="w-[70px]" onClick={() => setCenterRating(1)} checked={centerRating === 1} />
              <CheckButton text="C등급" width="w-[70px]" onClick={() => setCenterRating(2)} checked={centerRating === 2} />
              <CheckButton text="D등급" width="w-[70px]" onClick={() => setCenterRating(3)} checked={centerRating === 3} />
              <Space css={"h-[34px]"} />
              <Label text="목욕 차량 소유 여부" />
              <Space css={"h-[18px]"} />
              <CheckButton text="네" width="w-[110px]" onClick={() => setShowerTruck(true)} checked={showerTruck === true} />
              <CheckButton text="아니오" width="w-[110px]" onClick={() => setShowerTruck(false)} checked={showerTruck === false} />
            </div>
            <Button text="회원가입 완료" onClick={handleClickDone} disabled={showerTruck === null || centerRating === null} />
          </div>
        );
    }
  }

  if (step <= 5) {
    return (
      <div className="flex flex-col justify-center font-pre h-full p-[20px]">
        <Space css={"h-[28px]"} />
        <div className="flex justify-center">
          <img className="absolute left-[20px] cursor-pointer" src="/assets/icons/past.svg" onClick={handleClickPrev} />
          <Title text="회원가입" />
        </div>
        <Space css={"h-[16px]"} />
        <ProgressBar width={step <= 0 ? "w-[0px]" : `w-${step}/${TOTAL}`} />
        {
          BodyComponent()
        }
      </div>
    );
  }

  return (
    <div className="flex flex-col font-pre h-full p-[20px]">
      <div className="flex flex-col justify-center flex-1 ">
        <FormTitle content={<>이어봄 회원가입이<br />완료되었어요!</>} align="text-center" />
        <FormTitle content={<>이제 어르신 정보를 등록하고<br />보호사 구인을 할 수 있어요</>} align="text-center" />
      </div>
      <p className="text-[13px] text-[#918686] underline underline-offset-2 text-center">
        다음에 입력할게요
      </p>
      <Space css={"h-[8px]"} />
      <Button text="어르신 정보 등록하기" onClick={() => { }} disabled={false} />
    </div >
  );
}

export default Signup;
