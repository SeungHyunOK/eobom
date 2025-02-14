import { useEffect, useState } from "react";

type ButtonProps = {
  text: string,
  onClick: () => void,
  disabled: boolean,
}

const Button = ({ text, onClick, disabled }: ButtonProps) => {
  const [bottom, setBottom] = useState<number>(0);

  let animationFrameId: number | null = null;

  useEffect(() => {
    const updateBottom = () => {
      if (!window.visualViewport) return;

      const visualViewport = window.visualViewport;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        setBottom(window.innerHeight - visualViewport.height);
      });
    };

    window.visualViewport?.addEventListener("resize", updateBottom);
    window.visualViewport?.addEventListener("scroll", updateBottom);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateBottom);
      window.visualViewport?.removeEventListener("scroll", updateBottom);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <button className={`relative w-full min-h-[48px] ${disabled ? "bg-[#D4D2D2] cursor-default" : "bg-[#FF8411] cursor-pointer"} rounded-[10px] text-[#FFFFFF] font-bold`} onClick={disabled ? () => { } : onClick} style={{ bottom: `${bottom}px` }}>
      {text}
    </button>
  );
};

export default Button;
