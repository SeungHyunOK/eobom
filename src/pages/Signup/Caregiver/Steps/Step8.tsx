// src/components/Steps/Step8.tsx
import * as React from "react";
import SignupHeader from "../../../../components/common/Caregiver/SignupHeader";
import Progress from "../../../../components/common/Caregiver/Progress";
import Title from "../../../../components/common/Caregiver/Title";
import Button from "../../../../components/common/Caregiver/Button";
import Plus from "../../../../assets/icons/plus.svg";
import Calendar from "../../../../assets/icons/calendar.svg";
import Calendar_bold from "../../../../assets/icons/calendar-bold.svg";
import Input from "../../../../components/common/Caregiver/Input";
import InputMask from "react-input-mask";

interface Step8Props {
  updateFormData: (field: "extraInfo2", value: string) => void;
  goBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

// 개별 경력 정보를 담는 인터페이스
interface Experience {
  id: number;
  comName: string;
  startDate: string;
  endDate: string;
  content: string;
}

const Step8: React.FC<Step8Props> = ({
  updateFormData,
  goBack,
  onNext,
  currentStep,
  totalSteps,
}) => {
  // "경력추가하기" 화면 vs "경력사항 입력" 화면을 구분하는 상태
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  // 개별 입력값 상태 (회사명, 입사/퇴사 연월, 업무내용)
  const [comName, setComName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [content, setContent] = React.useState("");

  // 여러 경력을 담을 배열 상태
  const [experiences, setExperiences] = React.useState<Experience[]>([]);

  // 현재 수정 중인 경험의 인덱스 (없으면 null)
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  // 새 ID를 간단히 생성하는 헬퍼(실제로는 uuid나 서버 생성 ID를 쓰기도 함)
  const generateId = React.useCallback(() => {
    return Date.now() + Math.floor(Math.random() * 1000);
  }, []);

  /**
   * 경력 추가/수정 폼 제출
   * - editingIndex가 null이면 새 경력 추가
   * - editingIndex가 있으면 해당 항목을 업데이트
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (
      !comName.trim() ||
      !startDate.trim() ||
      !endDate.trim() ||
      !content.trim()
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (editingIndex === null) {
      // 새 경력 추가
      const newExp: Experience = {
        id: generateId(),
        comName,
        startDate,
        endDate,
        content,
      };
      setExperiences((prev) => [...prev, newExp]);
    } else {
      // 기존 경력 수정
      setExperiences((prev) =>
        prev.map((exp, index) =>
          index === editingIndex
            ? { ...exp, comName, startDate, endDate, content }
            : exp
        )
      );
    }

    // 입력창 닫기 & 입력값 초기화
    setIsAddOpen(false);
    setEditingIndex(null);
    setComName("");
    setStartDate("");
    setEndDate("");
    setContent("");
  };

  /**
   * 경력 수정 버튼
   * - experiences[index]의 데이터를 폼에 세팅 후 isAddOpen = true
   */
  const handleEdit = (index: number) => {
    const target = experiences[index];
    setEditingIndex(index);
    setComName(target.comName);
    setStartDate(target.startDate);
    setEndDate(target.endDate);
    setContent(target.content);
    setIsAddOpen(true);
  };

  /**
   * 경력 삭제 버튼
   * - 해당 항목만 필터링해서 제거
   */
  const handleDelete = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = async () => {
    updateFormData("extraInfo2", JSON.stringify(experiences));
    onNext();
  };

  return (
    <>
      {/* 경력 목록 화면 */}
      {!isAddOpen && (
        <>
          <SignupHeader step={currentStep} goBack={goBack}>
            추가정보
          </SignupHeader>
          <Progress currentStep={currentStep} totalSteps={totalSteps} />

          <div className="mx-[1.43rem]">
            <Title
              className="mb-[1.43rem]"
              subTitle="방문 요양과 유관한 근무 경력을 위주로 작성해주세요"
            >
              🏥
              <br />
              경력 사항 확인을 위해
              <br />
              근무 이력을 추가해주세요
            </Title>

            {/* 등록된 경력 목록 표시 */}
            <div className="mb-4">
              {experiences.length === 0 ? (
                <p className="text-[#717171] mb-2">등록된 경력이 없습니다.</p>
              ) : (
                experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="border border-[#FF8411] rounded-md p-2 mb-2 text-[#717171]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-black">{exp.comName}</p>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="text-sm text-blue-500"
                          onClick={() => handleEdit(index)}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          className="text-sm text-red-500"
                          onClick={() => handleDelete(index)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 text-sm">
                      {exp.startDate} ~ {exp.endDate}
                    </p>
                    <p className="mt-1 text-sm">{exp.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* "경력 추가하기" & 최종 "입력완료" 버튼 */}
            <form className="flex flex-col items-center justify-center w-full">
              <div className="relative w-full mb-4">
                <img
                  src={Plus}
                  alt="plus"
                  className="w-[1.25rem] h-[1.25rem] absolute top-1/2 left-[1.06rem] transform -translate-y-1/2"
                />
                <button
                  type="button"
                  onClick={() => {
                    // 새 경력 추가 모드로 전환 (editingIndex를 null)
                    setEditingIndex(null);
                    setIsAddOpen(true);
                    setComName("");
                    setContent("");
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="bg-[#FAF9F9] flex justify-start rounded-[0.62rem] active:bg-[#FF8411] w-full px-[3.25rem] pr-[1.06rem] py-[0.62rem] text-lg text-[#717171] font-bold leading-[1.88rem]"
                >
                  경력 추가하기
                </button>
              </div>
              <Button type="button" onClick={handleFinalSubmit}>
                입력완료
              </Button>
            </form>
          </div>
        </>
      )}

      {/* 경력사항 입력/수정 화면 */}
      {isAddOpen && (
        <>
          <SignupHeader
            step={currentStep}
            goBack={() => {
              setIsAddOpen(false);
            }}
          >
            경력사항
          </SignupHeader>
          <form
            className="mx-[1.56rem] flex flex-col mt-[2rem]"
            onSubmit={handleSubmit}
          >
            <Input
              label="회사명"
              placeholder="예시 ) 이어봄요양센터"
              type="text"
              onChange={setComName}
              value={comName}
              className="mb-[2.88rem] font-semibold"
            />

            {/* 재직기간 */}
            <div className="flex flex-col mb-[2.94rem]">
              <label className="mb-[1.06rem] font-bold leading-[1.88rem] text-[1.25rem]">
                재직기간
              </label>
              <div className="flex items-center justify-start">
                {/* 입사연월 */}
                <div className="relative inline-block mr-2">
                  <img
                    src={startDate.trim() ? Calendar_bold : Calendar}
                    alt="calendar"
                    className="absolute w-[1.5rem] h-[1.5rem] text-gray-400 left-0 top-0"
                  />
                  <InputMask
                    mask="99.99"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        required
                        type="text"
                        placeholder="YY.MM"
                        className={`w-[6.44rem] text-right py-[0.06rem] text-[1.19rem] pl-[1.94rem] pr-[0.19rem] border-b-2 focus:outline-none ${
                          startDate.trim()
                            ? "border-[#181818]"
                            : "border-[#ccc]"
                        } focus:border-[#181818]`}
                      />
                    )}
                  </InputMask>
                </div>
                ~ {/* 구분자 */}
                {/* 퇴사연월 */}
                <div className="relative inline-block ml-2">
                  <img
                    src={endDate.trim() ? Calendar_bold : Calendar}
                    alt="calendar"
                    className="absolute w-[1.5rem] h-[1.5rem] text-gray-400 left-0 top-0"
                  />
                  <InputMask
                    mask="99.99"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        required
                        type="text"
                        placeholder="YY.MM"
                        className={`w-[6.44rem] top-0 pl-[1.94rem] text-right text-[1.19rem] pr-[0.19rem] border-b-2 focus:outline-none ${
                          endDate.trim() ? "border-[#181818]" : "border-[#ccc]"
                        } focus:border-[#181818]`}
                      />
                    )}
                  </InputMask>
                </div>
              </div>
            </div>

            {/* 업무내용 */}
            <label className="mb-[0.81rem] font-bold leading-[1.88rem] text-[1.25rem]">
              업무내용
            </label>
            <textarea
              value={content}
              required
              maxLength={100}
              onChange={(e) => setContent(e.target.value)}
              placeholder="예시 ) 식사 및 양 챙기기, 체위변경 등"
              className={`px-[0.81rem] rounded-[0.31rem] py-[0.69rem] h-40 border-2 focus:outline-none placeholder:text-[#9b9797] text-[1.19rem] font-semibold text-left ${
                content.length > 0 ? "border-[#181818]" : "border-[#d4d1d1]"
              }`}
            />
            <p
              className={`text-right text-[0.81rem] leading-[1.88rem] ${
                content.length === 100 ? "text-red-500" : "text-[#9b9797]"
              }`}
            >
              {content.length}/100
            </p>

            <Button type="submit" className="mt-4">
              {editingIndex === null ? "입력완료" : "수정완료"}
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default Step8;
