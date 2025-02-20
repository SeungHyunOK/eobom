import * as React from "react";
import Button from "../../../../components/common/Caregiver/Button";
import Link from "../../../../assets/images/Link.jpg";

interface Step14Props {
  Done: () => void;
}

const Step14: React.FC<Step14Props> = ({ Done }) => {
  return (
    <>
      <div className="w-[150px] h-[150px] mx-auto mt-[240px] mb-[69px] justify-center items-center inline-flex overflow-hidden">
        <img className="w-[150px] h-[150px]" src={Link} alt="chain" />
      </div>
      <div className="text-center text-[#181818] text-2xl font-bold leading-[30px]">
        이제 케어할 어르신을
        <br />
        매칭받을 수 있어요!
      </div>
      <Button onClick={Done}>홈으로</Button>
    </>
  );
};

export default Step14;
