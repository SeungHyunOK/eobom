import CenterHeader from "../../../components/common/CenterHeader";
import NavBar from "../../../components/common/NavBar";


function ChatList() {
  return (
    <div className="h-full flex flex-col font-pre select-none">
      <CenterHeader text="채팅" prev={false} />
      {/* <div className="h-full flex justify-center">
        <div className="flex flex-col justify-center items-center gap-[20px] text-[20px] text-[#9C9898] font-bold">
          <img src="/assets/icons/speech-balloon.svg" />
          아직 채팅 내역이 없어요
        </div>
      </div> */}
      <div className="flex justify-between p-[20px] border-b border-b-[#D4D2D2]">
        <div className=" flex justify-between items-center gap-[16px]">
          <div className="w-[50px] h-[50px] bg-[#9C9898] rounded-full" />
          <div className="flex flex-col">
            <p className="text-[15px] text-[#181818] font-bold">김누구 보호사</p>
            <p className="text-[10px] text-[#717171] font-semibold">김누구 어르신 {"(이어봄방문요양센터)"}</p>
            <p className="text-[13px] text-[#181818] font-semibold">문자 내용</p>
            <p className="text-[13px] text-[#181818] font-semibold">문자 내용</p>
          </div>
        </div>
        <p className="text-[10px] text-[#9C9898] font-semibold">오전 09:00</p>
      </div>
      <div className="flex justify-between p-[20px] border-b border-b-[#D4D2D2]">
        <div className=" flex justify-between items-center gap-[16px]">
          <div className="w-[50px] h-[50px] bg-[#9C9898] rounded-full" />
          <div className="flex flex-col">
            <p className="text-[15px] text-[#181818] font-bold">김누구 보호사</p>
            <p className="text-[10px] text-[#717171] font-semibold">김누구 어르신 {"(이어봄방문요양센터)"}</p>
            <p className="text-[13px] text-[#181818] font-semibold">문자 내용</p>
            <p className="text-[13px] text-[#181818] font-semibold">문자 내용</p>
          </div>
        </div>
        <p className="text-[10px] text-[#9C9898] font-semibold">오전 09:00</p>
      </div>
      <NavBar center={true} />
    </div>
  );
}

export default ChatList;
