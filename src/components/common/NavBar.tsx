import Space from "./Space";


type NavBarProps = {
  center: boolean,
}

const NavBar = ({ center }: NavBarProps) => {
  return (
    <div className="fixed bottom-[0px] bg-[#FFFFFF] font-pre flex justify-center w-full h-[80px] p-[16px] pb-[10px] border-t-[1px] border-[#D4D2D2]">
      <div className="flex flex-col items-center gap-[4px] w-[50px] h-[50px] cursor-pointer">
        <img src="/assets/icons/home.svg" onClick={() => { }} />
        <p className="text-[10px] text-[#3C3939] font-semibold">홈</p>
      </div>
      <Space css="w-[40px]" />
      <div className="flex flex-col items-center gap-[4px] w-[50px] h-[50px] cursor-pointer">
        <img src={`/assets/icons/${center ? "stats" : "target"}.svg`} onClick={() => { }} />
        <p className="text-[10px] text-[#3C3939] font-semibold">{center ? "어르신 관리" : "나의 매칭"}</p>
      </div>
      <Space css="w-[40px]" />
      <div className="flex flex-col items-center gap-[4px] w-[50px] h-[50px] cursor-pointer">
        <img src="/assets/icons/chat.svg" onClick={() => { }} />
        <p className="text-[10px] text-[#3C3939] font-semibold">채팅</p>
      </div>
      <Space css="w-[40px]" />
      <div className="flex flex-col items-center gap-[4px] w-[50px] h-[50px] cursor-pointer">
        <img src="/assets/icons/person.svg" onClick={() => { }} />
        <p className="text-[10px] text-[#3C3939] font-semibold">마이페이지</p>
      </div>
    </div>
  );
};

export default NavBar;
