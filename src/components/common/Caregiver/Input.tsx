import * as React from "react";
import icon_eyeClose from "../../../assets/icons/eye-close.svg";
import icon_eyeOpen from "../../../assets/icons/eye-open.svg";
import icon_closeBold from "../../../assets/icons/close-bold-small.svg";

interface InputProps {
  id?: string;
  type:
    | "Id"
    | "Pw"
    | "Gender"
    | "Phone"
    | "Name"
    | "Birthday"
    | "Address"
    | "Otp"
    | "text"
    | "checkbox"
    | "Qn";
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onTimeout?: () => void;
  otpTime?: number;
  onClick?: () => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  onTimeout,
  otpTime,
  placeholder: customPlaceholder,
  className,
}) => {
  const inputId = id || `${type}-input`;

  // 공통 상태/함수
  const [timeLeft, setTimeLeft] = React.useState(180);
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const [toggleQnExplanation, setToggleQnExplanation] = React.useState(false);
  const qnExplanationToggleButton = () =>
    setToggleQnExplanation((prev) => !prev);

  // Pw 타입 전용 상태
  const [internalPassword, setInternalPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const actualPassword = value !== undefined ? value : internalPassword;

  const validatePassword = (pwd: string): boolean => {
    const hasLetter = /[A-Za-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return hasLetter && hasNumber && hasSpecial;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  // OTP 관련 useEffect: 항상 호출되고 내부에서 조건 처리
  React.useEffect(() => {
    if (type === "Otp") {
      if (timeLeft > 0) {
        const timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
      if (timeLeft === 0 && onTimeout) {
        onTimeout();
      }
    }
  }, [timeLeft, onTimeout, type]);

  // 기본 placeholder 처리
  let defaultPlaceholder = "";
  let inputFieldType: string = "text";
  switch (type) {
    case "Id":
      defaultPlaceholder = "아이디를 입력해주세요";
      break;
    case "Otp":
      defaultPlaceholder = "인증번호 입력";
      break;
    case "Pw":
      defaultPlaceholder = "비밀번호를 입력해주세요";
      inputFieldType = "password";
      break;
    case "Gender":
      defaultPlaceholder = "성별을 선택해주세요";
      break;
    case "Phone":
      defaultPlaceholder = "예시 ) 010-1234-5678";
      break;
    case "Name":
      defaultPlaceholder = "예시 ) 홍길동";
      break;
    case "Birthday":
      defaultPlaceholder = "예시 ) 01.01.01";
      inputFieldType = "text";
      break;
    case "Address":
      defaultPlaceholder = "예시 ) 효자로 12, 세종로 1-57 ";
      break;
    case "Qn":
      defaultPlaceholder = "예시 ) 1234-1234567";
      break;
    default:
      break;
  }
  const placeholder = customPlaceholder
    ? customPlaceholder
    : defaultPlaceholder;

  const mergeClasses = (defaultClasses: string) =>
    `${defaultClasses} ${className ? className : ""}`;

  if (type === "Gender") {
    return (
      <>
        {label && (
          <label
            htmlFor={inputId}
            aria-label={label}
            className={mergeClasses(
              "mb-[0.5rem] font-bold leading-[1.88rem] text-[1.25rem]"
            )}
          >
            {label}
          </label>
        )}
        <div className="flex items-center gap-4">
          <label
            htmlFor="male"
            className="relative inline-flex items-center cursor-pointer"
          >
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              className="absolute opacity-0 appearance-none peer"
              required
            />
            <span className="py-[0.62rem] font-bold text-[1.12rem] px-[1.06rem] border-[#FAF9F9] border-2 rounded-[1.87rem] peer-checked:bg-[#FFAE00]">
              🙋‍♂️ 남성
            </span>
          </label>
          <label
            htmlFor="female"
            className="relative inline-flex items-center cursor-pointer"
          >
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              className="absolute opacity-0 appearance-none peer"
              required
            />
            <span className="py-[0.62rem] font-bold text-[1.12rem] px-[1.06rem] border-[#FAF9F9] border-2 rounded-[1.87rem] peer-checked:bg-[#FFAE00]">
              🙋‍♀️ 여성
            </span>
          </label>
        </div>
      </>
    );
  } else if (type === "Address") {
    return (
      <>
        {label && (
          <label
            htmlFor={inputId}
            aria-label={label}
            className={mergeClasses(
              "mb-[0.5rem] font-bold leading-[1.88rem] text-[1.25rem]"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            className={mergeClasses(
              `w-full p-[0.12rem] caret-transparent rounded-sm pr-7 placeholder-[#9C9899] focus:border-[#FF8411] text-[1.18rem] ${
                value && value.length > 0
                  ? "border-b-2 border-[#181818]"
                  : "border-b-2 border-[#D4D2D2]"
              }`
            )}
            placeholder={placeholder}
            required
            value={value !== undefined ? value : ""}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value);
              }
            }}
          />
          {value && value.length > 0 && (
            <button
              type="button"
              className="absolute text-gray-500 transform -translate-y-1/2 right-[0.75rem] top-1/2 hover:text-gray-700"
              onClick={() => {
                if (onChange) {
                  onChange("");
                }
              }}
            >
              <img
                src={icon_closeBold}
                alt="clear"
                className="w-[0.37rem] h-[0.37rem]"
              />
            </button>
          )}
        </div>
      </>
    );
  } else if (type === "Otp") {
    return (
      <>
        {label && (
          <label
            htmlFor={inputId}
            aria-label={label}
            className={mergeClasses(
              "mb-[0.5rem] font-bold leading-[1.88rem] text-[1.25rem]"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            id={inputId}
            className={mergeClasses(
              "p-[0.12rem] caret-transparent placeholder-[#9C9899] focus:outline-none focus:border-2 focus:border-[#FF8411] border-b-2 border-[#D4D2D2] text-[1.18rem] transition-all w-full pr-12"
            )}
            type="text"
            placeholder="인증번호 입력"
            required
            value={value}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value);
              }
            }}
          />
          <span className="absolute right-[0.37rem] text-[#717171] text-[0.8rem] leading-[1.75rem]">
            {formatTime(otpTime ?? timeLeft)}
          </span>
        </div>
      </>
    );
  } else if (type === "Pw") {
    return (
      <>
        {label && (
          <label
            htmlFor={inputId}
            aria-label={label}
            className={mergeClasses(
              "mb-[0.5rem] font-bold leading-[1.88rem] text-[1.25rem]"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={passwordRef}
            className={mergeClasses(
              "p-[0.12rem] caret-transparent placeholder-[#9C9899] focus:border-[#FF8411] border-b-2 border-[#D4D2D2] text-[1.18rem] transition-all w-full pr-10"
            )}
            type={showPassword ? "text" : "password"}
            value={actualPassword}
            placeholder={placeholder}
            required
            autoComplete="current-password"
            onChange={(e) => {
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
            }}
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
  } else if (type === "Birthday") {
    return (
      <div className={mergeClasses("flex flex-col")}>
        {label && (
          <label
            htmlFor={inputId}
            aria-label={label}
            className="mb-[0.5rem] font-bold leading-[1.88rem] text-[1.25rem]"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={inputFieldType}
          className="mb-[2.12rem] p-[0.12rem] caret-transparent placeholder-[#9C9899] focus:border-[#FF8411] border-b-2 border-[#D4D2D2] text-[1.18rem]"
          placeholder={placeholder}
          required
          {...(type === "Birthday"
            ? { pattern: "^\\d{2}\\.\\d{2}\\.\\d{2}$" }
            : {})}
          value={value !== undefined ? value : ""}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
        />
      </div>
    );
  } else if (type === "Phone") {
    return (
      <div className={mergeClasses("flex flex-col")}>
        {label && (
          <label
            htmlFor={inputId}
            aria-label={label}
            className="mb-[0.5rem] font-bold leading-[1.88rem] text-[1.25rem]"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className="mb-[2.12rem] w-full p-[0.12rem] caret-transparent placeholder-[#9C9899] focus:border-[#FF8411] border-b-2 border-[#D4D2D2] text-[1.18rem]"
          type="text"
          placeholder="예시 ) 010-1234-5678"
          required
          value={value !== undefined ? value : ""}
          onChange={(e) => {
            const rawValue = e.target.value;
            const digits = rawValue.replace(/\D/g, "");
            let formatted = "";
            if (digits.length > 0) {
              formatted = digits.substring(0, 3);
              if (digits.length >= 4) {
                formatted += "-" + digits.substring(3, 7);
                if (digits.length >= 8) {
                  formatted += "-" + digits.substring(7, 11);
                }
              }
            }
            if (onChange) {
              onChange(formatted);
            }
          }}
        />
      </div>
    );
  } else if (type === "Qn") {
    return (
      <>
        {label && (
          <label
            htmlFor={inputId}
            aria-label={label}
            className={mergeClasses(
              "mb-[0.5rem] font-bold leading-[1.88rem] text-[1.25rem]"
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={mergeClasses(
            "mb-[0.3rem] p-[0.12rem] caret-transparent placeholder-[#9C9899] focus:border-[#FF8411] border-b-2 border-[#D4D2D2] text-[1.18rem]"
          )}
          type="text"
          placeholder="예시 ) 1234-1234567"
          required
          value={value !== undefined ? value : ""}
          onChange={(e) => {
            const rawValue = e.target.value;
            const digits = rawValue.replace(/\D/g, "");
            let formatted = "";
            if (digits.length > 0) {
              formatted = digits.substring(0, 4);
              if (digits.length > 4) {
                formatted += "-" + digits.substring(4, 11);
              }
            }
            if (onChange) {
              onChange(formatted);
            }
          }}
        />
        <div className="flex flex-col items-end justify-center">
          <p
            onClick={qnExplanationToggleButton}
            className={`mb-[0.3rem] hover:cursor-pointer text-[#717171] text-[0.81rem] leading-[1.75rem] ${
              toggleQnExplanation ? "underline" : "hover:underline"
            }`}
          >
            ?⃝ 문서확인번호는 어디서 볼 수 있나요?
          </p>
          {toggleQnExplanation && (
            <p className="p-[0.62rem] bg-[#FAF9F9] text-[#717171] leading-4 text-[0.75rem] rounded-[0.63rem]">
              요양보호사 자격증 좌측 상단에
              <br />
              ‘제 20XX-XXXXXXX호’ 형태로 표시되어 있습니다.
            </p>
          )}
        </div>
      </>
    );
  }

  // 기본 input for 기타 타입
  return (
    <div className={mergeClasses("flex flex-col")}>
      {label && (
        <label
          htmlFor={inputId}
          aria-label={label}
          className="mb-[0.5rem] font-bold leading-[1.88rem] text-[1.25rem]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="p-[0.12rem] caret-transparent placeholder-[#9C9899] focus:border-[#FF8411] border-b-2 border-[#D4D2D2] text-[1.18rem]"
        placeholder={placeholder}
        required
        value={value !== undefined ? value : ""}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      />
    </div>
  );
};

export default Input;
