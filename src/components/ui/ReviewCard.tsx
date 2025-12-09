import React from "react";
import { format } from "date-fns";

const ReviewCard = ({ rating, title, comment, name, createdAt }) => {
  const formatDate = (dateString) =>
    format(new Date(dateString), "dd MMM yyyy");
  const firstLetter = name?.charAt(0);


  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`flex items-center justify-center w-5 h-5 rounded text-sm`}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="5" fill={index < rating ? "#00B67A" : "#e2e8f0"}>
        </rect><g clip-path="url(#clip0_1839_1067)"><path d="M11.525 7.31882L9.56856 9.04098L10.1933 11.6512L8.00675 10.2315L5.80675 11.6512L6.43123 9.04098L4.49438 7.31882L7.03979 7.12495L8.01923 4.65405L8.95999 7.12495L11.525 7.31882Z" fill="white"></path><path d="M12.9939 6.81039L10.2357 9.26574L11.1332 12.9939L8.00855 10.9596L4.86681 12.9939L5.76424 9.26574L3.0061 6.81039L6.62593 6.56276L8.01932 3.00635L9.37404 6.56276L12.9939 6.81039ZM9.56865 9.04105L11.5251 7.31888L8.96008 7.12501L8.01932 4.65412L7.03989 7.12501L4.49448 7.31888L6.43132 9.04105L5.80684 11.6513L8.00684 10.2315L10.1934 11.6513L9.56865 9.04105Z" fill="white"></path><g clip-path="url(#clip1_1839_1067)"><g clip-path="url(#clip2_1839_1067)"><path d="M10.5691 9.48267L11.6005 13.765L8.0105 11.429L10.5691 9.48267Z" fill="white"></path><path d="M8.01053 11.1374L4.40175 13.4734L5.43104 9.1911L2.26367 6.36962L6.42267 6.0866L8.02309 2.00024L9.57957 6.0866L13.7386 6.36962L10.5691 9.1911L11.6005 13.4734L8.01053 11.1374Z" stroke="#00B67A" stroke-miterlimit="10"></path></g></g></g><defs><clipPath id="clip0_1839_1067"><rect width="10" height="10" fill="white" transform="translate(3 3)"></rect></clipPath><clipPath id="clip1_1839_1067"><rect width="10" height="9.66667" fill="white" transform="translate(3 3)"></rect></clipPath><clipPath id="clip2_1839_1067"><rect width="12" height="12" fill="white" transform="translate(2 2)"></rect></clipPath></defs></svg>
      </span>
    ));
  return (
    <>
      <div className="px-[36px] py-[24px] my-1 shadow-sm  bg-white font-figTree rounded-[12px] 
       2xl:h-full xl:h-full lg:h-[382px]  md:h-full
      ">
      <div className="flex space-x-1 mb-4">{renderStars(rating)}</div>

        <div className="!text-6xl font-bold !leading-none text-black">“</div>

        <h3 className="text-2xl font-medium text-[#333333] mb-2 font-figTree">
          {title}
        </h3>

        <p className="text-[#4B5563] mb-[68px] font-figTree line-clamp-2 ">
          {comment}
        </p>

        <hr className="border-t border-gray-200 mb-4" />

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-black font-semibold font-figTree  text-lg">
            {firstLetter}
          </div>
          <div>
            <p className="font-medium text-black text-base font-figTree">
              {name}
            </p>
            <p className="text-[#9CA3AF] text-sm font-figTree">
              {formatDate(createdAt)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
