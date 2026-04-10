import ExploreSection from "@/components/ui/ExploreSection";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  supportList,
  supportData,
} from "../../store/slices/bookTemplateSlice.js";
import { IoMdClose } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { Helmet } from "react-helmet-async";

const SupportPage = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [view, setView] = useState(false);
  const [errors, setErrors] = useState({
    category: "",
    description: "",
  });
  const [touched, setTouched] = useState({
    category: false,
    description: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(supportList({}));
  }, []);

  const listSupportData = useSelector(
    (state) => state?.bookTemplate?.supportRes
  );

  const newData = listSupportData?.data?.map((data) => ({
    group: data?.categoryType,
    items: data?.result?.flatMap((item) => item?.name),
  }));

  const filteredOptions = newData?.map((group) => {
    return {
      ...group,
      items: group?.group?.toLowerCase()?.includes(search?.toLowerCase())
        ? group?.items
        : group.items?.filter((item) =>
            item.toLowerCase().includes(search.toLowerCase())
          ),
    };
  });

  const validateForm = () => {
    const newErrors = {
      category: "",
      description: "",
    };

    if (!selectedValue.trim()) {
      newErrors.category = "Please select a category";
    }

    if (!areaValue.trim()) {
      newErrors.description = "Please enter your message";
    } else if (areaValue.trim().length < 10) {
      newErrors.description = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return !newErrors.category && !newErrors.description;
  };

  const handleClick = () => {
    setTouched({
      category: true,
      description: true,
    });

    if (validateForm()) {
      dispatch(
        supportData({
          category: selectedValue,
          description: areaValue,
          onSuccess: () => {
            // Reset form after successful submission
            setSelectedValue("");
            setAreaValue("");
            setSearch("");
            setErrors({ category: "", description: "" });
            setTouched({ category: false, description: false });
            setView(true);
          },
        })
      );
    }
  };

  const handleCategorySelect = (item) => {
    setOpen(false);
    setSelectedValue(item);
    setTouched({ ...touched, category: true });
    if (item) {
      setErrors({ ...errors, category: "" });
    }
  };

  const handleDescriptionChange = (e) => {
    setAreaValue(e.target.value);
    if (touched.description && e.target.value) {
      setErrors({ ...errors, description: "" });
    }
  };

  const handleDescriptionBlur = () => {
    setTouched({ ...touched, description: true });
    validateForm();
  };

  useEffect(() => {
    if (view) {
      const timer = setTimeout(() => {
        setView(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [view]);
  const isNavbarOpen = useSelector(
    (state) => state?.bookTemplate?.isNavbarOpen
  );
  return (
    <div>
      <Helmet>
        <title> Support - StarMe</title>
        <meta
          name="description"
          content="Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child’s imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
        />
      </Helmet>
      <div className="sticky top-0  z-40">
        <Navbar />
      </div>{" "}
      <div className={` ${isNavbarOpen ? "blur-sm" : ""}  `}>
        <div className="relative isolate">
          <div className="absolute inset-0 left-0 right-0 -top-28 w-full z-0 pointer-events-none">
            <img
              src="https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/fillers.png"
              className="hidden md:block w-full opacity-50"
            />
            <img
              src="https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/responsive_stars.png"
              className="block md:hidden w-full h-auto opacity-50 object-cover"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto mt-6 sm:mt-4 p-4 sm:p-8 ">
            <h1 className="text-3xl font-marcellus text-[#000] text-center  mb-8">
              Support
            </h1>
            <div className="flex flex-col-reverse gap-8 md:flex-row rounded-lg p-4 z-40 bg-white">
              <div className=" flex flex-col-reverse gap-8 md:flex-row md:items-end w-full pt-5 relative rounded-lg border border-gray-200 z-50 bg-white">
                <div className="w-full md:w-1/2 bg-white mt-6">
                  <img
                    src="https://resources.wonderwraps.com/f6726c80-77e8-49bb-80f6-3d17fe0a8124/img/support_image.png"
                    alt="Support Graphic"
                    className="rounded-lg object-contain w-full max-h-[235px] md:max-h-[377px]"
                  />
                </div>
                <div className="w-full md:w-1/2 py-2 px-4 flex flex-col justify-center  bg-white">
                  <h2 className=" text-3xl font-marcellus text-black mb-2 sm:mb-4 text-left md:text-left">
                    <span className="">How can we help</span>?
                  </h2>
                  <p className="text-neutral-600 text-lg mb-4 sm:mb-6 text-left md:text-left font-figTree">
                    Let us know if there is anything we can do for you
                  </p>
                  <div>
                    <div className="relative inline-block text-left w-full mb-7">
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Select a category..."
                          value={selectedValue}
                          onClick={() => setOpen(!open)}
                          className={`  ${
                            touched.category && errors.category
                              ? ""
                              : "border-gray-300"
                          }  placeholder:text-[15px] block space-x-1 relative w-full bg-white text-gray-600 border border-gray-200 rounded-md shadow-sm pl-2 pr-10 h-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-200 focus:border-purple-600 sm:text-sm`}
                          readOnly
                        />
                        <div
                          className=" -top-0 ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                          onClick={() => setOpen(!open)}
                        >
                          <IoChevronDownOutline />
                        </div>
                      </div>
                      {touched.category && errors.category && (
                        <p className="text-red-500 text-sm mt-1  font-figTree">
                          {errors.category}
                        </p>
                      )}
                      {open && (
                        <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                          <div className="p-2 border-b border-gray-200 flex gap-2">
                            <div className="relative flex-1">
                              <input
                                type="text"
                                placeholder="Search a categories.."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-2 block border-0 focus:border-white focus:ring-0 rounded-md sm:text-sm w-full mb-1"
                              />
                              {search && (
                                <button
                                  onClick={() => setSearch("")}
                                  className="absolute right-1 top-1/2 -translate-y-1/2  mr-2 bg-gray-100 text-gray-900 hover:text-gray-500 rounded text-xs px-2 "
                                >
                                  <IoMdClose size={16} />
                                </button>
                              )}
                            </div>
                            {selectedValue && (
                              <button
                                className="text-xxs border border-gray-100 px-2 bg-gray-100 whitespace-nowrap"
                                onClick={() => {
                                  setSelectedValue("");
                                  setSearch("");
                                }}
                              >
                                Reset
                              </button>
                            )}
                          </div>
                          <div className="max-h-36 overflow-y-auto">
                            {filteredOptions?.map(
                              (group) =>
                                group.items.length > 0 && (
                                  <div key={group.group}>
                                    <div className="px-2 py-2 text-sm font-figTree  font-medium text-gray-700 uppercase border-b border-gray-300 bg-gray-100">
                                      {group.group}
                                    </div>
                                    {group.items.map((item) => (
                                      <div
                                        key={item}
                                        className={`flex items-center justify-between ${
                                          selectedValue === item
                                            ? "bg-blue-100"
                                            : "bg-white"
                                        }`}
                                      >
                                        <button
                                          onClick={() =>
                                            handleCategorySelect(item)
                                          }
                                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm font-figTree"
                                        >
                                          {item}
                                        </button>
                                        {selectedValue === item && (
                                          <div className="mr-1 text-blue-400">
                                            <MdDone />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Enter your message here..."
                      value={areaValue}
                      onChange={handleDescriptionChange}
                      onBlur={handleDescriptionBlur}
                      className={` block w-full p-3 border border-gray-300 rounded-md  font-figTree shadow-sm focus:outline-none focus:ring-purple-200 focus:border-purple-600 text-base text-gray-600 placeholder-gray-400 sm:text-sm ${
                        touched.description && errors.description
                          ? ""
                          : "border-gray-300 focus:ring-2 focus:ring-purple-300"
                      } p-3 h-32  `}
                    ></textarea>
                    {touched.description && errors.description && (
                      <p className="text-red-500 text-sm mt-1  font-figTree">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className={`${view && "flex gap-4"} `}>
                    {view && (
                      <div className="bg-purple-100  text-purple-800 p-4 rounded-md">
                        We have received vour message, and the support team will
                        contact vou shony vla emall
                      </div>
                    )}
                    <div className="text-center md:text-end pb-16 sm:pb-0  sm:my-6">
                      <button
                        className="px-6 h-10 inline-flex items-center justify-center  bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600  text-sm text-white py-2 rounded  w-28 font-figTree transition-all hover:shadow-lg border  ease-in-out duration-300 sm:w-auto"
                        type="submit"
                        onClick={handleClick}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ExploreSection />
        <div className="lg:pt-0 pt-48 md:pt-0 [@media(min-width:650px)_and_(max-width:767px)]:pt-[330px] [@media(min-width:550px)_and_(max-width:649px)]:pt-[280px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
