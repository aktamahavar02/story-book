import loading from "../../assets/images/loading-black.gif";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center my-6  h-full ">
      <div className=" w-24 h-24">
        <img
          src={loading}
          alt="Loading..."
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

