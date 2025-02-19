import * as React from "react";
import icon_eyeClose from "../../../../assets/icons/eye-close.svg";
import icon_eyeOpen from "../../../../assets/icons/eye-open.svg";

interface PasswordInputProps {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
}) => {
  const inputId = id || "password-input";
  const [internalPassword, setInternalPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const passwordRef = React.useRef<HTMLInputElement>(null);

  // controlled vs uncontrolled 처리
  const actualPassword = value !== undefined ? value : internalPassword;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validatePassword = (pwd: string): boolean => {
    const hasLetter = /[A-Za-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return hasLetter && hasNumber && hasSpecial;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalPassword(newValue);
    }
    if (!validatePassword(newValue)) {
      setError("!⃝ 영문, 숫자, 특수기호 3가지를 포함해주세요");
      if (passwordRef.current) {
        passwordRef.current.setCustomValidity(
          "!⃝ 꼭 영문, 숫자, 특수기호 3가지를 포함해주세요"
        );
      }
    } else {
      setError("");
      if (passwordRef.current) {
        passwordRef.current.setCustomValidity("");
      }
    }
  };

  return (
    <>
      {label && (
        <label
          htmlFor={inputId}
          aria-label={label}
          className="mb-[0.5rem] font-bold leading-[1.88rem] text-[1.25rem]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          ref={passwordRef}
          className="p-[0.12rem] caret-transparent placeholder-[#9C9899] focus:border-[#FF8411] border-b-2 border-[#D4D2D2] text-[1.18rem] transition-all w-full pr-10"
          type={showPassword ? "text" : "password"}
          value={actualPassword}
          placeholder={placeholder || "비밀번호를 입력해주세요"}
          required
          autoComplete="current-password"
          onChange={handlePasswordChange}
        />
        <img
          src={showPassword ? icon_eyeOpen : icon_eyeClose}
          alt={showPassword ? "비밀번호 보임" : "비밀번호 숨김"}
          onClick={togglePasswordVisibility}
          className="absolute right-[0.3rem] transform -translate-y-1/2 cursor-pointer top-1/2"
        />
      </div>
      {error && (
        <p className="pl-[0.12rem] text-[0.8rem] leading-[1.75rem] text-[#FF8411] font-semibold">
          {error}
        </p>
      )}
    </>
  );
};

export default PasswordInput;
