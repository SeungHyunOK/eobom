import * as React from "react";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";
import Title from "../../../../components/common/Caregiver/Title";
import Button from "../../../../components/common/Caregiver/Button";
import cameraIcon from "../../../../assets/icons/camera.svg";

interface Step9Props {
  updateFormData: (field: "extraInfo3", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

const Step9: React.FC<Step9Props> = ({
  updateFormData,
  goBack,
  onNext,
  currentStep,
  totalSteps,
}) => {
  // 파일과 미리보기 URL을 관리할 로컬 상태
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  // 숨겨진 file input을 참조할 ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // 만약 부모로 base64 등으로 전달하려면, FileReader 사용
      // const reader = new FileReader();
      // reader.onload = () => {
      //   if (reader.result) {
      //     updateFormData("extraInfo3", reader.result.toString());
      //   }
      // };
      // reader.readAsDataURL(file);
    }
  };

  // 최종 제출 시 처리 (간편 이력서 작성 완료)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 필요 시 서버 업로드 or 부모 컴포넌트로 데이터 전달
    onNext();
  };

  return (
    <>
      <SignupHeader step={currentStep} goBack={goBack}>
        추가정보
      </SignupHeader>
      <Progress currentStep={currentStep} totalSteps={totalSteps} />

      <div className="mx-[1.43rem] flex flex-col">
        <Title className="mb-[3.38rem]">
          📷
          <br />
          마지막으로,
          <br />
          프로필 사진을 등록해주세요
        </Title>

        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          {/* 프로필 박스 */}
          <div
            className="w-[172px] h-[172px] relative cursor-pointer"
            onClick={handleImageClick}
          >
            {/* 이미 파일을 선택했다면 미리보기 이미지를 표시, 아니면 기본 SVG/박스 표시 */}
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-[172px] h-[172px] object-cover rounded-[30px]"
              />
            ) : (
              <>
                {/* 배경 박스 */}
                <div className="w-[172px] h-[172px] left-0 top-0 absolute bg-[#f9f8f8] rounded-[30px]" />
                <div
                  data-svg-wrapper
                  className="left-[24px] top-[18px] absolute"
                >
                  <svg
                    width="125"
                    height="135"
                    viewBox="0 0 125 135"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M62.0563 124.753C59.2108 130.808 53.0569 135 45.9238 135C37.3749 135 30.2325 128.979 28.5062 120.946C25.5284 123.183 21.8267 124.509 17.8152 124.509C7.97616 124.509 0 116.533 0 106.694C0 98.5417 5.47518 91.6686 12.9488 89.5511C6.52395 80.3793 2.77126 69.3156 2.77126 57.4047C2.77126 25.701 29.3585 0 62.1554 0C94.9524 0 121.54 25.701 121.54 57.4047C121.54 69.3362 117.774 80.4176 111.329 89.5987C118.718 91.77 124.113 98.6018 124.113 106.694C124.113 116.533 116.136 124.509 106.297 124.509C102.286 124.509 98.5841 123.183 95.6063 120.946C93.88 128.979 86.7376 135 78.1888 135C71.0557 135 64.9017 130.808 62.0563 124.753Z"
                      fill="#D4D2D2"
                    />
                  </svg>
                </div>
                <div className="w-[65.72px] h-[49.29px] left-[53.30px] top-[52.64px] absolute">
                  {/* ...기존 그림 요소들 */}
                  <div className="w-[33.65px] h-[33.65px] left-0 top-0 absolute bg-white rounded-full" />
                  <div className="w-[33.65px] h-[33.65px] left-[32.07px] top-0 absolute bg-white rounded-full" />
                  <div className="w-[23.75px] h-[23.75px] left-[34.44px] top-[4.95px] absolute bg-[#181818] rounded-full" />
                  <div className="w-[23.75px] h-[23.75px] left-[7.32px] top-[4.95px] absolute bg-[#181818] rounded-full" />
                  <div className="w-[27.71px] h-[27.71px] left-[19px] top-[21.58px] absolute bg-[#717171] rounded-full" />
                  <div className="w-[5.94px] h-[5.94px] left-[29.89px] top-[32.46px] absolute bg-[#3b3939] rounded-full" />
                </div>
              </>
            )}

            {/* 카메라 아이콘 (우측 하단) */}
            <div
              className="absolute p-[0.54rem] bg-white border-2 rounded-full bottom-[-0.88rem] right-[-1.38rem]"
              onClick={(e) => {
                e.stopPropagation(); // 부모 div onClick 중첩 방지
                handleImageClick();
              }}
            >
              <img
                src={cameraIcon}
                alt="Camera Icon"
                className="w-[1.69rem] h-[1.69rem]"
              />
            </div>
          </div>

          {/* 실제 파일 입력 (숨김) */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {/* "다음에 등록할게요" 버튼 */}
          <button
            type="button"
            onClick={onNext}
            className="text-[#9b9797] fixed bottom-[4.44rem] left-1/2 -translate-x-1/2 transition text-[0.81rem] font-medium underline leading-7"
          >
            다음에 등록할게요
          </button>

          {/* 최종 제출 (간편 이력서 작성 완료) */}
          <Button type="submit" className="mt-4">
            간편 이력서 작성 완료
          </Button>
        </form>
      </div>
    </>
  );
};

export default Step9;
