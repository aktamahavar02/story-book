import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import amex from "../../assets/svgs/amex.svg";
import klarna from "../../assets/images/discover.png";
import paypal from "../../assets/images/visa.png";
import atm from "../../assets/svgs/atm.svg";
import logo from "../../assets/svgs/logo.svg";
import { cookie } from "../../utils/cookies.js";
import { useNavigate } from "react-router-dom";


const Footer: React.FC = () => {
  const token = cookie.get("token");
  const navigate = useNavigate();
  return (
    <div className="px-0 lg:px-0 md:px-4  bg-white">
      <footer className=" border-b border-gray-200 text-sm font-figTree">
        {/* <div className="max-w-max mx-auto py-10  px-4 sm:px-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> */}
        <div className="mx-auto px-[24px] sm:px-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-[32px]">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <img src={logo} alt="log" className="w-20" />
            </div>
            <p className="mb-8 text-base text-footerText">
              Create hyper-personalised storybooks that make your child the
              hero, with quick customisation and speedy delivery!
            </p>
            <div
              className="flex gap-4 text-purple-600 text-xl cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <a href="/">
                <FaFacebookF width={20} height={20} className="w-6 h-6" />
              </a>
              <a href="/">
                <svg
                  className="w-6 h-6 text-purple-500 hover:text-purple-700 transition"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    d="M0 5C0 2.23858 2.23858 0 5 0H15C17.7614 0 20 2.23858 20 5V15C20 17.7614 17.7614 20 15 20H5C2.23858 20 0 17.7614 0 15V5ZM4.25 10C4.25 13.1756 6.82436 15.75 10 15.75C13.1756 15.75 15.75 13.1756 15.75 10C15.75 6.82436 13.1756 4.25 10 4.25C6.82436 4.25 4.25 6.82436 4.25 10ZM16 5C16.5523 5 17 4.55228 17 4C17 3.44772 16.5523 3 16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5Z"
                    fill="#9D50E5"
                  ></path>{" "}
                  <path
                    d="M10 5.75C7.65279 5.75 5.75 7.65279 5.75 10C5.75 12.3472 7.65279 14.25 10 14.25C12.3472 14.25 14.25 12.3472 14.25 10C14.25 7.65279 12.3472 5.75 10 5.75Z"
                    fill="#9D50E5"
                  ></path>{" "}
                </svg>{" "}
              </a>
              <a href="/">
                <FaTiktok width={20} height={20} className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-5 text-black">
              About Story Magic
            </h3>
            <ul className="space-y-2 text-base text-footerText">
              <li>
                <a href="/contact" className="cursor-pointer">
                  Contact us
                </a>
              </li>
              <li>
                <a href="/faqs" className="cursor-pointer">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/template-selection" className="cursor-pointer">
                  Books
                </a>
              </li>
              <li>
                <a href="/blog" className="cursor-pointer">
                  Blog
                </a>
              </li>
              {!token && (
                <>
                  <li>
                    <a href="/login" className="cursor-pointer">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="/register" className="cursor-pointer">
                      Sign up
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-5 text-black">
              Customer Area
            </h3>
            <ul className="space-y-2 text-footerText text-base">
              <li>
                <a href="/profile" className="cursor-pointer">
                  My Account
                </a>
              </li>
              <li>
                <a href="/order" className="cursor-pointer">
                  Orders
                </a>
              </li>
              <li>
                <a href="/terms-conditions" className="cursor-pointer">
                  Terms
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="cursor-pointer">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full">
            <h3 className="font-medium text-lg mb-5 text-black">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 text-base mb-4">
              Don’t miss out on the newest books
            </p>
            <div className="flex flex-row items-center gap-2 mb-8 [@media(min-width:1px)_and_(max-width:319px)]:flex-wrap">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                h-[40px] xl:w-[192px] lg:w-[155px] [@media(min-width:320px)_and_(max-width:350px)]:w-[150px] [@media(min-width:1px)_and_(max-width:319px)]:w-[100px]"
              />
              <button className="px-5 py-2 bg-purple-500 text-white rounded-[4px] hover:bg-purple-700 h-[40px] cursor-pointer">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4 mt-4 w-full [@media(min-width:1px)_and_(max-width:319px)]:flex-wrap">
              <img
                src={amex}
                alt="new-amex "
                className="w-[40px] xl:w-[69px] lg:w-[31px] [@media(min-width:320px)_and_(max-width:350px)]:w-[54px] [@media(min-width:375px)_and_(max-width:424px)]:w-[67px] [@media(min-width:425px)_and_(max-width:500px)]:w-[69px]"
              />
              <img
                src={klarna}
                alt="new-klarna "
                className="w-[30px] xl:w-[69px] border lg:w-[25px]  [@media(min-width:320px)_and_(max-width:350px)]:w-[54px] [@media(min-width:375px)_and_(max-width:424px)]:w-[45px] [@media(min-width:425px)_and_(max-width:500px)]:w-[50px]"
              />
              <img
                src={paypal}
                alt="new-paypal "
                className="w-[30px] xl:w-[50px] lg:w-[25px] border rounded-sm [@media(min-width:320px)_and_(max-width:350px)]:w-[40px] [@media(min-width:375px)_and_(max-width:424px)]:w-[45px] [@media(min-width:425px)_and_(max-width:500px)]:w-[50px]"
              />

              <img
                src={atm}
                alt="new-atm "
                className="w-[40px] xl:w-[69px] lg:w-[31px]  [@media(min-width:320px)_and_(max-width:350px)]:w-[40px] [@media(min-width:375px)_and_(max-width:424px)]:w-[67px] [@media(min-width:425px)_and_(max-width:500px)]:w-[69px]"
              />
            </div>
          </div>
          {/* //! new one */}
        </div>
        <div className="my-8 border-t border-gray-200 pt-4 px-4 md:px-28 text-gray-500 text-sm flex flex-wrap items-center justify-between w-full">
          <span className="w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
            StarMe — © 2025 All rights reserved
          </span>
          {/* <a
            href="https://www.tenton.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start text-gray-600 hover:text-gray-900"
          >
            <span>Developed by:</span>
            <svg
              className="h-5 w-auto"
              viewBox="0 0 138 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.4"
                y="10.2437"
                width="9.5122"
                height="9.5122"
                fill="currentColor"
              ></rect>
              <rect
                x="20.4877"
                y="10.2437"
                width="9.5122"
                height="9.5122"
                fill="currentColor"
              ></rect>
              <rect
                x="20.4877"
                width="9.5122"
                height="9.5122"
                fill="currentColor"
              ></rect>
              <rect
                x="20.4877"
                y="20.4878"
                width="9.5122"
                height="9.5122"
                fill="currentColor"
              ></rect>
              <rect
                opacity="0.7"
                x="10.2443"
                y="10.2437"
                width="9.5122"
                height="9.5122"
                fill="currentColor"
              ></rect>
              <path
                d="M47.144 22H43.016V9.592H38.528V5.992H51.608V9.592H47.144V22ZM65.2588 22H53.5228V5.992H65.2588V9.592H57.6508V12.088H65.0908V15.688H57.6508V18.4H65.2588V22ZM82.4856 22H78.5016L71.7336 12.736V22H67.6056V5.992H71.8536L78.3336 14.8V5.992H82.4856V22ZM93.0252 22H88.8972V9.592H84.4092V5.992H97.4892V9.592H93.0252V22ZM106.617 22.288C101.721 22.288 98.049 18.88 98.049 14.008C98.049 9.136 101.721 5.728 106.617 5.728C111.513 5.728 115.161 9.136 115.161 14.008C115.161 18.88 111.513 22.288 106.617 22.288ZM106.617 18.64C109.257 18.64 110.961 16.6 110.961 14.008C110.961 11.392 109.257 9.376 106.617 9.376C103.953 9.376 102.249 11.392 102.249 14.008C102.249 16.6 103.953 18.64 106.617 18.64ZM132.07 22H128.086L121.318 12.736V22H117.19V5.992H121.438L127.918 14.8V5.992H132.07V22Z"
                fill="currentColor"
              ></path>
            </svg>{" "}
          </a> */}
        </div>
      </footer>
    </div>
  );
};
export default Footer;
