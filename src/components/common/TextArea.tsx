import Space from "./Space";

type TextAreaProps = {
  placeholder: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  limit: number,
}

const TextArea = ({ value, placeholder, onChange, limit }: TextAreaProps) => {
  return (
    <div className="flex flex-col items-end">
      <textarea className="resize-none w-full h-[160px] text-[19px] font-semibold border-[2px] focus:outline-[1px] rounded-[6px] p-[10px]" placeholder={placeholder} value={value} onChange={onChange} />
      <Space css="h-[10px]" />
      <p className="text-[13px] text-[#9C9898] mr-[6px] font-medium">{`${value.length} / ${limit}`}</p>
    </div>
  );
};

export default TextArea;
