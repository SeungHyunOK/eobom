import * as React from "react";
import Bookmark from "../../../../assets/images/BookmarkTabs.jpg";
import Confetti from "../../../../assets/images/ConfettiBall.jpg";
import Button from "../../../../components/common/Caregiver/Button";

interface Step6Props {
  goExtra: () => void;
}

const Step6: React.FC<Step6Props> = ({ goExtra }) => {
  const [showConfetti, setShowConfetti] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti ? (
        <div className="flex flex-col text-center items-center pt-[13.75rem]">
          <img
            className="mb-[4.63rem] w-[9.37rem] h-[9.37rem]"
            src={Confetti}
            alt="Confetti"
          />
          <h1 className="text-2xl font-bold leading-[30px]">
            이어봄 회원가입이
            <br />
            완료되었어요!
          </h1>
        </div>
      ) : (
        <div className="flex flex-col text-center items-center pt-[15rem]">
          <img
            className="mb-[2.87rem] w-[9.37rem] h-[9.37rem]"
            src={Bookmark}
            alt="Bookmark"
          />
          <h1 className="text-2xl font-bold leading-[30px]">
            몇 가지 추가 정보를 입력하면
            <br />
            간편 이력서를 작성할 수 있어요
          </h1>
          <button className="fixed border-none bottom-[4.43rem] underline text-[#9b9797] text-[0.81rem] leading-7">
            다음에 입력할게요
          </button>
          <Button onClick={goExtra}>간편 이력서 작성하기</Button>
        </div>
      )}
    </>
  );
};

export default Step6;
