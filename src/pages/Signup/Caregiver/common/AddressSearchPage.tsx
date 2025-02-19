import * as React from "react";

interface AddressSearchPageProps {
  onSelect: (address: string) => void;
}

const AddressSearchPage: React.FC<AddressSearchPageProps> = ({ onSelect }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const loadScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if ((window as any).daum && (window as any).daum.Postcode) {
          resolve();
        } else {
          const script = document.createElement("script");
          script.src =
            "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error("Daum 우편번호 검색 스크립트 로드 실패"));
          document.body.appendChild(script);
        }
      });
    };

    loadScript()
      .then(() => {
        if (containerRef.current) {
          // embed() 메서드를 사용하여 주소 검색 위젯을 container에 임베드합니다.
          new (window as any).daum.Postcode({
            oncomplete: function (data: any) {
              // 사용자가 주소 선택 시 onSelect 콜백 호출
              onSelect(data.address);
            },
            width: "100%",
            height: "100%",
          }).embed(containerRef.current);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("우편번호 검색 스크립트를 불러오지 못했습니다.");
      });
  }, [onSelect]);

  return (
    <div>
      {/* 위젯이 임베드될 컨테이너 */}
      <div ref={containerRef} style={{ width: "100%", height: "37.5rem" }} />
    </div>
  );
};

export default AddressSearchPage;
