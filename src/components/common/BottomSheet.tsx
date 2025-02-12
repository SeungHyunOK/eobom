import { useState, useEffect } from "react";
import Input from "./Input";
import Space from "./Space";
import Button from "./Button";

type BottomSheetProps = {
  start: number,
  close: () => void,
}

const BottomSheet = ({ start, close }: BottomSheetProps) => {
  const [code, setCode] = useState<string>("");
  const [time, setTime] = useState<number>(180);
  const [expectedTime, setExpectedTime] = useState<number>(Date.now());
  const [validCode, setValidCode] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Math.round((180000 - (Date.now() - start)) / 1000));
      setExpectedTime(prev => prev + 1000);
    }, 1000 - (Date.now() - expectedTime));

    if (time <= 0) {
      clearInterval(timer);
      close();
    }

    return () => {
      clearInterval(timer);
    }
  }, [expectedTime]);

  const getTimeString = (time: number) => {
    return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`
  }

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }

  const Timer = () => {
    return (
      <p className="text-[13px] text-[#717171] font-medium">{getTimeString(time)}</p>
    );
  }

  const handleCheckCode = () => {
    //
  }

  return (
    <div className={`absolute top-[0px] left-[0px] w-full h-full bg-[#00000099]`}>
      <div className={`absolute p-[20px] bottom-[0px] w-full h-[600px] rounded-tl-[30px] rounded-tr-[30px] bg-[#FFFFFF] flex flex-col`}>
        <div className="flex-1">
          <div className="flex-1 flex justify-end">
            <img className="w-[12px] cursor-pointer" src="/assets/icons/close.svg" onClick={() => close()} />
          </div>
          <p className="text-[22px] font-bold text-[#181818] text-center">
            문자메시지로 전송 받은<br />인증번호를 입력해주세요
          </p>
          <p className="text-[13px] text-[#FF8411] text-center font-semibold">
            인증번호를 다시 확인해주세요
          </p>
          <Input type="phone" placeholder="인증번호 입력" value={code} onChange={handleChangeCode} suffix={Timer()} />
          <Space css="h-[12px]" />
          <p className="text-[13px] text-[#717171] underline underline-offset-2 text-end cursor-pointer">
            인증번호 재전송
          </p>
        </div>
        <Button text="입력 완료" onClick={() => { }} disabled={!code} />
      </div>
    </div>
  );
};

export default BottomSheet;
