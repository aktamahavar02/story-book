import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CloudHail, Menu, X } from "lucide-react";
import { cookie } from "../../utils/cookies";
import logo from "../../assets/svgs/logo.svg";
import TailwindDrawer from "../modals/HamburgerDrawer";
import { staticUser } from "../../utils/staticData";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const token = cookie.get("token");
  const user = token ? staticUser : null;

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-[#6D28D9] font-medium"
      : "text-headerColor hover:text-gray-900";

  const isActiveMobile = (path: string) =>
    location.pathname === path
      ? "text-purple-600 bg-purple-200 "
      : "text-gray-600 hover:text-gray-900 bg-gray-100";
  const handleLogout = () => {
    cookie.remove("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // Static data - no Redux needed
  const myBooksCount = 0; // Static count

  // Simplified navbar - no complex preferences needed

  {
    /* <div className={` ${isNavbarOpen ? "blur-sm": ''}  `}></div> */
  }
  return (
    <div className="relative">
      <nav
        className="bg-white  border-b border-gray-100 px-4 py-4 sticky top-0 z-50 shadow border"
        onClick={() => setOpen(false)}
      >
        <div className="max-w-max mx-auto flex items-center justify-between relative  [@media(min-width:1px)_and_(max-width:550px)]:overflow-hidden">
          <div className="flex">
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {/* <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg "
                >
                </motion.div>
              )}
            </AnimatePresence> */}
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <div className="text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#374151"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    ></path>
                  </svg>
                </div>
              )}
            </button>
            <div
              className=" flex items-center gap-2"
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src={logo}
                alt="log"
                className="w-[65px] [@media(min-width:1px)_and_(max-width:319px)]:hidden cursor-pointer 
              [@media(min-width:320px)_and_(max-width:430px)]:pl-[12px]
              [@media(min-width:550px)_and_(max-width:1024px)]:pl-[0px] 2xl:ml-6 xl:ml-6 lg:ml-3 md:ml-2
               ml-2"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-[28px] font-figTree text-sm">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className={`${isActive("/")} font-medium cursor-pointer`}
            >
              Home
            </a>

            <a
              href="/template-selection"
              onClick={(e) => {
                e.preventDefault();
                navigate("/template-selection");
              }}
              className={`${isActive(
                "/template-selection"
              )} font-medium cursor-pointer`}
            >
              Books
            </a>

            <a
              href="/my-books"
              onClick={(e) => {
                e.preventDefault();
                const token = cookie.get("token");
                if (!token) {
                  localStorage.setItem("from", "/my-books");
                  navigate("/login");
                } else {
                  navigate("/my-books");
                }
              }}
              className={
                isActive("/my-books") +
                " relative flex items-center gap-1 font-medium cursor-pointer"
              }
            >
              My Books
              {myBooksCount > 0 && (
                <span className="absolute -top-1 -right-3.5 -mt-1 -mr-1 rounded-full bg-gray-200 text-[#1F2937] text-xs w-5 h-5 flex items-center justify-center">
                  {myBooksCount}
                </span>
              )}
            </a>

            <a


              href="/support"
              onClick={(e) => {
                e.preventDefault();
                navigate("/support");
              }}
              className={`${isActive(
                "/support"
              )} font-medium cursor-pointer`}
            >
              Support
            </a>
          </div>
          <div>
            <div className="flex items-center gap-3">



              <div className="relative inline-block text-left  ">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full font-medium text-gray-800 hover:text-gray-900 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    const token = cookie.get("token");
                    if (token) {
                      setOpen(!open);
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  <div className="flex items-center gap-[4px] pt-1">
                    {/* <LuUserRound className="w-5 h-5" /> */}
                    <svg
                      className="size-5"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.7919 14.8771C21.0409 13.76 21.9213 12.2899 22.3165 10.6614C22.7118 9.03293 22.6032 7.32283 22.0053 5.75739C21.4074 4.19195 20.3482 2.84496 18.9679 1.89466C17.5877 0.944361 15.9514 0.435547 14.2757 0.435547C12.5999 0.435547 10.9637 0.944361 9.58343 1.89466C8.20318 2.84496 7.14401 4.19195 6.54607 5.75739C5.94812 7.32283 5.83959 9.03293 6.23483 10.6614C6.63007 12.2899 7.51046 13.76 8.75949 14.8771C6.44875 15.6862 4.44618 17.1928 3.02828 19.1887C1.61037 21.1846 0.847068 23.5715 0.84375 26.0198C0.84375 26.3953 0.992917 26.7555 1.25843 27.021C1.52395 27.2865 1.88407 27.4357 2.25957 27.4357C2.63507 27.4357 2.99519 27.2865 3.26071 27.021C3.52623 26.7555 3.6754 26.3953 3.6754 26.0198C3.67783 23.6359 4.62592 21.3503 6.3116 19.6647C7.99729 17.979 10.2829 17.0309 12.6668 17.0284H15.9213C18.3053 17.0309 20.5908 17.979 22.2765 19.6647C23.9622 21.3503 24.9103 23.6359 24.9127 26.0198C24.9127 26.3953 25.0619 26.7555 25.3274 27.021C25.5929 27.2865 25.9531 27.4357 26.3286 27.4357C26.7041 27.4357 27.0642 27.2865 27.3297 27.021C27.5952 26.7555 27.7444 26.3953 27.7444 26.0198C27.7384 23.5671 26.9697 21.1769 25.5449 19.1804C24.12 17.184 22.1095 15.6801 19.7919 14.8771ZM14.2757 3.33909C15.3467 3.33909 16.3936 3.65668 17.2841 4.25169C18.1746 4.84671 18.8687 5.69243 19.2785 6.6819C19.6884 7.67137 19.7956 8.76016 19.5867 9.81058C19.3778 10.861 18.862 11.8259 18.1047 12.5832C17.3474 13.3405 16.3825 13.8562 15.3321 14.0652C14.2817 14.2741 13.1929 14.1669 12.2034 13.757C11.214 13.3472 10.3682 12.6531 9.77322 11.7626C9.17821 10.8721 8.86062 9.82515 8.86062 8.75415C8.86062 8.04304 9.00068 7.33889 9.27282 6.6819C9.54495 6.02491 9.94382 5.42796 10.4467 4.92513C11.4622 3.90961 12.8395 3.33909 14.2757 3.33909Z"
                        fill="black"
                      ></path>
                    </svg>
                    <span className="font-figTree font-normal text-base text-[#374151] [@media(min-width:1px)_and_(max-width:425px)]:hidden">
                      {user?.name || "Account"}
                    </span>
                  </div>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div
                      onClick={() => navigate("/profile")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      My Account
                    </div>{" "}
                    <div
                      onClick={() => navigate("/order")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      My Orders
                    </div>{" "}
                    <div
                      onClick={() => navigate("/my-books")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      My Books
                    </div>
                    <div
                      onClick={() => handleLogout()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Log Out
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
        </div>

        {/* Mobile Navigation */}

        <TailwindDrawer open={isMobileMenuOpen} setOpen={setIsMobileMenuOpen}>
          <>
            <div className="p-5 border-b-2 border-gray-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 300);
                }}
                className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-purple-300 hover:border-gray-400 transition-colors"
              >
                <svg
                  className="w-3 h-3 text-purple-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu items - simple list */}
            <div className="flex flex-col px-4 mt-4 gap-[8px]">
              <button
                onClick={() => {
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                // className={`w-full text-left px-5 py-3.5 mb-2 rounded-lg text-base font-medium transition-all ${
                //   isActive("/")
                //     ? "bg-purple-100 text-purple-700"
                //     : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                // }`}
                className={`w-full ps-3 pe-4 py-2.5 px-3  ${isActiveMobile(
                  "/"
                )}  mb-2 font-figTree  text-start text-base font-normal text-gray-900 bg-gray-100 rounded-md  focus:outline-none focus:text-gray-400  transition duration-150 ease-in-out`}
              >
                Home
              </button>

              <button
                onClick={() => {
                  navigate("/template-selection");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full ps-3 pe-4 py-2.5 px-3   ${isActiveMobile(
                  "/template-selection"
                )}    mb-2 font-figTree text-start text-base font-normal text-gray-900 bg-gray-100 rounded-md  focus:outline-none focus:text-gray-400   transition duration-150 ease-in-out`}
              >
                Books
              </button>

              <button
                onClick={() => {
                  const token = cookie.get("token");
                  if (!token) {
                    localStorage.setItem("from", "/my-books");
                    navigate("/login");
                  } else {
                    navigate("/my-books");
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`w-full ps-3 pe-4 py-2.5 px-3   ${isActiveMobile(
                  "/my-books"
                )}    mb-2  font-figTree text-start text-base font-normal text-gray-900 bg-gray-100 rounded-md  focus:outline-none focus:text-gray-400 transition duration-150 ease-in-out`}
              >
                My Books
              </button>

              <button
                onClick={() => {


                  navigate("/support");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full ps-3 pe-4 py-2.5 px-3   ${isActiveMobile(
                  "/support"
                )}    mb-2 font-figTree text-start text-base font-normal text-gray-900 bg-gray-100 rounded-md  focus:outline-none focus:text-gray-400   transition duration-150 ease-in-out`}
              >
                Support
              </button>
              {!token && (
                <button
                  onClick={() => {
                    const token = cookie.get("token");
                    navigate("/login");
                  }}
                  className={`w-full ps-3 pe-4 py-2.5 px-3   ${isActiveMobile(
                    "/support"
                  )}    mb-2 font-figTree text-start text-base font-normal text-gray-900 bg-gray-100 rounded-md  focus:outline-none focus:text-gray-400  transition duration-150 ease-in-out`}
                >
                  Sign Up
                </button>
              )}
            </div>
          </>
        </TailwindDrawer>

        {/* {
        openModal && 
         <PreferencesModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      } */}
      </nav>
    </div>
  );
};

export default Navbar;
