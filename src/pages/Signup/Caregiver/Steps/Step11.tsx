import * as React from "react";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";
import Title from "../../../../components/common/Caregiver/Title";
import Button from "../../../../components/common/Caregiver/Button";

interface Step11Props {
  updateFormData: (field: "extraInfo4", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

// 근무 시간 선택을 위한 (요일, 시간) 구조
interface SelectedTime {
  day: string;
  hour: number;
}

const Step11: React.FC<Step11Props> = ({
  updateFormData,
  goBack,
  onNext,
  currentStep,
  totalSteps,
}) => {
  // 요일과 시간대 정의 (예: 9시~21시)
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  // 9~21 포함 (9,10,11,12,13,14,15,16,17,18,19,20,21)
  const hours = Array.from({ length: 21 - 9 + 1 }, (_, i) => i + 9);

  // 선택된 (요일, 시간) 목록을 배열로 관리
  const [selectedTimes, setSelectedTimes] = React.useState<SelectedTime[]>([]);

  // 셀 클릭 시 선택/해제를 토글
  const handleCellClick = (day: string, hour: number) => {
    setSelectedTimes((prev) => {
      const exists = prev.find((t) => t.day === day && t.hour === hour);
      if (exists) {
        // 이미 선택되어 있으면 제거
        return prev.filter((t) => !(t.day === day && t.hour === hour));
      } else {
        // 미선택 상태라면 추가
        return [...prev, { day, hour }];
      }
    });
  };

  // 해당 (요일, 시간)이 선택되었는지 확인
  const isSelected = (day: string, hour: number) =>
    selectedTimes.some((t) => t.day === day && t.hour === hour);

  // 전체 선택 해제 (선택 사항)
  const handleClearAll = () => {
    setSelectedTimes([]);
  };

  // 선택완료 (Submit) 시 부모 컴포넌트로 데이터 전달
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 선택된 시간대를 JSON 문자열로 변환해 저장
    updateFormData("extraInfo4", JSON.stringify(selectedTimes));
    onNext();
  };

  // 시간 표시 (2자리 맞춤 예: 09, 10, 11...)
  const formatHour = (hour: number) => {
    return hour < 10 ? `0${hour}` : `${hour}`;
  };

  return (
    <>
      <SignupHeader step={currentStep} goBack={goBack}>
        희망 근무 조건
      </SignupHeader>
      <Progress currentStep={currentStep} totalSteps={totalSteps} />

      <div className="mx-[1.43rem]">
        <Title
          className="mb-[1.88rem]"
          subTitle="근무 가능 시간이 많을 수록 매칭 확률이 높아져요"
        >
          🕖
          <br />
          근무가 가능한
          <br />
          시간을 모두 선택해주세요
        </Title>
      </div>

      <form onSubmit={handleSubmit} className="px-4">
        {/* 스크롤 영역 */}
        <div className="overflow-x-auto w-[314px] h-[404px] relative">
          <table className="w-full text-center border-collapse">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                {/* 첫 번째 빈 칸 (시간 열 레이블) */}
                <th className="p-2 text-sm"></th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="p-2 text-sm font-bold text-[#717171]"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour}>
                  {/* 시간 표시 열 (오른쪽 정렬) */}
                  <td className="w-4 h-3.5 text-right text-[#9b9797] text-[11px] font-bold leading-[30px] pr-2">
                    {formatHour(hour)}
                  </td>
                  {/* 요일별 셀 */}
                  {days.map((day) => {
                    const selected = isSelected(day, hour);
                    return (
                      <td
                        key={`${day}-${hour}`}
                        onClick={() => handleCellClick(day, hour)}
                        className={`cursor-pointer w-[40px] h-[30px] border transition-colors
                          hover:bg-[#FFF2CC] 
                          ${
                            selected
                              ? "bg-[#FFE599]" // 선택 시 노란색 배경
                              : ""
                          }
                        `}
                      ></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex flex-col items-center mt-4 space-y-2">
          {/* 전체 해제 버튼 (선택 사항) */}
          <button
            type="button"
            onClick={handleClearAll}
            className="text-sm text-[#717171] underline"
          >
            전체 해제
          </button>
          <Button type="submit" className="mt-2">
            선택완료
          </Button>
        </div>
      </form>
    </>
  );
};

export default Step11;
