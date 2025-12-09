
interface CommonHeaderProps {
  header?: string;
  description?: React.ReactNode;
  thirdDescription?: React.ReactNode;
  nextDescription?: React.ReactNode;
  isNoSpace?: boolean;
  isBold?: boolean;

}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  header,
  description,
  nextDescription,
  thirdDescription,
  isNoSpace = false,
  isBold = false,
}) => {
  return (
    <div className={`${isNoSpace? "" : "mb-14"} font-figTree ` }>
      <div className=" text-header-text font-bold mb-4 ">{header}</div>
      {description && <div className={`mb-4 font-figTree ${isBold &&  "font-bold"} `}>{description}</div>}
      {nextDescription && (
        <div className="mb-4 font-figTree">{nextDescription}</div>
      )}
      {thirdDescription && <div>
        <div className="mb-4 font-figTree">{thirdDescription}</div>
        </div>}
    </div>
  );
};

export default CommonHeader;
