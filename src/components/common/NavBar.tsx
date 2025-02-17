import { useNavigate } from "react-router-dom";
import Space from "./Space";


type NavBarProps = {
  center: boolean,
  current?: number,
}

const NavBar = ({ center, current }: NavBarProps) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  }

  const handleNavigateSeniorManagement = () => {
    navigate("/seniors");
  }

  const handleNavigateChat = () => {
    navigate("/chats");
  }

  const handleNavigateMypage = () => {
    navigate("/mypage");
  }

  const handleNavigateMatching = () => {
    navigate("/matching");
  }

  return (
    <div className="flex flex-col">
      <div className="mt-[79px]" />
      <div className="fixed bottom-[0px] bg-[#FFFFFF] font-pre flex justify-center w-full h-[80px] p-[16px] pb-[10px] border-t-[1px] border-[#D4D2D2]">
        <button className="flex flex-col items-center gap-[4px] w-[50px] h-[50px]" onClick={handleNavigateHome}>
          <img src={`/assets/icons/home${current === 0 ? "-colored" : ""}.svg`} />
          <p className={`text-[10px] ${current === 0 ? "text-[#FF8411]" : "text-[#3C3939]"} font-semibold`}>홈</p>
        </button>
        <Space css="w-[40px]" />
        <button className="flex flex-col items-center gap-[4px] w-[50px] h-[50px]" onClick={center ? handleNavigateSeniorManagement : handleNavigateMatching}>
          <img src={`/assets/icons/${center ? "stats" : "target"}${current === 1 ? "-colored" : ""}.svg`} />
          <p className={`text-[10px] ${current === 1 ? "text-[#FF8411]" : "text-[#3C3939]"} font-semibold`}>{center ? "어르신 관리" : "나의 매칭"}</p>
        </button>
        <Space css="w-[40px]" />
        <button className="flex flex-col items-center gap-[4px] w-[50px] h-[50px]" onClick={handleNavigateChat}>
          <img src={`/assets/icons/chat${current === 2 ? "-colored" : ""}.svg`} />
          <p className={`text-[10px] ${current === 2 ? "text-[#FF8411]" : "text-[#3C3939]"} font-semibold`}>채팅</p>
        </button>
        <Space css="w-[40px]" />
        <button className="flex flex-col items-center gap-[4px] w-[50px] h-[50px]" onClick={handleNavigateMypage}>
          <img src="/assets/icons/person.svg" />
          <p className="text-[10px] text-[#3C3939] font-semibold">마이페이지</p>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
