import BlogCards from "@/components/ui/BlogCards";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blogGet, blogGetUser } from "../../store/slices/bookTemplateSlice.js";
import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar.js";
import Footer from "@/components/ui/Footer.js";
import { Helmet } from "react-helmet-async";
import GeoHelmet from "@/components/ui/GeoHelmet.js";

const BlogList = ({ isDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector((state: any) => state?.auth?.profile);
  const admin = profileData?.role === "admin";
  const user = profileData?.role === "user";

  useEffect(() => {
    if (admin) {
      dispatch(blogGet({ limit: 8 }));
    } else {
      dispatch(blogGetUser({ limit: 8 }));
    }
  }, [admin, user, dispatch]);
  const blogList = useSelector((state) => state?.bookTemplate?.blogGet);
  const blogListUser = useSelector((state) => state?.bookTemplate?.blogGetUser);
  const blogData = blogList?.data?.results;
  const blogDataUser = blogListUser?.data?.results;
 const isNavbarOpen = useSelector((state) => state?.bookTemplate?.isNavbarOpen);
  const blogGetData = admin ? blogData : blogDataUser;


  const createBlogListSchema = () => {
    const baseUrl = "https://www.starmebooks.com";
    const blogs = blogGetData || [];
    const totalBlogs = blogs.length;

    return {
      "@context": "https://schema.org",
      "@graph": [
        // Blog Schema - Main blog page
        {
          "@type": "Blog",
          "@id": `${baseUrl}/blog#blog`,
          url: `${baseUrl}/blog`,
          name: "StarMe Blog - Personalized Children's Books",
          description: "Read our latest articles full of inspiration, tips, and stories about magical children's books.",
          publisher: {
            "@id": `${baseUrl}/#organization`,
          },
          blogPost: blogs.map((blog) => ({
            "@type": "BlogPosting",
            "@id": `${baseUrl}/blog/${blog?.id}`,
            headline: blog?.title,
            description: blog?.description,
            url: `${baseUrl}/blog/${blog?.id}`,
            image: blog?.image || `${baseUrl}/og-image.jpg`,
            datePublished: blog?.createdAt || blog?.publishedDate,
            dateModified: blog?.updatedAt || blog?.modifiedDate,
            author: {
              "@type": "Organization",
              "@id": `${baseUrl}/#organization`,
            },
            publisher: {
              "@id": `${baseUrl}/#organization`,
            },
          })),
        },

        // CollectionPage Schema - Blog listing page
        {
          "@type": "CollectionPage",
          "@id": `${baseUrl}/blog#webpage`,
          url: `${baseUrl}/blog`,
          name: "Blog - StarMe",
          description: "Visit our blog for inspiring articles, tips, and stories about magical children's books. Get inspired and dive into a world full of stories!",
          
          isPartOf: {
            "@id": `${baseUrl}/#website`,
          },
          breadcrumb: {
            "@id": `${baseUrl}/blog#breadcrumb`,
          },
          mainEntity: {
            "@id": `${baseUrl}/blog#blog`,
          },
          about: [
            {
              "@type": "Thing",
              name: "Children's Books",
            },
            {
              "@type": "Thing",
              name: "Personalized Storybooks",
            },
            {
              "@type": "Thing",
              name: "Parenting Tips",
            },
          ],
        },

        // ItemList Schema - List of blog posts
        {
          "@type": "ItemList",
          "@id": `${baseUrl}/blog#itemlist`,
          numberOfItems: totalBlogs,
          itemListElement: blogs.map((blog, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "BlogPosting",
              "@id": `${baseUrl}/blog/${blog?.id}`,
              headline: blog?.title,
              description: blog?.description,
              image: blog?.image || `${baseUrl}/og-image.jpg`,
              url: `${baseUrl}/blog/${blog?.id}`,
              author: {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`,
              },
              publisher: {
                "@id": `${baseUrl}/#organization`,
              },
              datePublished: blog?.createdAt || blog?.publishedDate,
              dateModified: blog?.updatedAt || blog?.modifiedDate,
            },
          })),
        },

        // WebPage Schema
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/blog#page`,
          url: `${baseUrl}/blog`,
          name: "Blog - StarMe Personalized Books",
          description: "Latest articles about personalized children's books, parenting tips, and storytelling inspiration",
          isPartOf: {
            "@id": `${baseUrl}/#website`,
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: blogs[0]?.image || `${baseUrl}/og-image.jpg`,
            width: 1200,
            height: 630,
          },
          potentialAction: {
            "@type": "ReadAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/blog`,
            },
          },
        },

        // BreadcrumbList Schema
        {
          "@type": "BreadcrumbList",
          "@id": `${baseUrl}/blog#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${baseUrl}/blog`,
            },
          ],
        },

        // Organization Schema
        {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          name: "StarMe",
          url: baseUrl,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.svg`,
            width: 250,
            height: 60,
          },
          description: "Create personalized children's storybooks where kids become the heroes",
       
        },

        // WebSite Schema
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          url: baseUrl,
          name: "StarMe Personalized Books",
          description: "Create custom kids' storybooks where your child becomes the hero",
          publisher: {
            "@id": `${baseUrl}/#organization`,
          },
          
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
      ],
    };
  };
  return (
    <>
      {!isDetails &&   <div className="sticky top-0  z-40">
       <div className="sticky top-0  z-40">
       <GeoHelmet
            title="Blog - StarMe"
            description="Visit our blog for inspiring articles, tips, and stories about magical children's books. Get inspired and dive into a world full of stories!"
            keywords="children's books blog, personalized books articles, parenting tips, storytelling ideas, custom storybooks, reading inspiration"
            type="website"
            schema={createBlogListSchema()}
          />
      <Navbar />
      </div>
      </div>}
      <div className={` ${isNavbarOpen ? "blur-sm": ''}  `}>    
      <div className="bg-gradient-to-r from-pink-50 px-3 xl:px-0 ">
        <div className="max-w-7xl mx-auto borer-5 border-red-600 py-5  ">
          {!isDetails && (
            <>
              <div className=" text-[28px] sm:text-[38px] font-extrabold font-marcellus mb-2 text-start text-[#333] ">
                Blog
              </div>

              <div className="text-lg md:text-xl font-figTree   text-start text-[#333] font-light mb-4">
                Read our latest articles full of inspiration, tips, and stories
                about magical children's books.
              </div>
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-3 gap-6">
            {blogGetData?.map((item, index) => {
              return (
                <BlogCards
                  key={index}
                  isList={true}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  item={item}
                  onClick={() => {
                    navigate(`/blog/${item?.id}`);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Footer/>
      </div>
    </>
  );
};

export default BlogList;
