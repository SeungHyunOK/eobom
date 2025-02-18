type TabProps = {
  tabs: string[],
  width: string,
  current: number,
  onClick: (index: number) => void,
}

const Tab = ({ tabs, width, current, onClick }: TabProps) => {
  return (
    <div className="flex flex-col w-full font-pre text-[18px] font-bold">
      <div className="flex">
        {tabs.map((tab, index) => {
          return (
            <div key={index} className={`flex ${width} flex-col items-center gap-[6px] cursor-pointer`} onClick={() => onClick(index)}>
              <p className={current === index ? "text-[#3C3939]" : "text-[#9C9898]"}>{tab}</p>
              <div className={`relative bottom-[-2px] ${current === index ? "bg-[#FF8411]" : "bg-[#D4D2D2]"} w-full h-[2px]`} />
            </div>
          );
        })}
      </div>
      <div className="bg-[#D4D2D2] w-full h-[2px]" />
    </div>
  );
};

export default Tab;
