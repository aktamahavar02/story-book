interface CommonHeaderProps {
  header: string;
  description?: string;
  sections?: {
    title?: React.ReactNode;
    text?: React.ReactNode;
    subPoints?: React.ReactNode[];
  }[];
  isNoSpace?: boolean;
  noGap?: boolean;
}
const ContentSection: React.FC<CommonHeaderProps> = ({
  header,
  description,
  sections,
  isNoSpace = false,
  noGap = false,
}) => {
  return (
    <div className={`${isNoSpace ? "" : "mb-14"} font-figTree`}>
      <div className="text-header-text font-bold mb-4 ">{header}</div>

      {description && <div className="mb-4 font-figTree">{description}</div>}

      {sections?.map((sec, idx) => (
        <div key={idx} className="mb-4">
          {sec.title && (
            <div className=" my-4  text-xl font-semibold">{sec.title}</div>
          )}
          <div className={`${noGap ? "pl-4" : ""}`}>
            <div className="font-figTree font-medium">{sec.text}</div>
            {sec.subPoints && (
              <div className="list-disc pl-8  mt-2 font-figTree font-normal">
                {sec.subPoints.map((point, i) => (
                  <div key={i}>{point}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentSection;
