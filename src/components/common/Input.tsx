import { useState } from "react";
import Space from "./Space";

type InputProps = {
  type: string,
  label?: string,
  placeholder: string,
  value: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClick?: () => void,
  suffix?: React.JSX.Element | null,
}

const Input = ({ type, label, placeholder, value, onChange, onClick, suffix }: InputProps) => {
  const underlines = ["bg-[#D4D2D2]", "bg-[#181818]"];
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const BodyComponent = () => {
    switch (type) {
      case "id":
        return (
          <input className="text-[19px] font-semibold placeholder-[#9C9898] outline-none" placeholder={placeholder} value={value} onChange={onChange} />
        );
      case "password":
        return (
          <>
            <input className="text-[19px] font-semibold placeholder-[#9C9898] outline-none" placeholder={placeholder} value={value} onChange={onChange} type={passwordVisible ? "text" : "password"} />
            <button onClick={() => setPasswordVisible(!passwordVisible)}>
              {
                passwordVisible ?
                  <img src="/assets/icons/eye-open.svg" />
                  : <img src="/assets/icons/eye-close.svg" />
              }
            </button>
          </>
        );
      case "text":
        return (
          <input className="text-[19px] font-semibold placeholder-[#9C9898] outline-none" placeholder={placeholder} value={value} onChange={onChange} />
        );
      case "tel":
        return (
          <input className="text-[19px] font-semibold placeholder-[#9C9898] outline-none" placeholder={placeholder} value={value} onChange={onChange} type="tel" />
        );
      case "number":
        return (
          <input className="text-[19px] font-semibold placeholder-[#9C9898] outline-none" placeholder={placeholder} value={value} onChange={onChange} type="number" />
        );
      default:
        return (
          <input className="text-[19px] font-semibold placeholder-[#9C9898] outline-none" placeholder={placeholder} value={value} onChange={onChange} />
        );
    }
  }

  return (
    <label className="text-[20px] font-bold text-[#181818]" onClick={onClick ?? (() => { })}>
      {
        label ?
          <>{label}<br />
            <Space css="h-[20px]" /></>
          : null
      }
      <div className="flex justify-between">
        {BodyComponent()}
        {suffix ?? null}
      </div>
      <div className={`w-full h-[2px] ${underlines[value ? 1 : 0]}`} />
    </label>
  );
};

export default Input;
