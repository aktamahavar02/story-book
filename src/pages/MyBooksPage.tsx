import { useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import BookCard from "@/components/ui/BookCard";
import Footer from "@/components/ui/Footer";
import ExploreSection from "@/components/ui/ExploreSection";
import draftImage from "../assets/images/drafImage.jpg";
import { useEffect, useState } from "react";
import {
  myBooksGet,
  littleGet,
  addCart,
  bookTemplate,
  personalizedBookCart,
} from "../../store/slices/bookTemplateSlice.js";
import loadingImage from "../assets/images/purple.gif";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@/components/ui/Loader.js";
import BasicLoader from "@/components/ui/basicLoader.js";
import GeoHelmet from "@/components/ui/GeoHelmet.js";

const MyBooksPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const loadingBook = useSelector((state) => state?.bookTemplate?.isBook);
  const handleNavigation = (path: string) => {
    navigate(path);
    setTimeout(() => window.scrollTo(0, 0), 100);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(myBooksGet({ page: currentPage, limit: 12 }));
  }, [currentPage]);
  // dispatch(profile());
  useEffect(() => {
    dispatch(littleGet({}));
  }, []);
  const myBook = useSelector((state) => state?.bookTemplate?.myBooksData);

  const loading = useSelector((state) => state?.bookTemplate?.isLoading);
  const myBookData = myBook?.results || [];

  const myBookDatas = (myBookData || [])

    .filter((card) => card?.genreId?.name === "Educational")
    .slice(0, 4);

  const littleData = useSelector((state) => state?.bookTemplate?.littleData);
  const boyBooks = (littleData || [])
    .filter((card) => card?.idealFor === "boy")
    .slice(0, 4);

  useEffect(() => {
    const queryParams = {
      page: 1,
      limit: 10,
    };

    dispatch(bookTemplate(queryParams)); // ✅ FLAT PARAM OBJECT
  }, []);

  const bookTemplates = useSelector(
    (state) => state?.bookTemplate?.bookTemplateData,
  );

  const bookTemplatesDate = bookTemplates?.results || [];
  const isCartLoading = useSelector(
    (state) => state?.bookTemplate?.isCartLoading,
  );

  const [loadingCardId, setLoadingCardId] = useState(null);

  const [updatedCards, setUpdatedCards] = useState({});
  const handleCart = (card) => {
    if (loadingCardId === card?.id) {
      return <BasicLoader />;
    }
    // Check local updated state first
    const isInCart = updatedCards[card?.id]?.isBookInCart ?? card?.isBookInCart;

    if (card?.paymentStatus === "pending" && !isInCart) {
      return "Add to Cart";
    } else if (card?.paymentStatus === "pending" && isInCart) {
      return "Continue Order";
    } else if (card?.paymentStatus === "paid") {
      return card?.isPreview ? "Order Now" : "View Personalize";
    }
  };

  const handleClick = (card) => {
    if (card?.paymentStatus === "pending" && !card.isBookInCart) {
      setLoadingCardId(card?.id);
      dispatch(
        addCart({
          id: card?.id,
          isBookInCart: true,
          onSuccess: () => {
            // Immediately update local state
            navigate("/cart");
            setUpdatedCards((prev) => ({
              ...prev,
              [card?.id]: { ...card, isBookInCart: true },
            }));
            setLoadingCardId(null);
            dispatch(myBooksGet({ page: currentPage, limit: 12 }));
            dispatch(personalizedBookCart());
          },
          onError: () => {
            setLoadingCardId(null);
          },
        }),
      );
    } else if (card?.paymentStatus === "pending" && card.isBookInCart) {
      navigate("/cart");
    } else if (card?.paymentStatus === "paid") {
      navigate(`/setup/${card?.id}`);
    }
  };
  const isNavbarOpen = useSelector(
    (state) => state?.bookTemplate?.isNavbarOpen,
  );
  const currencyData = useSelector((state) => state?.bookTemplate?.currency);
  // Create schema for My Books page
  const createMyBooksSchema = () => {
    const baseUrl = "https://www.starmebooks.com";
    
    // User's books data with fallbacks
    const myBooks = myBookData || [];
    const bookTemplates = bookTemplatesDate || [];
    const totalBooks = myBooks.length;
    
    // Pagination info
    const currentPageNum = currentPage || 1;
    const totalPagesNum = totalPages || 1;
  
    return {
      "@context": "https://schema.org",
      "@graph": [
        // WebPage Schema - Main page structure
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/my-books#webpage`,
          url: `${baseUrl}/my-books`,
          name: "My Books - Personal Library - StarMe",
          description: totalBooks > 0 
            ? `Manage your collection of ${totalBooks} personalized ${totalBooks === 1 ? 'storybook' : 'storybooks'}`
            : "Start creating your personalized storybook collection",
          isPartOf: {
            "@id": `${baseUrl}/#website`,
          },
          breadcrumb: {
            "@id": `${baseUrl}/my-books#breadcrumb`,
          },
          
          ...(totalBooks > 0 && {
            mainEntity: {
              "@id": `${baseUrl}/my-books#collection`,
            },
          }),
          potentialAction: [
            {
              "@type": "CreateAction",
              name: "Create New Book",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/template-selection`,
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform"
                ]
              },
              description: "Create a new personalized storybook",
            },
            {
              "@type": "ViewAction",
              name: "Browse Templates",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/template-selection`,
              },
            },
          ],
        },
  
        // ProfilePage Schema - User's personal book collection
        {
          "@type": "ProfilePage",
          "@id": `${baseUrl}/my-books#profile`,
          name: "My Personalized Books Collection",
          description: "User's personal library of custom children's storybooks",
          url: `${baseUrl}/my-books`,
          mainEntity: {
            "@id": `${baseUrl}/my-books#collection`,
          },
        },
  
        // CollectionPage Schema - User's Book Collection
        ...(totalBooks > 0 ? [{
          "@type": "CollectionPage",
          "@id": `${baseUrl}/my-books#collection`,
          name: "My Personalized Books",
          description: `Collection of ${totalBooks} personalized ${totalBooks === 1 ? 'storybook' : 'storybooks'}`,
          url: `${baseUrl}/my-books`,
          numberOfItems: totalBooks,
          hasPart: myBooks.map((book, index) => ({
            "@type": "Book",
            "@id": `${baseUrl}/book/${book?.id}`,
            name: book?.chapterTitle || book?.title || "Personalized Storybook",
            description: book?.storySummary || `A personalized adventure featuring ${book?.childName || "your child"}`,
            image: book?.coverPageImage || book?.coverImage || `${baseUrl}/og-image.jpg`,
            bookFormat: "https://schema.org/Hardcover",
            inLanguage: "en",
            position: index + 1,
            author: {
              "@type": "Organization",
              name: "StarMe Books",
            },
            ...(book?.childName && {
              about: {
                "@type": "Person",
                name: book.childName,
                description: "Main character in this personalized story",
              },
            }),
            ...(book?.childAge && {
              audience: {
                "@type": "PeopleAudience",
                suggestedAge: book.childAge,
                audienceType: "Children",
              },
            }),
            ...(book?.gender && {
              keywords: `personalized book, ${book.gender} character, children's story`,
            }),
            publisher: {
              "@type": "Organization",
              name: "StarMe",
              url: baseUrl,
            },
            ...(book?.paymentStatus === "paid" && {
              potentialAction: {
                "@type": "ReadAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${baseUrl}/setup/${book?.id}`,
                },
              },
            }),
          })),
        }] : []),
  
        // ItemList Schema - User's Books (for better list representation)
        ...(totalBooks > 0 ? [{
          "@type": "ItemList",
          "@id": `${baseUrl}/my-books#booklist`,
          name: "User's Book Collection",
          description: `${totalBooks} personalized ${totalBooks === 1 ? 'book' : 'books'} in collection`,
          numberOfItems: totalBooks,
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          itemListElement: myBooks.map((book, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Book",
              name: book?.chapterTitle || book?.title || "Personalized Storybook",
              image: book?.coverPageImage || book?.coverImage,
              description: book?.storySummary,
              url: book?.paymentStatus === "paid" 
                ? `${baseUrl}/setup/${book?.id}`
                : `${baseUrl}/book/${book?.id}`,
              ...(book?.paymentStatus && {
                orderStatus: book.paymentStatus === "paid" 
                  ? "https://schema.org/OrderDelivered"
                  : "https://schema.org/OrderProcessing",
              }),
            },
          })),
        }] : []),
  
        // Recommended Templates - ItemList Schema
        {
          "@type": "ItemList",
          "@id": `${baseUrl}/my-books#recommended`,
          name: "Recommended Book Templates",
          description: "New book templates to create personalized stories",
          numberOfItems: bookTemplates.length,
          itemListOrder: "https://schema.org/ItemListUnordered",
          itemListElement: bookTemplates.slice(0, 3).map((template, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Book",
              "@id": `${baseUrl}/template/${template?.id}`,
              name: template?.title || "Personalized Book Template",
              description: template?.description || "Create a custom storybook",
              image: template?.coverImage || `${baseUrl}/og-image.jpg`,
              bookFormat: "https://schema.org/Hardcover",
              inLanguage: "en",
              author: {
                "@type": "Organization",
                name: "StarMe Books",
              },
              genre: template?.genre || "Children's Fiction",
              ...(template?.ageRange && {
                audience: {
                  "@type": "PeopleAudience",
                  suggestedMinAge: template.ageRange.minAge,
                  suggestedMaxAge: template.ageRange.maxAge,
                  audienceType: "Children",
                },
              }),
              ...(template?.idealFor && {
                keywords: `personalized book, ${template.idealFor}, children's story template`,
              }),
              offers: {
                "@type": "Offer",
                price: template?.price || "0.00",
                priceCurrency:  currencyData?.currencyCode,
                availability: "https://schema.org/InStock",
                priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split('T')[0],
                url: `${baseUrl}/book/space-explorer/${template?.id}`,
                ...(template?.discountPct && {
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: template.price,
                    priceCurrency:  currencyData?.currencyCode,
                    valueAddedTaxIncluded: false,
                  },
                }),
              },
              potentialAction: {
                "@type": "CreateAction",
                name: "Personalize This Book",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${baseUrl}/book/space-explorer/${template?.id}`,
                },
              },
            },
          })),
        },
  
        // OfferCatalog Schema - Available Book Templates
        {
          "@type": "OfferCatalog",
          "@id": `${baseUrl}/my-books#catalog`,
          name: "Available Book Templates",
          description: "Browse and create personalized children's storybooks",
          itemListElement: bookTemplates.slice(0, 3).map(template => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: template?.title,
              description: template?.description,
              image: template?.coverImage,
              category: "Children's Books",
            },
            price: template?.price || "0",
            priceCurrency:  currencyData?.currencyCode,
            availability: "https://schema.org/InStock",
          })),
        },
  
        // BreadcrumbList Schema
        {
          "@type": "BreadcrumbList",
          "@id": `${baseUrl}/my-books#breadcrumb`,
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
              name: "My Books",
              item: `${baseUrl}/my-books`,
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
          description: "Create personalized children's storybooks",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            email: "support@starmebooks.com",
            availableLanguage: ["English"],
          },
      
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

  const totalPages = myBook?.totalPages || 1;
  const hasNextPage = myBook?.hasNextPage;
  const hasPrevPage = myBook?.hasPrevPage;
  return (
    <div className="min-h-screen relative ">
      <GeoHelmet
        title="My Books - StarMe"
        description="Manage and view your personalized storybooks collection. Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child's imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
        keywords="my books, personalized books collection, user books, storybook collection, custom books"
        type="website"
        schema={createMyBooksSchema()}
      />
      {/* <div className="absolute inset-10 bg-[url('https://resources.wonderwraps.com/50f3c74c-975b-48a7-b5b0-2983f258eee8/img/fillers.png')] bg-no-repeat filter blur-sm opacity-50"></div> */}
      <div className="sticky top-0  z-40">
        <Navbar />
      </div>{" "}
      <div className={` ${isNavbarOpen ? "blur-sm" : ""}  `}>
        <div className="absolute inset-0 -top-28 w-full  border border-red-700">
          <img
            src="	https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/fillers.png"
            className="hidden md:block w-full opacity-50"
          />
          <img
            src="	https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/responsive_stars.png"
            className="block md:hidden w-full h-auto opacity-50 object-cover"
          />
        </div>
        <div className="relative z-10">
          <div className="max-w-max mx-auto p-3 sm:p-5 mt-3 ">
            <div className="border border-gray-300 rounded-lg p-2 sm:p-5 bg-white  ">
              {!loadingBook && myBookData?.length != 0 && (
                <div className="text-3xl  text-black font-marcellus text-left leading-10 mb-4 ">
                  My Books
                </div>
              )}
              {loadingBook ? (
                <div className="flex items-center justify-center mt-10">
                  <img src={loadingImage} alt="image" className="w-28" />
                </div>
              ) : (
                <>
                  <div className="grid [@media(min-width:1px)_and_(max-width:319px)]:grid-cols-1 grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-10 lg:gap-16">
                    {myBookData?.map((card) => {
                      return (
                        <BookCard
                          key={card?.id}
                          title={card?.chapterTitle}
                          description={card?.storySummary}
                          ageRange={card?.childAge}
                          name={card?.childName}
                          imageUrl={card?.coverPageImage || draftImage}
                          discount={card?.discount}
                          btnText={handleCart(card)}
                          gender={card?.gender}
                          isOrder={true}
                          // isCart={card?.paymentStatus === "paid"}
                          extraClass={
                            " [@media(min-width:375px)_and_(max-width:424px)]:h-auto h-auto"
                          }
                          isBook={true}
                          isSpace={true}
                          onPersonalise={() => handleClick(card)}
                        />
                      );
                    })}
                  </div>
                  {myBookData?.length != 0 && (
                    <div className="flex justify-center items-center mt-10 space-x-2 flex-wrap mb-4">
                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={!hasPrevPage}
                        className={`px-3 py-1 rounded border text-sm ${
                          !hasPrevPage
                            ? "text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white"
                        }`}
                      >
                        Previous
                      </button>

                      <div className="px-3 py-1 text-sm rounded border">
                        {currentPage}
                      </div>

                      <button
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={!hasNextPage}
                        className={`px-3 py-1 rounded border text-sm ${
                          !hasNextPage
                            ? "text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
              {!loadingBook && myBookData?.length === 0 && (
                <div className="flex items-center justify-center">
                  <img
                    src="https://resources.wonderwraps.com/1c63349f-f60c-4926-9757-3390028270eb/img/empty-user-books.png"
                    alt="No books found"
                    class="mr-6 w-36 h-36"
                  />
                  <div>
                    {" "}
                    <p className="text-[#0A090B]">
                      Oops! No books here, yet.
                    </p>{" "}
                    <p className="text-[#0A090B]">
                      Let’s create your first story.
                    </p>{" "}
                  </div>{" "}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-10">
              <div className="text-3xl  text-left  font-marcellus text-black mb-8">
                Ready to add a new story to your bookshelf?
              </div>

              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-purple-700 font-figTree cursor-pointer
               text-white text-sm sm:p-2 p-2 rounded transition h-[40px] w-[92px]   hidden sm:block"
                onClick={() => navigate("/template-selection")}
              >
                View All
              </button>
            </div>
            {loading ? (
              <div className="flex items-center justify-center mt-10">
                <img src={loadingImage} alt="image" className="w-28" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4  gap-y-4 sm:gap-y-5 md:gap-y-7 lg:gap-y-10 xl:gap-y-14 [@media(min-width:1px)_and_(max-width:319px)]:grid-cols-1  md:grid-cols-3 md:gap-x-12 lg:grid-cols-3 xl:gap-x-24 w-full ">
                {bookTemplatesDate?.slice(0, 3)?.map((card) => {
                  const ageRange =
                    card?.ageRange &&
                    card.ageRange.minAge &&
                    card.ageRange.maxAge
                      ? `${card.ageRange.minAge} - ${card.ageRange.maxAge} years`
                      : "";
                  return (
                    <BookCard
                      key={card.id}
                      title={card?.title}
                      description={card?.description}
                      ageRange={ageRange}
                      imageUrl={card?.coverImage}
                      discount={
                        card?.discountPct ? `-${card?.discountPct}%` : undefined
                      }
                      gender={card?.idealFor}
                      isBook={true}
                      extraClass={
                        "[@media(min-width:375px)_and_(max-width:398px)]:h-[auto] [@media(min-width:399px)_and_(max-width:424px)]:h-[auto] h-auto"
                      }
                      // extraClass="lg:h-[465px]   h-[352px]  [@media(min-width:375px)_and_(max-width:424px)]:h-[345px]  mb-3"
                      //   extraClass=" h-[410px] mb-3 sm:h-[480px] md:h-[300px] lg:max-w-[334px] lg:h-[480px] xl:h-[480px]
                      //   [@media(min-width:200px)_and_(max-width:249px)]:h-[370px]
                      //   [@media(min-width:250px)_and_(max-width:319px)]:h-[420px]
                      //   [@media(min-width:320px)_and_(max-width:352px)]:h-[293px]
                      //   [@media(min-width:353px)_and_(max-width:424px)]:h-[319px]
                      //   [@media(min-width:425px)_and_(max-width:449px)]:h-[334px]
                      //   [@media(min-width:450px)_and_(max-width:499px)]:h-[350px]
                      //   [@media(min-width:500px)_and_(max-width:549px)]:h-[350px]
                      //   [@media(min-width:550px)_and_(max-width:610px)]:h-[410px]
                      //   [@media(min-width:611px)_and_(max-width:639px)]:h-[440px]
                      //   [@media(min-width:640px)_and_(max-width:725px)]:h-[450px]
                      //   [@media(min-width:768px)_and_(max-width:799px)]:h-[360px]
                      //   [@media(min-width:800px)_and_(max-width:924px)]:h-[400px]
                      //   [@media(min-width:925px)_and_(max-width:979px)]:h-[430px]
                      //   [@media(min-width:980px)_and_(max-width:1023px)]:h-[450px]
                      //   [@media(min-width:1024px)_and_(max-width:1050px)]:h-[450px]
                      // "
                      onPersonalise={() => {
                        navigate(`/book/space-explorer/${card.id}`);
                      }}
                    />
                  );
                })}
              </div>
            )}
            <div className="flex justify-center my-12 ">
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-purple-700 font-figTree cursor-pointer
               text-white text-sm sm:p-2 p-2 rounded transition h-[40px] w-[92px]  block sm:hidden"
                onClick={() => navigate("/template-selection")}
              >
                View All
              </button>
            </div>
          </div>
          <ExploreSection />
          <Footer />
        </div>

        {/* <div className="lg:pt-0 pt-48 md:pt-0 [@media(min-width:650px)_and_(max-width:767px)]:pt-[330px] [@media(min-width:550px)_and_(max-width:649px)]:pt-[280px]">
      </div> */}
      </div>
    </div>
  );
};

export default MyBooksPage;
