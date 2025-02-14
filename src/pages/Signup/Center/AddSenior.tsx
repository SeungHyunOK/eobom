import { useState } from "react";
import ProgressBar from "../../../components/common/ProgressBar";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import FormTitle from "../../../components/common/FormTitle";
import Explanation from "../../../components/common/Explanation";
import Input from "../../../components/common/Input";
import Space from "../../../components/common/Space";
import CheckButton from "../../../components/common/CheckButton";
import { useDaumPostcodePopup } from "react-daum-postcode";
import Label from "../../../components/common/Label";


function AddSenior() {

  const [step, setStep] = useState<number>(0);
  const [seniorName, setSeniorName] = useState<string>("");
  const [seniorBirthday, setSeniorBirthday] = useState<string>("");
  const [seniorGender, setSeniorGender] = useState<number | null>(null);
  const [seniorRating, setSeniorRating] = useState<number | null>(null);
  const [seniorAddress, setSeniorAddress] = useState<string>("");
  const [seniorAddressDetail, setSeniorAddressDetail] = useState<string>("");
  const openSearchAddress = useDaumPostcodePopup();

  const handleChangeSeniorName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeniorName(e.target.value);
  }

  const handleChangeSeniorBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value.replace(/[^0-9]/g, "");
    if (date.length <= 4) {
      setSeniorBirthday(date.replace(/^(\d{2})(\d{1,2})$/, "$1.$2"));
    }
    else if (date.length <= 6) {
      setSeniorBirthday(date.replace(/^(\d{2})(\d{2})(\d{1,2})$/, "$1.$2.$3"));
    }
  }

  const handleChangeSeniorAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeniorAddressDetail(e.target.value);
  }

  const handleClickDone = () => {
    setStep(prev => prev + 1);
  }

  const handleClickPrev = () => {
    if (step <= 0) return;
    setStep(prev => prev - 1);
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
            <ProgressBar width={"w-[0px]"} />
            <div className="flex-1">
              <Space css={"h-[36px]"} />
              <img className="w-[24px]" src="/assets/images/waving-hand.png" />
              <FormTitle content={<>매칭을 위한<br />어르신 정보 입력을 시작할게요</>} />
              <Space css={"h-[14px]"} />
              <Explanation text="정확한 매칭을 위해 꼼꼼히 작성해주세요" />
              <Space css={"h-[34px]"} />
              <Input type="text" label="이름" placeholder="예시 ) 홍길동" value={seniorName} onChange={handleChangeSeniorName} />
              <Space css={"h-[20px]"} />
              <Input type="tel" label="생년월일" placeholder="예시 ) 01.01.01" value={seniorBirthday} onChange={handleChangeSeniorBirthday} />
              <Space css={"h-[18px]"} />
              <Label text="성별" />
              <Space css={"h-[18px]"} />
              <div className="flex gap-[8px] flex-wrap">
                <CheckButton icon={<img className="w-[18px] mr-[6px]" src="/assets/images/man.png" />} text="남성" width="w-[88px]" height="h-[50px]" onClick={() => setSeniorGender(0)} checked={seniorGender === 0} />
                <CheckButton icon={<img className="w-[18px] mr-[6px]" src="/assets/images/person.png" />} text="여성" width="w-[88px]" height="h-[50px]" onClick={() => setSeniorGender(1)} checked={seniorGender === 1} />
              </div>
              <Space css={"h-[34px]"} />
              <Label text="장기요양등급" />
              <Space css={"h-[18px]"} />
              <div className="flex gap-[8px] flex-wrap">
                <CheckButton text="1등급" width="w-[70px]" height="h-[34px]" onClick={() => setSeniorRating(1)} checked={seniorRating === 1} />
                <CheckButton text="2등급" width="w-[70px]" height="h-[34px]" onClick={() => setSeniorRating(2)} checked={seniorRating === 2} />
                <CheckButton text="3등급" width="w-[70px]" height="h-[34px]" onClick={() => setSeniorRating(3)} checked={seniorRating === 3} />
                <CheckButton text="4등급" width="w-[70px]" height="h-[34px]" onClick={() => setSeniorRating(4)} checked={seniorRating === 4} />
                <CheckButton text="5등급" width="w-[70px]" height="h-[34px]" onClick={() => setSeniorRating(5)} checked={seniorRating === 5} />
                <CheckButton text="인지지원 등급" width="w-[126px]" height="h-[34px]" onClick={() => setSeniorRating(0)} checked={seniorRating === 0} />
              </div>
            </div>
            <Button text="입력 완료" onClick={handleClickDone} disabled={!seniorName || !seniorBirthday || seniorGender === null || seniorRating === null} />
          </div>
        );
      case 1:
        return (
          <div className="h-full flex flex-col">
            <ProgressBar width={"w-1/2"} />
            <div className="flex-1">
              <Space css={"h-[36px]"} />
              <img className="w-[24px]" src="/assets/images/house.png" />
              <FormTitle content={<>어르신의<br />실 거주지를 입력해주세요</>} />
              <Space css={"h-[14px]"} />
              {
                seniorAddress
                  ? <Explanation text="주소지는 언제든 수정할 수 있어요" />
                  : <Explanation text="매칭이 완료된 보호사만 주소를 볼 수 있어요" />
              }
              <Space css={"h-[46px]"} />
              <Input type="text" placeholder="예시 ) 효자로 12, 세종로 1-57" value={seniorAddress} onClick={() => openSearchAddress({ onComplete: (data) => setSeniorAddress(data.address) })} suffix={seniorAddress ? CloseButton(() => setSeniorAddress("")) : null} />
              {
                seniorAddress ?
                  <>
                    <Space css={"h-[28px]"} />
                    <Input type="text" placeholder="동, 호수 등 상세주소 입력" value={seniorAddressDetail} onChange={handleChangeSeniorAddressDetail} suffix={seniorAddressDetail ? CloseButton(() => setSeniorAddressDetail("")) : null} />
                  </>
                  : null
              }
            </div>
            <Button text="입력 완료" onClick={handleClickDone} disabled={!seniorAddress} />
          </div >
        );
      case 2:
        return (
          <div className="h-full flex flex-col">
            <ProgressBar width={"w-2/2"} />
            <div className="h-full flex flex-col flex-1">
              <Space css={"h-[36px]"} />
              <img className="w-[24px]" src="/assets/images/camera.png" />
              <FormTitle content={<>어르신 사진을 등록해주세요</>} />
              <Space css={"h-[80px]"} />
              <div className="flex w-full justify-center cursor-pointer">
                <div className="w-[180px] h-[180px] bg-[#D4D2D2] rounded-[30px]">
                  <div className="relative top-[157px] left-[157px] flex justify-center items-center w-[46px] h-[46px] bg-[#FAF9F9] rounded-[50%] shadow-md">
                    <img src="/assets/icons/camera.svg"></img>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[13px] text-[#918686] underline underline-offset-2 text-center cursor-pointer" onClick={handleClickDone}>
              다음에 등록할게요
            </p>
            <Space css={"h-[8px]"} />
            <Button text="어르신 정보 등록 완료" onClick={() => { }} disabled={true} />
          </div>
        );
    }
  }

  if (step <= 2) {
    return (
      <div className="flex flex-col justify-center font-pre h-full p-[20px] select-none">
        <Space css={"h-[28px]"} />
        <div className="flex justify-center">
          <img className="absolute left-[20px] cursor-pointer" src="/assets/icons/past.svg" onClick={handleClickPrev} />
          <Title text="어르신 정보" />
        </div>
        <Space css={"h-[16px]"} />
        {
          BodyComponent()
        }
      </div>
    );
  }

  return (
    <div className="flex flex-col font-pre h-full p-[20px] select-none">
      <div className="flex flex-col justify-center flex-1 ">
        <FormTitle content={<>구인 정보를 등록하면<br />즉시 매칭을 받을 수 있어요</>} align="text-center" />
      </div>
      <p className="text-[13px] text-[#918686] underline underline-offset-2 text-center cursor-pointer">
        홈으로
      </p>
      <Space css={"h-[8px]"} />
      <Button text="어르신 구인 정보 등록하기" onClick={() => { }} disabled={false} />
    </div >
  );
}

export default AddSenior;
