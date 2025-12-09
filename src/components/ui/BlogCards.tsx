import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BlogCards = ({
  image,
  title,
  description,
  onClick,
  item,
  isList,
  isAdmin,
}) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const profileData = useSelector((state: any) => state?.auth?.profile);
  const admin = profileData?.role === "admin";

  return (
    <div
      className={` bg-white rounded-[28px] overflow-hidden shadow-md group cursor-pointer ${
        isList ? "" : "mt-2"
      }  border border-red-100 relative lg:w-auto md:w-auto w-auto
    `}
    >
      <div className="overflow-hidden  transition-transform duration-300 group-hover:scale-105">
        {!loaded && (
          <div className="absolute inset-0 bg-purple-50 animate-pulse" />
        )}
        <img
          src={image}
          alt="Pet Story"
          onLoad={() => setLoaded(true)}
          loading="lazy"
          decoding="async"
          className={`w-full  ${
            isList ? " h-72 sm:h-80" : "h-full"
          } object-cover transition-transform duration-500  lg:h-[300px] ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-100"
          } group-hover:scale-105`}
          style={{ transformOrigin: "center center" }}
        />
      </div>

      <div className="  p-3 sm:p-4">
        <h2
          className={`text-[24px] h-full font-extrabold text-[#212529] my-[10px] transition-colors duration-300 ${
            isAdmin
              ? "group-hover:text-[#465FFF]"
              : "group-hover:text-purple-500"
          } font-figTree`}
          onClick={onClick}
        >
          {title}
        </h2>
        <p className="text-[#333333] lg:mb-4 lg:pb-[35px] pb-[64px] text-[17px] leading-relaxed h-full  font-figTree ">
          {description}
        </p>
        <span
          className={`${
            isAdmin ? "text-[#465FFF] " : "text-purple-500"
          } font-bold text-base hover:underline flex items-center gap-1  font-figTree absolute bottom-5 left-4`}
          onClick={onClick}
        >
          Read more <span className="text-lg">→</span>
        </span>
      </div>
    </div>
  );
};

export default BlogCards;
