import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/svgs/logo.svg"

type popupProps = {
  openPop: boolean;
  setOpenPop: React.Dispatch<React.SetStateAction<boolean>>;
};
const PopUpModal: React.FC<popupProps> = ({ openPop, setOpenPop }) => {
  const navigate = useNavigate();
  return (
    <Dialog open={openPop} onOpenChange={setOpenPop}>
      <DialogContent className="max-w-md">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-2 pb-4">
              <img src={logo} alt="log" className="w-20"/>
             
            </div>
            <h2 className="text-3xl text-gray-800 mb-2 font-marcellus">
              Login Required
            </h2>
            <p className="text-sm text-gray-600 mb-6 pt-1">
              You need to be logged in to perform this action.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setOpenPop(false)}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  navigate("/login"); // or handleLoginPopup()
                }}
                className="px-4 py-2 text-sm w-20 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpModal;
