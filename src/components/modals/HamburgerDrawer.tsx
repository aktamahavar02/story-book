import React, { useState } from "react";

const HamburgerDrawer = ({open, setOpen, children}) => {
  return (
    <div className="bg-gray-100 relative">
      <div
        className={`fixed top-0 left-0 h-full w-[336px] bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default HamburgerDrawer;
