import React from "react";
import { BookX } from "lucide-react"; // or use your own image/icon

const EmptyState = () => {
  return (
    <div className="flex flex-col w-full">

    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-12 lg:grid-cols-3 xl:gap-x-24 w-full">
      <div className="flex flex-col h-[400px] items-center justify-center w-full rounded-md border-gray-200 border p-4 bg-white col-span-2 sm:col-span-3">
        {/* Icon */}
        <div className="flex items-center justify-center  [@media(min-width:1px)_and_(max-width:374px)]:flex-col [@media(min-width:1px)_and_(max-width:374px)]:gap-4 ">
       <img src="https://resources.wonderwraps.com/8158a105-ee7b-4865-a655-d6eab48aa754/img/empty-user-books.png" className="mr-6 w-36 h-36"/>

        {/* Message */}
        <div>
          <p className="text-[#0A090B] text-base  font-normal  font-figTree">
            We’re working on stories for this age group. Please check back soon!
          </p>
          <p className="text-[#0A090B] text-base  font-normal font-figTree">
            In the meantime, explore our wonderful books for other ages.
          </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EmptyState;
