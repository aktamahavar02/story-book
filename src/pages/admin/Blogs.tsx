import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Pagination from "./Pagination.js";
import { Helmet } from "react-helmet-async";
import { staticBlogs, staticAdmin } from "../../utils/staticData";
const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Static data
  const profileData = staticAdmin;
  const admin = true;
  const isLoading = false;
  const blogData = staticBlogs;
  const status = { data: { totalBlog: staticBlogs.length, publishBlog: staticBlogs.length } };
  const totalPages = Math.ceil(staticBlogs.length / 10) || 1;
  const totalResults = staticBlogs.length;
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);


  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
  
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };


  return (
    <div className=" p-2 sm:p-6 font-figTree   mt-[66px]">
      <Helmet>
        <title>
        Blog -
          StarMe
        </title>
        <meta
          name="description"
          content="Visit our blog for inspiring articles, tips, and stories about magical children's books. Get inspired and dive into a world full of stories!"
        />
        <link
          rel="canonical"
          href={`${window.location.origin}/${location.pathname}`}
        />
      </Helmet>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Total Blogs Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4  border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Total Blogs</h3>
              <p className="text-4xl font-bold text-gray-900 mt-1">
                {status?.data?.totalBlog || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-xl text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Published Blogs Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4  border border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-1 mr-2">Published Blogs</h3>
              <p className="text-4xl font-bold text-gray-900 mt-1">
                {status?.data?.publishBlog || 0}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-xl text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

       
      </div>

    
      <div className="flex justify-between items-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Blog Management</h2>
          <p className="text-gray-600">Manage and view all blog posts</p>
        </div>
        <button
          type="submit"
          onClick={() => {
            navigate("/admin/create");
          }}
          className="hover:shadow-lg hover:scale-105 transition-all font-semibold text-[#465FFF]   font-figTree   bg-[#ECF3FF] text-base py-1  [@media(min-width:1px)_and_(max-width:374px)]:px-1 px-4 rounded-sm"
        >
          Add Blog
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center my-10">
          <img src={loadingImage} alt="image" className="w-28" />
        </div>
      ) : (
        <div className="overflow-hidden mb-4 bg-white rounded-lg">
          <div className="max-h-[calc(100vh-375px)] overflow-y-auto scrollbar-hidden">
            {blogData?.map((post, index) => {
              console.log("post===", post?.createdAt)
              return(
                <div
                  key={post.id || index}
                  className="group flex flex-row items-start gap-4 p-4 rounded-md transition-all duration-300 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={post.image}
                      alt="blog"
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
  
                  <div className="flex-1 min-w-0 relative flex flex-col justify-start items-start">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base sm:text-[24px] font-figTree font-extrabold text-[#212529] sm:mb-3 transition-colors duration-300 group-hover:text-[#465FFF] line-clamp-2 text-left">
                        {post.title}
                      </h2>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === index ? null : index);
                        }}
                        className="cursor-pointer py-2 pl-4 hover:bg-gray-100 rounded-full relative z-10"
                      >
                        <BsThreeDotsVertical size={20} />
                      </div>
                    </div>
                    {openMenuId === index && (
                      <div className="absolute right-0 top-8 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
                        <button
                          onClick={() => navigate(`/admin/edit/${post?.id}`)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex gap-2 items-center"
                        >
                          <FiEdit /> Edit
                        </button>
                        <button
                          onClick={() => {
                            // Static implementation - no actual delete
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex gap-2 items-center"
                        >
                          <RiDeleteBin5Line /> Delete
                        </button>
                      </div>
                    )}
  
                    <div className="text-[#333333] text-sm sm:text-[17px] line-clamp-2 font-figTree text-left sm:mb-2">
                      {post.description}
                    </div>
  
                    <div className="flex items-center justify-between w-full flex-wrap">
                      <button
                        className="text-[#465FFF] font-bold text-base hover:underline flex items-center gap-1 font-figTree transition-all duration-300"
                        onClick={() => {
                          navigate(`/admin/blog/${post?.id}`, {
                            state: {
                              admin: 1,
                            },
                          });
                        }}
                      >
                        Read more{" "}
                        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>

                      <div>{timeAgo(post?.createdAt)}
                        </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalResults={totalResults}
          />
        </div>
      )}

    
    </div>
  );
};

export default Blogs;
