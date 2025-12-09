import Navbar from "@/components/ui/Navbar";
import Stepper from "@/components/ui/Stepper";
import React, { useEffect, useState } from "react";
import YourCart from "./YourCart";
import ShippingForm from "./ShippingForm";
import { useLocation, useNavigate } from "react-router-dom";
import CartCheckout from "./CartCheckout";
import { useSelector } from "react-redux";
import { CloudFog } from "lucide-react";

const Cart = ({ stepNo }) => {
  const steps = ["Cart", "Delivery", "Checkout"];
  const [step, setStep] = useState(1);
  const [bookId, setBookId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [coupon, setCoupon] = useState("");
  const cartList = useSelector((state) => state?.bookTemplate?.cartData);

  const items = cartList?.data?.personalizedBooks;
  const idCart = items?.map((c) => {
    return c?.id;
  });

  const stepSecond = location?.state;
  const stepCurr = location?.state;

  useEffect(() => {
    if (stepSecond) {
      setStep(2);
    }
    if (stepCurr) {
      setStep(3);
    }
  }, []);

  useEffect(() => {
    if (stepNo === 2) {
      setStep(2);
    } else if (stepNo === 3) {
      setStep(3);
    } else {
      setStep(1);
    }
  }, [stepNo]);
 
   const isNavbarOpen = useSelector((state) => state?.bookTemplate?.isNavbarOpen);
 
  return (
    <div>
      {" "}
      <div className="min-h-screen relative overflow-hidden">
        {/* <div className="absolute inset-10 bg-[url('https://resources.wonderwraps.com/e6d69f38-8562-424b-b966-edc0ebe3436e/img/fillers.png')] bg-no-repeat filter blur-sm opacity-50"></div> */}
         <div className="absolute inset-0 left-0 right-0 -top-28 w-full bg-gradient-to-b from-purple-400/30 to-white">
          <img
            src="https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/fillers.png"
            className="hidden md:block w-full opacity-50"
          />
          <img
            src="https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/responsive_stars.png"
            className="block md:hidden w-full h-auto opacity-50 object-cover"
          />
        </div>
        <div className="hidden sm:block">
          <div className="sticky top-0  z-40">
      <Navbar />
      </div>
        </div>
      <div className={` ${isNavbarOpen ? "blur-sm": ''}  `}>      
        <div className="container  px-0 sm:px-4 relative max-w-5xl mx-auto h-full">
          <div className=" p-0 sm:p-4 h-full">
            <div className=" hidden sm:block">
              <Stepper
              isCart={true}
                steps={steps}
                currentStep={step - 1}
                items={items}
                onClick={(index) => {
                  const newStep = index + 1;
                 if(items?.length > 0){
                  if (newStep === 1) {
                    navigate("/cart");
                  } else if (newStep === 2) {
                    // window.location.reload();
                      navigate(`/cart/delivery`);
                  } else if (newStep === 3) {
                    navigate("/cart/checkout");
                  
                  }
                  setStep(newStep);
                }}
              }
              />
            </div>
            {step == 1 && (
              <div className="py-0 sm:py-4 h-full">
                <YourCart setStep={setStep} setBookId={setBookId} setCoupon={setCoupon} coupon={coupon} />
              </div>
            )}
            {step == 2 && (
              <div className="py-0 sm:py-4 ">
                <ShippingForm
                  setStep={setStep}
                  bookId={bookId}
                  setBookId={setBookId}
                  idCart={idCart}
                />
              </div>
            )}
            {step == 3 && (
              <div className="  py-0 sm:py-4  h-full">
                <CartCheckout
                  setStep={setStep}
                  bookId={bookId}
                  idCart={idCart}
                  couponSave={coupon}
                />
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
