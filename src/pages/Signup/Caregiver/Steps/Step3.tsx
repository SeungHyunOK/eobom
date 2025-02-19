import * as React from "react";
import Input from "../../../../components/common/Caregiver/Input";
import Title from "../../../../components/common/Caregiver/Title";
import Button from "../../../../components/common/Caregiver/Button";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";
import AddressSearchPage from "../common/AddressSearchPage";
import icon_past from "../../../../assets/icons/past.svg";

interface Step3Props {
  formData: {
    address: string;
    addressDetail: string;
  };
  updateFormData: (field: "address" | "addressDetail", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

const Step3: React.FC<Step3Props> = ({
  formData,
  updateFormData,
  goBack,
  onNext,
  currentStep,
  totalSteps,
}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const openAddressSearch = () => {
    setIsSearchOpen(true);
  };

  const handleAddressSelect = (selectedAddress: string) => {
    updateFormData("address", selectedAddress);
    setIsSearchOpen(false);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address) {
      alert("주소를 선택해주세요.");
      return;
    }
    if (!formData.addressDetail) {
      alert("상세 주소를 입력해주세요.");
      return;
    }
    onNext();
  };

  return (
    <>
      {!isSearchOpen && (
        <>
          <SignupHeader step={currentStep} goBack={goBack}>
            회원가입
          </SignupHeader>
          <Progress currentStep={currentStep} totalSteps={totalSteps} />
          <div className="px-[1.56rem] flex flex-col">
            <Title
              subTitle="주소지는 언제든 수정할 수 있어요"
              className="mb-[3.18rem]"
            >
              🏠
              <br />
              근무지 추천을 위해
              <br />
              주소를 입력해주세요
            </Title>
            {/* 주소 입력 영역 */}
            <form className="flex flex-col" onSubmit={handleNext}>
              <div onClick={openAddressSearch}>
                <Input
                  type="Address"
                  value={formData.address}
                  onChange={(val) => updateFormData("address", val)}
                />
              </div>
              {/* 주소가 선택되면 상세 주소 입력 필드 표시 */}
              {formData.address && (
                <Input
                  type="text"
                  className="mt-[1.5rem]"
                  placeholder="동, 호수 등 상세주소 입력"
                  value={formData.addressDetail}
                  onChange={(val) => updateFormData("addressDetail", val)}
                />
              )}
              <Button type="submit">입력완료</Button>
            </form>
          </div>
        </>
      )}
      {isSearchOpen && (
        <>
          <div className="relative flex justify-center items-center pt-[3rem] pb-[1.06rem] px-[1.4rem]">
            <button
              onClick={() => {
                setIsSearchOpen(false);
              }}
              className="absolute left-[1.4rem] w-[1.25rem] h-[1.25rem]"
            >
              <img src={icon_past} alt="뒤로가기" />
            </button>
            <h1 className="text-[1.25rem] font-bold">우편번호 검색</h1>
          </div>
          <AddressSearchPage onSelect={handleAddressSelect} />
        </>
      )}
    </>
  );
};

export default Step3;
