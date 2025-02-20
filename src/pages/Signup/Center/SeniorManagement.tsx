import { useEffect, useState } from "react";
import Space from "../../../components/common/Space";
import CenterHeader from "../../../components/common/CenterHeader";
import SeniorSearch from "../../../components/common/SeniorSearch";
import Tab from "../../../components/common/Tab";
import NavBar from "../../../components/common/NavBar";
import SeniorItem from "../../../components/common/SeniorItem";
import { useNavigate } from "react-router-dom";
import useMatching from "../../../apis/matching";
import useAuth from "../../../apis/auth";
import useSenior from "../../../apis/senior";


function SeniorManagement() {
  const [seniors, setSeniors] = useState<[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [tabIndex, setTabIndex] = useState<number>(0);
  const navigate = useNavigate();
  const { getManagerMatching } = useMatching();
  const { getAccessToken } = useAuth();
  const { getJobOffer } = useSenior();

  useEffect(() => {

  }, []);

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  const handleClickTap = (index: number) => {
    setTabIndex(index);
  }

  const handleNavigateAddSenior = () => {
    navigate("/seniors/add");
  }

  return (
    <div className="flex flex-col justify-center font-pre select-none">
      <CenterHeader text="어르신 관리" prev={false} />
      <div className="flex flex-col justify-center p-[20px] items-center">
        <Tab tabs={["대기", "진행 중", "매칭 완료"]} width="w-1/3" current={tabIndex} onClick={handleClickTap} />
        <Space css="h-[24px]" />
        <SeniorSearch value={searchText} onChange={handleChangeSearchText} />
        <Space css="h-[30px]" />
        {
          tabIndex === 0
            ? <>
              <button className="flex w-full p-[16px] bg-[#FAF9F9] gap-[14px] rounded-[10px] shadow-sm" onClick={handleNavigateAddSenior}>
                <img src="/assets/icons/plus_colored.svg" />
                <p className="text-[18px] text-[#717171] font-bold">어르신 추가하기</p>
              </button>
              <Space css="h-[14px]" />
            </>
            : null
        }
        <div className="w-full flex flex-col gap-[14px]">
          {
            seniors.map((senior) => {
              return <SeniorItem senior={senior} state={0} />
            })
          }
        </div>
        {/* {tabIndex === 0
          ? <>
            <SeniorItem state={0} />
          </>
          : null
        }
        {tabIndex === 1
          ? <>
            <SeniorItem state={2} />
            <Space css="h-[14px]" />
            <SeniorItem state={1} />
          </>
          : null
        }
        {
          tabIndex === 2
            ? <>
              <SeniorItem state={3} />
              <Space css="h-[14px]" />
              <SeniorItem state={4} />
            </>
            : null
        } */}
        <Space css="h-[80px]" />
      </div>
      <NavBar current={1} />
    </div>
  );
}

export default SeniorManagement;
