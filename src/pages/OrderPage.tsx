import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import {orderList} from '../../store/slices/bookTemplateSlice.js'
import loadingImage from "../assets/images/purple.gif";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const OrdersPage = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      title: "Emma's Magical Forest Adventure",
      orderNumber: "ORD-2025-001",
      date: "October 15, 2025",
      status: "Delivered to Customer",
      statusColor: "bg-green-100 text-green-700",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&h=250&fit=crop"
    },
    {
      id: 2,
      title: "The Secret Garden of Dreams",
      orderNumber: "ORD-2025-002",
      date: "October 12, 2025",
      status: "Shipped to Customer",
      statusColor: "bg-blue-100 text-blue-700",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Adventure in Space",
      orderNumber: "ORD-2025-003",
      date: "October 8, 2025",
      status: "In Preparation",
      statusColor: "bg-orange-100 text-orange-700",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=250&fit=crop"
    } , {
      id: 3,
      title: "Adventure in Space",
      orderNumber: "ORD-2025-003",
      date: "October 8, 2025",
      status: "In Preparation",
      statusColor: "bg-orange-100 text-orange-700",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=250&fit=crop"
    }
  ];
  const loading = useSelector((state) => state?.bookTemplate?.isOrderList);

  const orderListRes = useSelector((state) => state?.bookTemplate?.orderList?.data);
  useEffect(()=>{
   dispatch(orderList({}))
  },[])

  return (
    <div>
    <div className="sticky top-0  z-40">


    <Helmet>
       <title>  My Orders - StarMe </title>
        <meta
          name="description"
          content="Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child’s imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
        />

        <meta property="og:title" content="My Orders - StarMe"/>
        <meta
          property="og:description"
          content="Introducing StarMe, the magical platform where your child becomes the star of their very own storybook! With StarMe, you can create personalized, beautifully illustrated books that bring your child’s imagination to life. From adventures to bedtime stories, every tale is uniquely crafted just for them, making storytime extra special. It's the perfect way to show them how truly wonderful they are!"
        />

        <link
          rel="canonical"
          href={`${window.location.origin}/${location.pathname}`}
        />
      </Helmet>
      <Navbar />
      </div>
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-50 to-blue-200 px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      {/* <div className="max-w-6xl mx-auto mb-6">
        <nav className="flex items-center gap-2 text-sm font-medium">
          <a href="/" className="text-gray-700 hover:text-gray-900 transition font-figTree">
            Home
          </a>
          <span className="text-gray-600">›</span>
          <a href="/my-account" className="text-gray-700 hover:text-gray-900 transition font-figTree">
            My Account
          </a>
          <span className="text-gray-600">›</span>
          <span className="text-gray-900 font-semibold font-figTree">Orders</span>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-[36px] font-bold text-gray-900 mb-2 font-marcellus">
            My Orders
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-figTree">
            View and manage all your personalized storybook orders
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4 sm:space-y-6">
          { 
          loading ? (
            <div className="flex items-center justify-center mt-10"> <img src={loadingImage} alt="image" className="w-28" /> </div>
          ) :
          orderListRes?.results?.length > 0 ?
           orderListRes?.results?.map((order, ind) => {
             const isoDate = order?.createdAt;
             const date = new Date(isoDate);
             
             const formattedDate = date?.toLocaleDateString("en-US", {
               year: "numeric",
               month: "long",
               day: "numeric",
              });
           return(
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Book Image */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div 
                    className="relative"
                    onClick={()=>{
                      navigate(`/order-details/${order?.orderId}/${order?.personalizedBookId}`)
                    }}
                    style={{
                      filter: "drop-shadow(-12px 12px 8px rgba(0, 0, 0, .5))",
                      transform: "perspective(1000px) rotateY(3deg)",
                    }}
                  >
                    <img
                      src={order?.coverPageImage}
                      alt={order.title}
                      className="w-32 h-32 sm:w-32 sm:h-32 aspect-square object-cover rounded-tr-md rounded-br-md"
                    />
                    <div className="absolute top-0 h-full bg-white/50 blur-sm left-0 w-2"></div>
                    <div className="absolute top-0 h-full bg-black/10 left-[3%] w-[1.5px]"></div>
                    <div className="absolute top-0 h-full bg-black/20 blur-sm left-[3%] w-1"></div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex-grow flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-grow">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-figTree">
                      {order?.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-1 font-figTree">
                      Order {order.orderId}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-figTree">
                      <Calendar className="w-4 h-4" />
                      <span className='font-figTree'>{formattedDate}</span>
                    </div>
                      <button onClick={()=>{
                     navigate(`/order-details/${order?.orderId}/${order?.personalizedBookId}`)
                    }} className="hidden rounded-[4px]
                     sm:block bg-gradient-to-r from-purple-500 to-pink-500  text-white font-semibold px-6 py-2 text-sm font-figTree transition-colors duration-200 whitespace-nowrap mt-3">
                      View Details
                    </button>
                    {/* //! newone  */}
                     <div className="flex flex-row sm:flex-col items-center sm:items-end justify-start sm:justify-start gap-3 mt-2 sm:hidden">
                    <span
                      className={`${order.gelatoStatus === 'Failed' ? "bg-red-100 text-red-500" : 'bg-green-100 text-green-700'} px-2 py-2 rounded-[4px] text-xs sm:text-sm font-medium whitespace-nowrap font-figTree`}
                    >
                      {order?.gelatoStatus}
                    </span>
                    
                  </div>
                  <div className='flex justify-start'>
                    <button onClick={()=>{
                      navigate(`/order-details/${order?.orderId}/${order?.personalizedBookId}`)
                    }} 
                    className="mt-2 sm:hidden bg-gradient-to-r from-purple-500 to-pink-500 font-figTree text-white font-semibold text-sm px-6 py-2 rounded-lg transition-colors duration-200">
                      View Details
                    </button>
                    </div>
                  </div>
                  <div className="w-40 block sm:hidden">
                        {order?.review ? (
                          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-3 border border-yellow-200 shadow-sm">
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < order.review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="ml-1 text-sm text-gray-700 font-figTree font-medium">
                                {order.review.rating}/5
                              </span>
                            </div>

                            {order.review.title && (
                              <h5 className="text-xs font-semibold text-gray-800 font-figTree truncate mt-1">
                                {order.review.title}
                              </h5>
                            )}

                                    </div>
                        ) : (
                          <div className="text-sm text-gray-500 italic font-figTree flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span>No review yet</span>
                          </div>
                        )}
                      </div>
                    

                  {/* Status and Button - Desktop */}
                  <div className="flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:block hidden">
                    <span
                      className={`${order.gelatoStatus === 'Failed' ? "bg-red-100 text-red-500" : 'bg-green-100 text-green-700'} px-2 py-2 rounded-[4px] text-xs sm:text-sm font-medium whitespace-nowrap font-figTree`}
                    >
                      {order.gelatoStatus}
                    </span>
                    <div className="sm:min-w-[150px]  mt-10">
                        {order?.review ? (
                          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-3 border border-yellow-200 shadow-sm">
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < order.review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="ml-1 text-sm text-gray-700 font-figTree font-medium">
                                {order.review.rating}/5
                              </span>
                            </div>

                            {order.review.title && (
                              <h5 className="text-xs font-semibold text-gray-800 font-figTree truncate mt-1">
                                {order.review.title}
                              </h5>
                            )}

                                    </div>
                        ) : (
                          <div className="text-sm text-gray-500 italic font-figTree flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span>No review yet</span>
                          </div>
                        )}
                      </div>
                  </div>                  
                </div>
              </div>
            </div>
           )
           }):
          <div>
            {
              orderListRes?.results?.length === 0 &&
          <div className="p-4 flex justify-center items-center  flex-col bg-[#FBF5FF]  rounded-xl gap-2 ">
              <div className="text-sm font-figTree pt-4 text-black">
                Add Another Personalized Book?
              </div>

              <button
                className="  border border-purple-500 bg-white py-[10px] px-[24px] rounded-md font-figTree font-medium text-sm mb-4 text-[#111827]"
                onClick={() => {
                  navigate("/template-selection");
                }}
              >
                Add Books
              </button>
          </div>
      }
            </div>}
            
        </div>
      </div>

    </div>
    </div>
  );
};

export default OrdersPage;