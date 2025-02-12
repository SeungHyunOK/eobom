type ButtonProps = {
  text: string,
  width: string,
  onClick: () => void,
  checked: boolean,
}

const CheckButton = ({ text, width, onClick, checked }: ButtonProps) => {
  return (
    <button className={`${width} h-[34px] ${checked ? "bg-[#FFECC4]" : "bg-[#FFFFFF]"} border ${checked ? "border-[#FFAE00]" : "border-[#FAF9F9]"} rounded-full text-[#3C3939] ${checked ? "shadow-sm" : "shadow-xs"} font-bold text-[16px]`} onClick={onClick}>
      {text}
    </button>
  );
};

export default CheckButton;
