import { useEffect, useState } from "react";

interface ProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function Progress({ currentStep, totalSteps }: ProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 만약 currentStep이 1이면 프로그래스는 0%
    // 그 외에는 (currentStep - 1) / (totalSteps - 1) 로 계산하여 1단계를 제외한 나머지 구간에 대해 진행률을 매핑합니다.
    const newProgress =
      currentStep === 1
        ? 0
        : Math.min(((currentStep - 1) / (totalSteps - 1)) * 100, 100);
    setProgress(newProgress);
  }, [currentStep, totalSteps]);

  return (
    <div className="pb-[2.3rem] px-[1.56rem]">
      {/* 프로그래스 바 컨테이너 */}
      <div className="w-full h-[0.13rem] overflow-hidden bg-[#D4D2D2]">
        <div
          className="h-full transition-all duration-300 bg-[#FF8411]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
