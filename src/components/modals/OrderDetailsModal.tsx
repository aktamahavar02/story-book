import React, { useEffect, useState } from "react";
import { X, Download, RotateCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleOrder,
  getSingleAdminOrder,
} from "../../../store/slices/bookTemplateSlice.js";
import loadingImage from "../../assets/images/purple.gif";
import BasicLoader from "../ui/basicLoader.js";
import {  currencyList } from "../../../store/slices/loginSlice.js";
import axios from "axios";
interface OrderDetailsModalProps {
  isOpen: boolean;
  bookId: string;
  orderId: string;
  isAdmin: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function OrderDetailsModal({
  isOpen,
  setIsOpen,
  bookId,
  orderId,
  isAdmin = false,
}: OrderDetailsModalProps) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.bookTemplate?.isSingleOder);
  const adminRes = useSelector(
    (state) => state?.bookTemplate?.singleAdminOrder?.data
  );
   const customerRes = useSelector((state) => state?.bookTemplate?.singleOrder?.data)
  const orderSingleRes = isAdmin
    ? adminRes
    : customerRes;
  useEffect(() => {
    if (isAdmin) {
      if (bookId && orderId) {
        dispatch(
          getSingleAdminOrder({ id: orderId, personalizedBookId: bookId })
        );
      }
    } else {
      if (bookId && orderId) {
        dispatch(getSingleOrder({ id: orderId, personalizedBookId: bookId }));
      }
    }
  }, [bookId, orderId, isAdmin]);



  useEffect(() => {
    dispatch(currencyList());
  }, [])

  const currencyData = useSelector(
    (state) => state?.bookTemplate?.currency
  );
 

 const isoDate = orderSingleRes?.orderDate;
  const date = new Date(isoDate);

  const formattedDate = date?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const downloadFile = async (urlLink, title) => {
    try {
      const response = await fetch(urlLink, { mode: "cors" }); // fetch file
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob(); // get blob
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Clean up memory
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  return (
    <div className=" flex items-center justify-center p-4">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl relative max-h-[75vh] scrollbar-hidden overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-700 hover:bg-purple-400 rounded-full p-1 transition"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Title */}
              <h2 className="text-gray-800 font-bold text-xl md:text-lg mb-6 font-figTree">
                Order Details
              </h2>

              {/* Image */}
              <div className="mb-6 flex justify-center">
                {loading ? (
                  <div className="flex items-center justify-center mt-10">
                    {" "}
                    <img src={loadingImage} alt="image" className="w-28" />{" "}
                  </div>
                ) : (
                  <>
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div
                        className="relative"
                        style={{
                          filter:
                            "drop-shadow(-12px 12px 8px rgba(0, 0, 0, .5))",
                          transform: "perspective(1000px) rotateY(3deg)",
                        }}
                      >
                        <img
                          src={orderSingleRes?.coverPageImage}
                          alt={"order"}
                          className="w-24 h-24 sm:w-32 sm:h-32 aspect-square object-cover rounded-tr-md rounded-br-md"
                        />
                        <div className="absolute top-0 h-full bg-white/50 blur-sm left-0 w-2"></div>
                        <div className="absolute top-0 h-full bg-black/10 left-[3%] w-[1.5px]"></div>
                        <div className="absolute top-0 h-full bg-black/20 blur-sm left-[3%] w-1"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Title & Status Badge */}
              {loading ? (
                <BasicLoader color="fill-purple-500" />
              ) : (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                  <h3 className="text-gray-800 font-bold text-lg md:text-xl font-figTree">
                    {orderSingleRes?.title}
                  </h3>
                  <span
                    className={` ${
                      orderSingleRes?.gelatoStatus === "Failed"
                        ? "text-red-500 bg-red-100"
                        : "text-green-700 bg-green-100"
                    } 
                 px-3 py-1 font-figTree rounded-[4px] text-sm font-semibold whitespace-nowrap w-fit`}
                  >
                    {orderSingleRes?.gelatoStatus}
                  </span>
                </div>
              )}

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div>
                  <p className="text-gray-700 text-sm font-semibold mb-1 font-figTree">
                    Order Number
                  </p>
                  <p className="text-gray-900 font-bold text-base md:text-sm font-figTree">
                    {orderSingleRes?.orderId}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-semibold mb-1 font-figTree">
                    Order Date
                  </p>
                  <p className="text-gray-900 font-bold text-base md:text-sm font-figTree">
                    {formattedDate}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-semibold mb-1 font-figTree">
                    Price
                  </p>
                  <p className="text-gray-900 font-bold text-base md:text-sm font-figTree">
                  {currencyData?.currencySymbol}{orderSingleRes?.bookPrice || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-semibold mb-1 font-figTree">
                    Gender
                  </p>
                  <p className="text-gray-900 font-bold text-base md:text-sm font-figTree">
                 {orderSingleRes?.childGender || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-semibold mb-1 font-figTree">
                    Delivery
                  </p>
                  <p className="text-gray-900 font-bold text-base md:text-sm font-figTree capitalize">
                    {orderSingleRes?.shippingMethod}
                  </p>
                </div>
              </div>

              {/* Customization Details */}
              <div className="mb-6">
                <p className="text-gray-800 font-bold text-sm md:text-base mb-3 font-figTree">
                  Customization Details
                </p>
                <div className="bg-gray-100 rounded-xl p-4 space-y-2">
                  <p className="text-gray-800 text-sm">
                    <span className="font-semibold">Child's Name:</span>{" "}
                    {orderSingleRes?.childName || "Emma"}
                  </p>
                  <p className="text-gray-800 text-sm">
                    <span className="font-semibold">Age:</span>{" "}
                    {orderSingleRes?.childAge} years old
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-row flex-col gap-3">
                <button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500
                 text-white font-bold py-3 rounded-[8px] transition flex items-center justify-center gap-2 text-sm"
                  onClick={() => {
                    downloadFile(orderSingleRes?.pdfUrl, orderSingleRes?.title);
                  }}
                >
                  <Download size={20} />
                  Download Book
                </button>
                {/* <button className="w-full border-2 border-purple-200 text-gray-800 text-sm hover:bg-gray-50 font-bold py-3 rounded-[8px] transition flex items-center justify-center gap-2">
                  <RotateCcw size={20} />
                  Reorder
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Button */}
      {/* {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition"
        >
          Open Modal
        </button>
      )} */}
    </div>
  );
}
