import LockIcon from "../../assets/svgs/lockIcon";
import payment from "../../assets/images/magic-book.png";
import { useSelector } from "react-redux";
import BasicLoader from "../ui/basicLoader";

const PaymentPopup = ({
  onCancel,
  onConfirm,
  isLoad = false
}: {
  onCancel: () => void;
  onConfirm: () => void;
  isLoad: boolean;
}) => {
    const isLoading = useSelector((state: any) => state?.bookTemplate?.isLoading);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 pt-20">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-80 text-center flex flex-col items-center gap-4">
  
<LockIcon width={70} height={70} useGradient={true}/>
{/* <img src={payment} alt="payment" width={70} height={70}/> */}

        <h2 className="text-2xl font-semibold text-gray-800 font-figTree">
          Make this magical story real
        </h2>

        <p className="text-gray-600 font-figTree text-base">
          Continue to payment to unlock the full book and print your child’s
          personalized treasure.
        </p>

        <div className="flex flex-col  gap-3 w-full justify-center mt-4">
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-500 h-[40px]
                       font-figTree text-white text-sm py-2 px-4
                       rounded-xl transition"
          >
         {isLoad ? <div className="flex gap-4 items-center justify-center"><BasicLoader color="fill-purple-500" /> Please Wait.... </div>: "Create My Book"}
          </button>

          <button
            onClick={onCancel}
            className="w-full sm:w-auto border border-gray-300 bg-white h-[40px]
                       font-figTree text-sm py-2 px-4
                       rounded-xl transition"
          >
           Back To Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
