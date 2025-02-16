type HeaderProps = {
  text: string,
}

const CenterHeader = ({ text }: HeaderProps) => {
  return (
    <div className="flex justify-between items-end w-full h-[90px] p-[24px] pb-[10px] border-b-[1px] border-[#D4D2D2]">
      <div className="flex gap-[12px]">
        <img className="cursor-pointer" src="/assets/icons/past.svg" onClick={() => { }} />
        <p className="text-[20px] text-[#181818] font-medium">{text}</p>
      </div>
      <img className="cursor-pointer" src="/assets/icons/hamburger.svg" onClick={() => { }} />
    </div>
  );
};

export default CenterHeader;
