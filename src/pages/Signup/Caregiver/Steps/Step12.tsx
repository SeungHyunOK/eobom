// src/pages/Signup/Caregiver/Steps/Step12.tsx

import * as React from "react";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";
import Title from "../../../../components/common/Caregiver/Title";
import Button from "../../../../components/common/Caregiver/Button";

// 부모 컴포넌트에서 넘겨받을 props 정의
interface Step12Props {
  updateFormData: (field: "extraInfo5", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

const Step12: React.FC<Step12Props> = ({
  updateFormData,
  goBack,
  onNext,
  currentStep,
  totalSteps,
}) => {
  // 지역 검색어
  const [searchTerm, setSearchTerm] = React.useState("");
  // 검색 결과
  const [searchResults, setSearchResults] = React.useState<string[]>([]);
  // 선택된 지역 목록 (최대 5개)
  const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);

  // 예시용 mock 데이터 (실제로는 API 호출 등을 통해 가져옴)
  const mockData = React.useMemo(
    () => [
      "강원도 강릉시 학동",
      "전라남도 여수시 학동",
      "광주 동구 학동",
      "서울시 노원구 공릉동",
      "서울시 노원구 공릉2동",
      "서울시 노원구 상계동",
      "부산시 해운대구 좌동",
      "부산시 해운대구 우동",
      // 필요하면 더 많은 예시를 추가
    ],
    []
  );

  // 검색어가 변경될 때마다 결과 필터링
  React.useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    // 검색어가 포함된 항목만 필터
    const filtered = mockData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchTerm, mockData]);

  // 지역 선택
  const handleAddArea = (area: string) => {
    // 이미 5개 선택했으면 추가 불가
    if (selectedAreas.length >= 5) {
      alert("최대 5개까지 선택할 수 있습니다.");
      return;
    }
    // 중복 선택 방지
    if (!selectedAreas.includes(area)) {
      setSelectedAreas((prev) => [...prev, area]);
    }
  };

  // 지역 제거
  const handleRemoveArea = (area: string) => {
    setSelectedAreas((prev) => prev.filter((item) => item !== area));
  };

  // 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 선택된 지역 목록을 JSON 문자열로 변환하여 부모 컴포넌트에 저장
    updateFormData("extraInfo5", JSON.stringify(selectedAreas));
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
          className="mb-[1.25rem]"
          subTitle="최대 5개까지 선택할 수 있어요"
        >
          📍
          <br />
          근무가 가능한 지역을
          <br />
          모두 선택해주세요
        </Title>
      </div>

      <form onSubmit={handleSubmit} className="px-[1.43rem] flex flex-col">
        {/* 검색창 */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="동, 읍, 면으로 검색 (예시 : 공릉동)"
            className="w-full border-b-2 focus:border-[#FF8411] outline-none py-2 pl-[33px] placeholder:text-[#9b9797] text-[19px] font-semibold"
          />
          {/* 검색 아이콘 (optional) - 원한다면 위치/이미지 수정 */}
          <svg
            className="absolute w-[22px] h-[22px] text-gray-400 transform translate-y-1/3 left-0 top-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 017 7c0 1.61-.55 3.09-1.47 4.26l4.29 4.28a1 1 0 01-1.42 1.42l-4.28-4.29A7 7 0 1111 4z"
            />
          </svg>
        </div>
        {/* 검색 결과 */}
        {searchTerm && (
          <ul className="mb-4 bg-white border border-[#D4D2D2] rounded-md max-h-48 overflow-y-auto">
            {searchResults.length === 0 ? (
              <li className="p-2 text-sm text-gray-500">
                검색 결과가 없습니다.
              </li>
            ) : (
              searchResults.map((item) => (
                <li
                  key={item}
                  onClick={() => handleAddArea(item)}
                  className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {item}
                </li>
              ))
            )}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 bg-white w-80">
          {selectedAreas.map((area) => (
            <div
              key={area}
              className="relative py-[13px] px-[49px] w-full border border-[#FF8411] rounded-[10px] text-lg font-bold text-[#3b3939]"
            >
              <span>{area}</span>
              <button
                data-svg-wrapper
                className="absolute left-[15px] top-1/2 -translate-y-1/2 translation"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9997 2.16669C8.23301 2.16669 4.33301 6.06669 4.33301 10.8334C4.33301 16.6834 11.9163 23.2917 12.2413 23.6167C12.458 23.725 12.783 23.8334 12.9997 23.8334C13.2163 23.8334 13.5413 23.725 13.758 23.6167C14.083 23.2917 21.6663 16.6834 21.6663 10.8334C21.6663 6.06669 17.7663 2.16669 12.9997 2.16669ZM12.9997 21.3417C10.7247 19.175 6.49967 14.5167 6.49967 10.8334C6.49967 7.25835 9.42467 4.33335 12.9997 4.33335C16.5747 4.33335 19.4997 7.25835 19.4997 10.8334C19.4997 14.4084 15.2747 19.175 12.9997 21.3417ZM12.9997 6.50002C10.6163 6.50002 8.66634 8.45002 8.66634 10.8334C8.66634 13.2167 10.6163 15.1667 12.9997 15.1667C15.383 15.1667 17.333 13.2167 17.333 10.8334C17.333 8.45002 15.383 6.50002 12.9997 6.50002ZM12.9997 13C11.808 13 10.833 12.025 10.833 10.8334C10.833 9.64169 11.808 8.66669 12.9997 8.66669C14.1913 8.66669 15.1663 9.64169 15.1663 10.8334C15.1663 12.025 14.1913 13 12.9997 13Z"
                    fill="#FF8411"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleRemoveArea(area)}
                className="absolute right-[17px] top-1/2 -translate-y-1/2 translation"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 2L12 12"
                    stroke="#FF8411"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 2L2 12"
                    stroke="#FF8411"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <Button type="submit" className="mt-auto mb-4">
          선택 완료
        </Button>
      </form>
    </>
  );
};

export default Step12;
