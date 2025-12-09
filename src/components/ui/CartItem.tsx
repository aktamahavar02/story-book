import React from "react";
import { useNavigate } from "react-router-dom";

interface CartItemProps {
  coverPageImage: string;
  title: string;
  type: string;
  language: string;
  bookPrice: number;
  id: number;
  isCart?: boolean;
  isEdit?: boolean;
  isSpace?: boolean;
  currencySymbol?: string;
}

const CartItem: React.FC<CartItemProps> = ({
  coverPageImage,
  title,
  type = "Hardcover",
  language = "English",
  bookPrice,
  isCart = false,
  isEdit = true,
  isSpace = false,
  id,
  currencySymbol
}) => {
  const displayTitle = title?.length > 15 ? title?.slice(0, 15) + "..." : title;
  const navigate = useNavigate();

  return (
    <div className={`flex items-center justify-between gap-3 w-full ${isSpace && "my-2"}`}>
      <div className="flex  gap-4 w-full">
        <div className={`${isCart ? "w-20 h-20" : "w-10 h-10"} rounded-md`}>
          <img
            src={coverPageImage||"https://storage.wonderwraps.com/1d0fb2a2-e137-496b-a309-43c7374f570a/image.jpeg"}
            alt="name"
            className="w-full h-full rounded-r-md object-cover"
          />
        </div>

        <div className="flex-1 ">
          <div className="flex flex-row justify-between items-start sm:items-center w-full rounded-md font-medium">
            <p className="text-sm text-black truncate font-figTree min-w-0 flex-1 text-wrap">
              {isCart ? title : displayTitle}
            </p>
            <p className="text-sm font-medium text-gray-900 font-figTree flex-shrink-0 sm:pl-2 mt-1 sm:mt-0">
             {currencySymbol}{bookPrice?.toFixed(2)}
            </p>
          </div>

          <p className="text-xs text-[#71717A] font-figTree">
            {type} | {language}
          </p>

          {isCart && isEdit && (
            <div
              className="text-sm font-figTree underline font-bold cursor-pointer text-black"
              onClick={() => {
                navigate(`/setup/${id}`, { state: 2 });
              }}
            >
              Edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
