type ProgressBarProps = {
  width: string,
}

const ProgressBar = ({ width }: ProgressBarProps) => {
  // const values = ['w-[0px]', `w-1/5`, 'w-2/5', `w-3/5`, 'w-4/5', `w-full`];

  return (
    <div className="bg-[#D4D2D2] w-full h-[2px]">
      <div className={`bg-[#FF8411] ${width} h-[2px]`} />
    </div>
  );
};

export default ProgressBar;
