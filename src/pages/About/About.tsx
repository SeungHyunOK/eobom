import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";

function About() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current) return; // 요소가 없으면 애니메이션 실행 X

    gsap.to(boxRef.current, {
      x: -400, // 오른쪽으로 이동
      scale: 2, // 커지기
      rotate: 720,
      duration: 2,
      repeat: -1, // 무한 반복
      yoyo: true, // 앞뒤로 반복 (왕복 애니메이션)
      ease: "power1.inOut",
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>About</title>
        <meta name="description" content="홈 페이지입니다." />
      </Helmet>
      <div
        ref={boxRef}
        className="flex items-center justify-center w-20 h-20 px-5 py-3 font-bold text-white bg-red-300 size-16"
      >
        About Page
      </div>
    </div>
  );
}

export default About;
