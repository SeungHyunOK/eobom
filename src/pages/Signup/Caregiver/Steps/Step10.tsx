import * as React from "react";
import Button from "../../../../components/common/Caregiver/Button";
import memo from "../../../../assets/images/memo.jpg";

interface Step10Props {
  goExtra: () => void;
}
const Step10: React.FC<Step10Props> = ({ goExtra }) => {
  return (
    <>
      <img
        src={memo}
        alt="memo"
        className="mx-auto mt-[15rem] mb-[3.5rem] w-[9.38rem] h-[9.38rem]"
      />
      <div className="text-center text-[#181818] text-2xl font-bold font-['Pretendard'] leading-[30px]">
        거의 다 왔어요!
        <br />
        희망 근무 조건을 입력하면
        <br />
        즉시 매칭을 시작할 수 있어요
      </div>
      <div className="absolute bottom-[4.44rem] left-1/2 -translate-x-1/2 translation text-[#9b9797] text-[13px] font-medium font-['Pretendard'] underline leading-7">
        다음에 입력할게요
      </div>
      <Button onClick={goExtra}>희망 근무 조건 입력하기</Button>
    </>
  );
};

export default Step10;
