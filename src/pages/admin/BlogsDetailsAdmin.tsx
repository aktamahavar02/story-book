import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BlogCards from "@/components/ui/BlogCards.js";
import { FaCaretDown } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { staticBlogs, staticAdmin } from "../../utils/staticData";

const BlogsDetailsAdmin = () => {
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const [isTocOpen, setIsTocOpen] = useState(false);

  // Static data
  const admin = true; // Always admin in admin panel
  const profileData = staticAdmin;
  const blogGetData = staticBlogs;
  const data = staticBlogs.find(blog => blog.id === id) || staticBlogs[0];
  const isLoading = false;

  const d1 = new Date(data?.updatedAt);
  const formatted1 = d1.toLocaleDateString("en-GB")?.replace(/\//g, "-");
  let str = data?.content;

  str = str?.replace(/&lt;/g, "<")?.replace(/&gt;/g, ">");
  const headers = [];
  let counter = 0;

  str = str?.replace(/<(h2|h3)>(.*?)<\/\1>/g, (match, tag, text) => {
    counter++;
    const id = `section-${counter}`;

    const cleanText = text.replace(/<[^>]+>/g, "");

    headers.push({ id, text: cleanText, tag });
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  const isNavbarOpen = false;
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>{data?.title}</title>
        <meta
          name="description"
          content="Create a unique book starring your very own pet! The perfect personalized gift for any child. Learn how you can create this magical story yourself!"
        />
        <link
          rel="canonical"
          href={`${window.location.origin}/${location.pathname}`}
        />
      </Helmet>
      {isLoading ? (
        <div className="flex items-center justify-center my-20">
          <img src={loadingImage} alt="image" className="w-28" />
        </div>
      ) : (
        <div
          className={`${"bg-gradient-to-r from-gray-50"}  min-h-screen  mt-[66px]`}
        >
          <div className={` ${isNavbarOpen ? "blur-sm" : ""}  `}>
            <div className="max-w-7xl mx-auto  pt-6 font-figTree">
              <div className="px-3">
                <div className="mb-5 text-lg text-[#212529BF] font-semibold ">
                  <span
                    className="text-[#465FFF]  
               cursor-pointer font-figTree"
                    onClick={() => {
                      if (location?.state === 1) {
                        navigate("/");
                      } else if (admin) {
                        navigate("/admin/blogs");
                      } else {
                        navigate("/blog");
                      }
                    }}
                  >
                    Blog
                  </span>{" "}
                  / {data?.title}
                </div>

                <div className="mb-[15px] sm:mb-6 text-[26px]  sm:text-[38px] font-semibold text-[#333]">
                  {data?.title}
                </div>
                <div className="flex">
                  <div className="max-w-3xl w-full h-full flex flex-col items-center">
                    <div className="relative w-full mb-6">
                      <img
                        src={data?.image}
                        alt={"image"}
                        onLoad={() => setLoaded(true)}
                        loading="lazy"
                        decoding="async"
                        className={`w-full  max-h-[250px] sm:max-h-[460px] object-cover rounded-[28px] transition-opacity duration-500 ${
                          loaded ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>

                    <div className="mb-1 w-full">
                      {/* Mobile: Dropdown */}
                      <div className="block sm:hidden">
                        <div
                          className="mb-2 text-base font-bold font-figTree   cursor-pointer flex items-center justify-center gap-2 bg-white border-2 border-blue-500 text-[#465FFF]  p-3 rounded-full transition-colors h-[40px]"
                          onClick={() => setIsTocOpen(!isTocOpen)}
                        >
                          <span>Table of Contents</span>
                          <FaCaretDown />
                        </div>

                        {/* Dropdown Content with smooth animation */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out    rounded-[28px] bg-white  ${
                            isTocOpen
                              ? "max-h-[800px] opacity-100 mb-4"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="py-4 space-y-2  px-[15px]   ">
                            {headers?.map((h, i) => {
                              return (
                                <div
                                  key={h.id}
                                  className={`cursor-pointer hover:text-[#465FFF]  text-blue-400 text-[15px]  font-figTree transition-colors 
                                 ${
                                   h?.tag === "h2"
                                     ? "font-bold !mt-4"
                                     : h?.tag === "h3"
                                     ? "font-normal"
                                     : ""
                                 } 
                                ${(i + 1) % 4 === 0 ? "mb-4" : ""}`}
                                  onClick={() => scrollToSection(h.id)}
                                >
                                  {h.text}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="w-full p-[30px] [&_h2]:text-[#465FFF]  [&_h2]:text-[28px] mb-[50px]  [&_h2]:mb-2 [&_h2]:font-semibold rounded-[28px] text-[#333]  [&_h3]:text-black [&_h3]:mt-1  [&_h3]:text-[20px]  [&_p]:mb-3 [&_p]:text-[17px] [&_a]:!text-[#465FFF]    bg-white"> */}
                    <div
                      className="w-full px-[15px] py-[20px] sm:p-[30px] [&_h2]:text-[#465FFF]  [&_h2]:font-normal [&_h2]:text-[25px] [&_h2]:sm:text-[28px]  mb-[20px] [&_h2]:mb-2
                 rounded-[28px] text-[#333] [&_h3]:text-black [&_h3]:mt-5 [&_h3]:text-[20px] [&_p]:mb-3 [&_p]:text-[17px]
               [&_a]:!text-[#465FFF]    [&_strong]:!font-[800] bg-white"
                    >
                      <div
                        className=""
                        dangerouslySetInnerHTML={{ __html: str }}
                      />
                    </div>
                  </div>

                  <div className="px-0 sm:px-6 sm:sticky sm:top-4 sm:self-start text-[#333] ">
                    <div className="mb-2 text-lg font-bold font-figTree hidden sm:block">
                      Last updated on
                    </div>
                    <div className="mb-7 text-base font-figTree hidden sm:block">
                      {formatted1}
                    </div>

                    <div className="mb-6">
                      <div className="hidden sm:block text-[#333] ">
                        <div className="text-lg font-bold font-figTree">
                          Table of Contents
                        </div>
                        <div className="space-y-1">
                          {headers?.map((h, i) => {
                            return (
                              <div
                                key={h.id}
                                className={`cursor-pointer hover:text-[#465FFF]  text-[#333] text-[15px] font-figTree transition-colors          
                             ${
                               h?.tag === "h2"
                                 ? "font-normal !mt-4"
                                 : h?.tag === "h3"
                                 ? "font-light"
                                 : ""
                             } 
                             ${(i + 1) % 4 === 0 ? "" : ""}
                           `}
                                onClick={() => scrollToSection(h.id)}
                              >
                                {h.text}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-2 text-lg font-bold font-figTree block sm:hidden px-3 ">
                Last updated on
              </div>
              <div className="mb-8 text-base font-figTree block sm:hidden  px-3">
                {formatted1}
              </div>

              <div className=" pb-[50px] px-3">
                <div
                  className="text-[#465FFF]  font-semibold text-[26px] sm:text-[34px]
               cursor-pointer font-figTree py-[15px]"
                >
                  More articles
                </div>
                <div
                  className={`grid grid-cols-1${
                    admin ? " md:grid-cols-2" : "md:grid-cols-3"
                  } lg:grid-cols-3 gap-4 xl:gap-8`}
                >
                  {blogGetData?.slice(0, 3)?.map((item, index) => {
                    return (
                      <BlogCards
                        key={index}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        item={item}
                        isAdmin={true}
                        isList={true}
                        onClick={() => {
                          if (admin) {
                            navigate(`/admin/blog/${item?.id}`);
                            window.location.href = `/admin/blog/${item?.id}`;
                          } else if (user) {
                            navigate(`/blog/${item?.id}`);
                            window.location.href = `/blog/${item?.id}`;
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            {/* <div className="lg:pt-0 pt-48 md:pt-0 [@media(min-width:650px)_and_(max-width:767px)]:pt-[330px] [@media(min-width:550px)_and_(max-width:649px)]:pt-[280px]"> */}

            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogsDetailsAdmin;
