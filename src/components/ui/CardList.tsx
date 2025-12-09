import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  countryList,
  currencyList,
  countryUpdate,
} from "../../../store/slices/loginSlice.js";
import axios from "axios";

interface CartItemType {
  coverPageImage: string;
  title: string;
  type: string;
  language: string;
  bookPrice: number;
}

interface CartListProps {
  items: CartItemType[];
}

const CartList: React.FC<CartListProps> = ({ items }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countryList());   
  }, []);



  const currencyData = useSelector(
    (state) => state?.bookTemplate?.currency
  );
 

  
  return (
    <div className={`p-4 w-[300px] rounded-xl shadow bg-[#FBF5FF] ${items?.length > 0 ? "block" : "hidden"} `}>
      {/* List of cart items */}
      <div className="max-h-36 overflow-y-auto pr-2 ">
        {items?.map((item, i) => (
          <div
            key={i}
            className={`${i === items.length - 1 ? "" : "border-b"}`}
          >
            <CartItem {...item} isSpace={true} currencySymbol= {currencyData?.currencySymbol}/>
          </div>
        ))}
      </div>

      {/* Total section */}
      <div className="flex justify-between items-center   font-figTree  pr-2    pt-4   ">
        <span className="text-sm font-medium">Total</span>
        <span className="text-sm font-medium">
          ${items?.reduce((sum, i) => sum + i.bookPrice, 0).toFixed(2)}
        </span>
      </div>

      {/* View Cart button */}
      <button
        className="w-full mt-2 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm font-figTree"
        onClick={() => navigate("/cart")}
      >
        View Cart
      </button>
    </div>
  );
};

export default CartList;
