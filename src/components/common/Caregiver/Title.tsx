interface TitleProps {
  children: React.ReactNode;
  subTitle?: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({
  children,
  subTitle,
  className = "",
}) => {
  if (subTitle) {
    return (
      <div className={`font-bold ${className}`}>
        <h2 className="mb-[0.8rem] text-[1.5rem] leading-[1.88rem]">
          {children}
        </h2>
        <p className="text-[0.94rem] text-[#9C9898]">{subTitle}</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-[2.87rem] text-[1.5rem] font-bold leading-[1.88rem]">
        {children}
      </h2>
    </>
  );
};
export default Title;
