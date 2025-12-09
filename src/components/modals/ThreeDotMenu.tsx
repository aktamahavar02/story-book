import React, { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const ThreeDotMenu = ({onClick}) => {
  const [open, setOpen] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative border border-red-500" ref={menuRef}>
      {/* 3 Dots Button */}
      <div
        className="absolute right-4 top-0 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <HiOutlineDotsVertical size={20} />
      
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-8 bg-white border rounded-lg shadow z-50 w-[130px]">
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-figTree font-normal text-xs " onClick={()=>{
            onClick()
          }}>
            Request Changes
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;
