import { useEffect, useState } from "react";


const TimeTable = () => {
  const [selected, setSelected] = useState<boolean[][]>(Array.from(Array(12), () => Array(7).fill(false)));
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    const handleMouseDown = () => setMouseDown(true);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const table = () => {
    const handleTouchBox = (e: React.MouseEvent<HTMLDivElement>, rowNum: number, colNum: number) => {

      if (e.type === "mousedown") {
        setSelected(prev => {
          return prev.map((row, i) => {
            return row.map((value, j) => {
              if (i === rowNum && j === colNum) {
                return !value
              }
              else {
                return value
              }
            });
          });
        });
      } else if (e.type === "mouseenter") {
        console.log(e);
        if (mouseDown && !selected[rowNum][colNum]) {
          setSelected(prev => {
            return prev.map((row, i) => {
              return row.map((value, j) => {
                if (i === rowNum && j === colNum && mouseDown) {
                  return !value
                }
                else {
                  return value
                }
              });
            });
          });
        } else if (mouseDown && selected[rowNum][colNum]) {
          setSelected(prev => {
            return prev.map((row, i) => {
              return row.map((value, j) => {
                if (i === rowNum && j === colNum && mouseDown) {
                  return !value
                }
                else {
                  return value
                }
              });
            });
          });
        }
      }
    }

    return (
      [...Array(12)].map((_, rowNum) => {
        return (
          <>
            <div key={rowNum} className="relative bottom-[-2vh] flex justify-center items-center leading-[0px] text-[11px] text-[#9C9898] font-bold" >
              {rowNum + 10}
            </div>
            {
              [...Array(7)].map((_, colNum) => {
                return <div key={rowNum * 12 + colNum} className={`${selected[rowNum][colNum] ? "bg-[#FFF2CC] outline outline-[1px] outline-[#FFAE00] z-0" : "bg-[#FFFFFF] outline outline-[1px] outline-[#D4D2D2]"}`}
                  onMouseUp={(e) => handleTouchBox(e, rowNum, colNum)}
                  onMouseDown={(e) => handleTouchBox(e, rowNum, colNum)}
                  onMouseEnter={(e) => handleTouchBox(e, rowNum, colNum)}
                  onMouseLeave={(e) => handleTouchBox(e, rowNum, colNum)} />
              })
            }
          </>
        );
      })
    );
  }
  return (
    <div className="w-full flex-1 select-none">
      <div className="grid grid-cols-[30px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] h-[30px] gap-[1px] p-[1px]">
        <div key={1} className="relative bottom-[-15px] flex justify-center items-center leading-[0px] text-[11px] text-[#9C9898] font-bold" >
          {9}
        </div>
        {
          ["월", "화", "수", "목", "금", "토", "일"].map((weekday) => {
            return (
              <div key={weekday} className="flex justify-center items-center bg-[#FFFFFF] leading-[0px] text-[14px] font-bold" >
                {weekday}
              </div>
            );
          })
        }
      </div>
      <div className="grid grid-rows-13 grid-cols-[30px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] w-full h-full gap-[1px]">
        {table()}
      </div>
    </div>
  );
};

export default TimeTable;
