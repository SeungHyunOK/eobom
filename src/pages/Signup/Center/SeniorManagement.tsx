import { useState } from "react";
import Space from "../../../components/common/Space";
import CenterHeader from "../../../components/common/CenterHeader";
import SeniorSearch from "../../../components/common/SeniorSearch";
import Tab from "../../../components/common/Tab";
import NavBar from "../../../components/common/NavBar";
import SeniorItem from "../../../components/common/SeniorItem";


function SeniorManagement() {
  const [searchText, setSearchText] = useState<string>("");
  const [tapIndex, setTapIndex] = useState<number>(0);

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  const handleClickTap = (index: number) => {
    setTapIndex(index);
  }

  return (
    <div className="flex flex-col justify-center font-pre select-none">
      <CenterHeader text="어르신 관리" prev={true} />
      <div className="flex flex-col justify-center p-[20px] items-center">
        <Tab tabs={["대기", "진행 중", "매칭 완료"]} width="w-1/3" current={tapIndex} onClick={handleClickTap} />
        <Space css="h-[24px]" />
        <SeniorSearch value={searchText} onChange={handleChangeSearchText} />
        <Space css="h-[30px]" />
        {
          tapIndex === 0
            ?
            <>
              <div className="flex w-full p-[16px] bg-[#FAF9F9] gap-[14px] rounded-[10px] shadow-sm">
                <img src="/assets/icons/plus_colored.svg" />
                <p className="text-[18px] text-[#717171] font-bold">어르신 추가하기</p>
              </div>
              <Space css="h-[14px]" />
            </>
            : null
        }
        <SeniorItem state={0} />
        <Space css="h-[14px]" />
        <SeniorItem state={1} />
        <Space css="h-[14px]" />
        <SeniorItem state={2} />
        <Space css="h-[14px]" />
        <SeniorItem state={3} />
        <Space css="h-[14px]" />
        <SeniorItem state={4} />
        <Space css="h-[80px]" />
      </div>
      <NavBar center={true} />
    </div>
  );
}

export default SeniorManagement;
