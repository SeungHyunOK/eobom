type ButtonProps = {
  text: string,
  onClick: () => void,
  disabled: boolean,
}

const Button = ({ text, onClick, disabled }: ButtonProps) => {
  return (
    <button className={`w-full h-[48px] bottom-[20px] ${disabled ? "bg-[#D4D2D2] cursor-default" : "bg-[#FF8411] cursor-pointer"} rounded-[10px] text-[#FFFFFF] font-bold`} onClick={disabled ? () => { } : onClick}>
      {text}
    </button>
  );
};

export default Button;
