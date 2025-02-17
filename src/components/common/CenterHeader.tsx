type HeaderProps = {
  text?: string,
  prev: boolean,
}

const CenterHeader = ({ text, prev }: HeaderProps) => {
  return (
    <div className="mb-[90px]">
      <div className="fixed top-[0px] font-jal flex justify-between items-end w-full h-[90px] p-[24px] bg-[#FFFFFF] pb-[10px] border-b-[1px] border-[#D4D2D2]">
        <div className="flex gap-[12px]">
          {
            prev
              ? <img className="cursor-pointer" src="/assets/icons/past.svg" onClick={() => { }} />
              : <img className="cursor-pointer" src="/assets/icons/logo.svg" onClick={() => { }} />
          }
          <p className="text-[20px] text-[#181818] font-medium">{text ?? "이어봄"}</p>
        </div>
        <img className="cursor-pointer" src={`/assets/icons/${text === "메뉴" ? "home" : "hamburger"}.svg`} onClick={() => { }} />
      </div>
    </div>
  );
};

export default CenterHeader;
