import { useNavigate } from "react-router-dom";

type AgeCardProps = {
  ageLabel: string;
  imageUrl: string;
  onClick?: () => void;
};

const AgeCard: React.FC<AgeCardProps> = ({ ageLabel, imageUrl, onClick }) => {
  const navigate = useNavigate()
  return (
    <div className="group relative w-full max-w-[240px] sm:max-w-[320px] rounded-[6px] overflow-hidden shadow-md" onClick={()=>{
      onClick()
    }}>
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={ageLabel}
          className="w-full h-full object-cover aspect-[1/1] transform transition-transform duration-500 group-hover:scale-110 brightness-110"
        />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-between lg:p-2 2xl:p-2 xl:p-2 p-0 pointer-events-none">
        <div className="text-center text-white lg:mt-8 mt-2">
          <p className="text-lg md:text-[24px] font-normal  font-marcellus text-white">Age</p>
          <p className="text-[26px] md:text-[30px] font-normal  font-figTree text-white">{ageLabel}</p>
        </div>

        <div className="flex justify-center mb-2 pointer-events-auto">
          <button
            onClick={onClick}     
            className="bg-opacity-40 backdrop-blur-md text-white py-2 px-4 rounded cursor-pointer font-figTree font-normal "
          >
            Discover
          </button>
        </div>
      </div>
    </div>
  );
};
export default AgeCard;
