import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { GiCheckedShield } from "react-icons/gi";

type PicType = {
  id: string;
  textOverlayImage: string;
  generatedImage: string;
};

type PopupProps = {
  openPop: boolean;
  selectPicShow: PicType | null;
  setOpenPop: React.Dispatch<React.SetStateAction<boolean>>;
};
const ModalSave: React.FC<PopupProps> = ({
  openPop,
  setOpenPop,
  selectPicShow,
}) => {


  return (
    <Dialog open={openPop} onOpenChange={setOpenPop}>
      <DialogContent className="max-w-xl">
        <div className=" flex p-4  items-center gap-4">
          <div className="text-2xl font-figTree text-center  text-orange-400">
            Click on the book to open!
          </div>
          <div className="w-[200px] sm:w-[300px] aspect-square">
            <div
              className="
            relative mx-auto
            rounded-lg shadow-xl shadow-gray-400 overflow-hidden
            bg-white
          "
            >
              <div
                className="
              absolute left-0 top-0 h-full w-4
              bg-gradient-to-r from-white/70 via-transparent to-transparent
              opacity-90
            "
              >
                <div
                  className="
                absolute left-[7px] top-0 h-full w-[2px]
                bg-gradient-to-b from-white/80 via-white/40 to-transparent
                rounded-full opacity-90
              "
                ></div>

                <div
                  className="
                absolute inset-0
                bg-gradient-to-r from-white/40 to-transparent
              "
                ></div>

                <div
                  className="
                absolute left-0 top-0 h-full w-[1px]
                bg-black/70
              "
                ></div>
              </div>

              <img
                src={selectPicShow?.textOverlayImage}
                alt="cover"
                // onLoad={() => setLoaded(true)}
                // loading="lazy"
                //  decoding="async"
                className={`w-full h-full object-cover block transition-opacity duration-500`}
              />

              <div
                className="
              absolute left-[7px] top-0 h-full w-[3px]
              bg-gradient-to-b from-white/70 via-white/20 to-transparent
              rounded-full opacity-60
            "
              ></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center  ">
          <div className="max-w-xs w-full bg-gray-100 rounded-2xl shadow-md border border-slate-200 p-5 flex flex-col gap-4  ">
            <h2 className="text-lg font-semibold text-slate-900">
              Hardcover Book
            </h2>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 line-through text-sm">$44.9</span>
              <span className="text-slate-900 font-bold">$39.9</span>
            </div>

            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="text-slate-400">•</span> Physical Storybook
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">•</span> Delivered in 6–8
                business days
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">•</span> Loved by kids
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">•</span> Free shipping
              </li>
            </ul>

            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-3 px-4 rounded-full w-full transition-colors duration-200"
            >
              <MdShoppingCart />
              Complete my order
            </button>
          </div>
        
        </div>
        <div className="flex items-center gap-2  px-0">
          <FaLock />
          <div className=" font-figTree text-base text-gray-500">Secure Payment</div>
          <IoIosStar />
          <div className=" font-figTree text-base text-gray-500">High quality product</div>
          <GiCheckedShield/>
          <div className=" font-figTree text-base text-gray-500">Satisfaction Guarantee</div>
        </div>
      
      </DialogContent>
    </Dialog>
  );
};

export default ModalSave;
