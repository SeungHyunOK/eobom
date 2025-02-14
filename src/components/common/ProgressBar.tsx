type ProgressBarProps = {
  step: number,
  total: number,
}

const ProgressBar = ({ step, total }: ProgressBarProps) => {
  const width = step <= 0 ? "w-[0px]" : `w-${step.toString()}/${total.toString()}`

  return (
    <div className="bg-[#D4D2D2] w-full h-[2px]">
      <div className={`bg-[#FF8411] ${width} h-[2px]`} />
    </div>
  );
};

export default ProgressBar;
