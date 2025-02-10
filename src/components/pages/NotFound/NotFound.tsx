import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";

function NotFound() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current) return; // 요소가 없으면 애니메이션 실행 X

    gsap.to(boxRef.current, {
      y: 400, // 아래로 이동
      scale: 0.5, //투명해짐
      opacity: 0,
      rotate: 180,
      duration: 2,
      repeat: -1, // 무한 반복
      yoyo: true, // 앞뒤로 반복 (왕복 애니메이션)
      ease: "power1.inOut",
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="홈 페이지입니다." />
      </Helmet>
      <div
        ref={boxRef}
        className="flex items-center justify-center w-20 h-20 px-5 py-3 font-bold text-white bg-blue-500 size-16"
      >
        Not Found!
      </div>
    </div>
  );
}

export default NotFound;
