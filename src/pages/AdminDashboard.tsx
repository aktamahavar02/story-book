import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Chart } from "react-google-charts";
import { FiLogOut } from "react-icons/fi";
import {
  FaChartBar,
  FaUsers,
  FaBook,
  FaShoppingCart,
  FaBell,
} from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { GiMoneyStack } from "react-icons/gi";
import { cookie } from "../utils/cookies.js";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../store/slices/loginSlice.js";
import logo from "../assets/svgs/logo.svg";
import { FaMicroblog } from "react-icons/fa";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Users from "./admin/Users";
import BookTemplate from "./admin/BookTemplate";
import Blogs from "./admin/Blogs";
import Orders from "./admin/Orders";
import {
  adminDashboardRes,
  adminRevenueRes,
  adminRecentOrder,
  adminCountryChart,
} from "../../store/slices/loginSlice.js";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { profile } from "../../store/slices/loginSlice.js";
import CreateForm from "./CreateForm.js";
import BlogsDetailsAdmin from "./admin/BlogsDetailsAdmin.js";
import TemplateDetails from "./admin/TemplateDetails.js";
import BookPrice from "./admin/bookPrice.js";
import CouponCodeAdd from "./admin/couponCodeAdd.js";
import { RiCoupon3Fill } from "react-icons/ri";
import Category from "./admin/Category.js";
import { BiSolidCategory } from "react-icons/bi";
import { FaqAdmin } from "./admin/faqAdmin.js";
import { FaQuestionCircle } from "react-icons/fa";
import OrderDetailsPageAdmin from "./OrderDetailsPageAdmin.js";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(false);
  const adminRefreshToken = cookie.get("adminRefreshToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(adminDashboardRes({}));
    dispatch(adminCountryChart({}));
    dispatch(adminRecentOrder({}));
    dispatch(adminRevenueRes({}));
  }, []);

  const adminList = useSelector((state) => state?.auth?.adminDashboardData);
  const recentOrderList = useSelector(
    (state) => state?.auth?.adminRecentOrder?.data
  );
  const revenueList = useSelector((state) => state?.auth?.adminRevenueData);
  const geoChartsData = useSelector((state) => state?.auth?.adminCountryChart);
  const profileData = useSelector((state: any) => state?.auth?.profile);
  const countryChartsData =
    geoChartsData?.data?.map((item) => [
      item?.countryName,
      item?.totalAmount,
    ]) || [];
  const finalChartsData = [["Country", "Users"], ...countryChartsData];

  const revBar = revenueList?.data?.map((data) => {
    return {
      name: data?.monthYear,
      revenue: data?.totalAmount,
    };
  });

  const COLORS = ["#4f46e5", "#10b981", "#ef4444"];

  // Country data for Geo chart
  const countryData = [
    ["Country", "Users"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
  ];

  // const options = {
  //   backgroundColor: "transparent",
  //   colorAxis: { colors: ["#4f46e5", "#818cf8"] },
  //   datalessRegionColor: "#f8fafc",
  //   defaultColor: "#e2e8f0",
  //   legend: { textStyle: { color: '#64748b', fontSize: 12 } },
  //   tooltip: {
  //     textStyle: { color: '#1e293b' },
  //     showColorCode: true
  //   },
  // };

  const options = {
    backgroundColor: "transparent",
    colorAxis: { colors: ["#4f46e5", "#818cf8"] },
    datalessRegionColor: "#f8fafc",
    defaultColor: "#e2e8f0",
    legend: {
      textStyle: { color: "#64748b", fontSize: 12 },
      position: "bottom",
      alignment: "center",
    },
    chartArea: {
      top: 10,
      left: 10,
      right: 10,
      bottom: 80, // 👈 give room for the color scale
      width: "100%",
      height: "70%", // 👈 map height adjusted
    },
    tooltip: {
      textStyle: { color: "#1e293b" },
      showColorCode: true,
    },
  };
  const stats = [
    {
      title: "Total Users",
      value: adminList?.data?.totalUser,
      change: "+12%",
      icon: <HiUserGroup size={24} />,
    },
    {
      title: "Order Transit",
      value: adminList?.data?.orderInTransit,
      change: "+8%",
      icon: <FaBook size={24} />,
    },
    {
      title: " Total Revenue",
      value: adminList?.data?.totalRevenue,
      change: "+15%",
      icon: <GiMoneyStack size={24} />,
    },
    {
      title: "Recent Order",
      value: adminList?.data?.totalOrder,
      change: "+5%",
      icon: <HiUserGroup size={24} />,
    },
  ];

  const recentActivity = [
    { id: 1, user: "John Doe", action: "Created new book", time: "2 min ago" },
    {
      id: 2,
      user: "Jane Smith",
      action: "Purchased premium",
      time: "15 min ago",
    },
    {
      id: 3,
      user: "Robert Johnson",
      action: "Updated profile",
      time: "1 hour ago",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "Commented on story",
      time: "3 hours ago",
    },
  ];
  // const totalPages = OrderList?.data?.totalPages || 1;
  // const totalResults = OrderList?.data?.totalResults || 1;

  useEffect(() => {
    dispatch(profile());
  }, []);
  return (
    <div
      className={`flex  ${
        location.pathname.startsWith("/admin/blog/")
          ? "min-h-screen"
          : "h-screen"
      } bg-gray-50`}
    >
      <Helmet>
        <title>Admin Dashboard – StarMe</title>

        <meta
          name="description"
          content="Access analytics, manage users, view orders, and control all StarMe platform functionalities from the admin dashboard."
        />

        <link
          rel="canonical"
          href={`${window.location.origin}/${location.pathname}`}
        />
      </Helmet>

      <div className={`md:hidden fixed top-4 left-4 z-50`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-indigo-600 text-white"
        >
          {sidebarOpen ? <AiOutlineClose /> : <RxHamburgerMenu />}
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white h-full text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <h1 className="text-2xl font-bold flex justify-center ">
            <img src={logo} className="w-16" />
          </h1>
        </div>
        <nav className="mt-6 flex-1 overflow-auto">
          <ul>
            <li className="mb-2 mx-2">
              <Link
                to="/admin/dashboard"
                className={`flex items-center p-3 rounded-lg transition ${
                  location.pathname === "/admin/dashboard"
                    ? "bg-[#ECF3FF] text-[#465FFF]"
                    : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                }`}
              >
                <span className="mr-3">
                  <FaChartBar
                    className={
                      location.pathname === "/admin/dashboard"
                        ? "text-[#465FFF]"
                        : "text-blue-700"
                    }
                  />
                </span>
                <span
                  onClick={() => {
                    setSidebarOpen(false);
                  }}
                  className={
                    location.pathname === "/admin/dashboard"
                      ? "text-[#465FFF]"
                      : ""
                  }
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="mb-2 mx-2">
              <Link
                to="/admin/users"
                className={`flex items-center p-3 rounded-lg transition ${
                  location.pathname === "/admin/users"
                    ? "bg-[#ECF3FF] text-[#465FFF]"
                    : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                }`}
              >
                <span className="mr-3">
                  <FaUsers
                    className={
                      location.pathname === "/admin/users"
                        ? "text-[#465FFF]"
                        : "text-blue-700"
                    }
                  />
                </span>
                <span
                onClick={()=>{
                 setSidebarOpen(false);
                }}
                  className={
                    location.pathname === "/admin/users" ? "text-[#465FFF]" : ""
                  }
                >
                  Users
                </span>
              </Link>
            </li>
            <li className="mb-2 mx-2">
              <Link
                to="/admin/book-templates"
                className={`flex items-center p-3 rounded-lg transition ${
                  location.pathname === "/admin/book-templates"
                    ? "bg-[#ECF3FF] text-[#465FFF]"
                    : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                }`}
              >
                <span className="mr-3">
                  <FaBook
                    className={
                      location.pathname === "/admin/book-templates"
                        ? "text-[#465FFF]"
                        : "text-blue-700"
                    }
                  />
                </span>
                <span
                 onClick={()=>{
                   setSidebarOpen(false);
                  }}
                  className={
                    location.pathname === "/admin/book-templates"
                      ? "text-[#465FFF]"
                      : ""
                  }
                >
                  Book Template
                </span>
              </Link>
            </li>
            <li className="mb-2 mx-2">
              <Link
                to="/admin/blogs"
                className={`flex items-center p-3 rounded-lg transition ${
                  location.pathname === "/admin/blogs"
                    ? "bg-[#ECF3FF] text-[#465FFF]"
                    : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                }`}
              >
                <span className="mr-3">
                  <FaMicroblog
                    className={
                      location.pathname === "/admin/blogs"
                        ? "text-[#465FFF]"
                        : "text-blue-700"
                    }
                  />
                </span>
                <span
                   onClick={()=>{
                      setSidebarOpen(false);
                    }}
                  className={
                    location.pathname === "/admin/blogs" ? "text-[#465FFF]" : ""
                  }
                >
                  Blogs
                </span>
              </Link>
            </li>

            <li className="mb-2 mx-2">
              <Link
                to="/admin/orders"
                className={`flex items-center p-3 rounded-lg transition ${
                  location.pathname === "/admin/orders"
                    ? "bg-[#ECF3FF] text-[#465FFF]"
                    : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                }`}
              >
                <span className="mr-3">
                  <FaShoppingCart
                    className={
                      location.pathname === "/admin/orders"
                        ? "text-[#465FFF]"
                        : "text-blue-700"
                    }
                  />
                </span>
                <span
                 onClick={()=>{
                  setSidebarOpen(false);
                }}
                  className={
                    location.pathname === "/admin/orders"
                      ? "text-[#465FFF]"
                      : ""
                  }
                >
                  Orders
                </span>
              </Link>
            </li>
            <li className="mb-2 mx-2">
              <Link
                to="/admin/book-price"
                className={`flex items-center p-3 rounded-lg transition ${
                  location.pathname === "/admin/book-price"
                    ? "bg-[#ECF3FF] text-[#465FFF]"
                    : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                }`}
              >
                <span className="mr-3">
                  <IoPricetagsSharp
                    className={
                      location.pathname === "/admin/book-price"
                        ? "text-[#465FFF]"
                        : "text-blue-700"
                    }
                  />
                </span>
                <span
                onClick={()=>{
                  setSidebarOpen(false);
                }}
                  className={
                    location.pathname === "/admin/book-price"
                      ? "text-[#465FFF]"
                      : ""
                  }
                >
                  Book Price
                </span>
              </Link>
            </li>

            <li className="mb-2 mx-2">
              <Link
                to="/admin/coupon"
                className={`flex items-center p-3 rounded-lg transition ${
                  location.pathname === "/admin/coupon"
                    ? "bg-[#ECF3FF] text-[#465FFF]"
                    : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                }`}
              >
                <span className="mr-3">
                  <RiCoupon3Fill
                    className={
                      location.pathname === "/admin/coupon"
                        ? "text-[#465FFF]"
                        : "text-blue-700"
                    }
                  />
                </span>
                <span
                 onClick={()=>{
                  setSidebarOpen(false);
                }}
                  className={
                    location.pathname === "/admin/coupon"
                      ? "text-[#465FFF]"
                      : ""
                  }
                >
                  Coupon Code
                </span>
              </Link>
            </li>
            <li className="mb-2 mx-2">
              <Link
                to="/admin/faq"
                className={`flex items-center p-3 rounded-lg transition ${
                  location.pathname === "/admin/faq"
                    ? "bg-[#ECF3FF] text-[#465FFF]"
                    : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                }`}
              >
                <span className="mr-3">
                  <FaQuestionCircle
                    className={
                      location.pathname === "/admin/faq"
                        ? "text-[#465FFF]"
                        : "text-blue-700"
                    }
                  />
                </span>
                <span
                 onClick={()=>{
                  setSidebarOpen(false);
                }}
                  className={
                    location.pathname === "/admin/faq" ? "text-[#465FFF]" : ""
                  }
                >
                  FAQ
                </span>
              </Link>
            </li>
            <li className="mb-2 mx-2">
              <div
                onClick={() => setExpandedCategory(!expandedCategory)}
                className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
                  location.pathname.startsWith("/admin/category")
                    ? "bg-[#ECF3FF] text-[#465FFF]"
                    : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                }`}
              >
                <span className="mr-3">
                  <BiSolidCategory
                    className={
                      location.pathname.startsWith("/admin/category")
                        ? "text-[#465FFF]"
                        : "text-blue-700"
                    }
                  />
                </span>
                <span
                  className={
                    location.pathname.startsWith("/admin/category")
                      ? "text-[#465FFF] flex-1"
                      : "flex-1"
                  }
                >
                  Category
                </span>
                <span className="ml-2">
                  {expandedCategory ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  )}
                </span>
              </div>
              {/* Submenu items - only show when expanded */}
              {expandedCategory && (
                <ul className="ml-8 mt-1 space-y-1">
                  <li>
                    <Link
                      to="/admin/category?type=character"
                      className={`flex items-center p-2 rounded-lg transition ${
                        location.pathname === "/admin/category" &&
                        location.search.includes("type=character")
                          ? "bg-[#ECF3FF] text-[#465FFF]"
                          : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                      }`}
                    >
                      <span className="text-sm ml-2">Character</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/category?type=adventure"
                      className={`flex items-center p-2 rounded-lg transition ${
                        location.pathname === "/admin/category" &&
                        location.search.includes("type=adventure")
                          ? "bg-[#ECF3FF] text-[#465FFF]"
                          : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                      }`}
                    >
                      <span className="text-sm ml-2">Adventure</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/category?type=morality"
                      className={`flex items-center p-2 rounded-lg transition ${
                        location.pathname === "/admin/category" &&
                        location.search.includes("type=morality")
                          ? "bg-[#ECF3FF] text-[#465FFF]"
                          : "hover:bg-[#ECF3FF] hover:text-[#465FFF] text-black"
                      }`}
                    >
                      <span className="text-sm ml-2">Morality</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="mb-2 mx-2 text-red-500"
              onClick={() => {
                dispatch(
                  adminLogout({
                    refreshToken: adminRefreshToken,
                    onSuccess: () => {
                      navigate("/admin/login");
                    },
                  })
                );
              }}
            >
              <div className="flex items-center p-3 hover:bg-white rounded-lg transition cursor-pointer">
                <span className="mr-3">
                  <FiLogOut className="hover:text-red-500" />
                </span>
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        <header className="bg-white shadow-sm fixed w-full  md:w-[calc(100%-256px)] top-0 z-20">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2
              className="text-xl font-semibold text-gray-800 sm:w-auto text-center font-marcellus truncate 
             2xl:pl-0 xl:pl-0 lg:pl-0 md:pl-0 sm:pl-0 pl-10 [@media(min-width:645px)_and_(max-width:767px)]:pl-10"
            >
              {location.pathname === "/admin/dashboard" && "Dashboard"}
              {location.pathname === "/admin/users" && "Users Management"}
              {location.pathname === "/admin/book-templates" &&
                "Book Templates"}
              {location.pathname === "/admin/blogs" && "Blog Management"}
              {location.pathname === "/admin/orders" && "Order Management"}
              {location.pathname === "/admin/book-price" &&
                "Book Price Management "}
              {location.pathname === "/admin/coupon" &&
                "Coupon Code Management "}{" "}
              {location.pathname === "/admin/faq" && "Frequently Asked Questions Management "}
              {(location.pathname === "/admin/category" ||
                location.pathname.startsWith("/admin/category")) &&
                "Category Management "}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <FaBell />
              </button>
              <div className="flex items-center font-figTree">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  {profileData?.name?.slice(0, 1)?.toUpperCase()}
                </div>
                <span className="ml-2 text-gray-700 hidden md:block">
                  {profileData?.name
                    ? profileData.name.charAt(0).toUpperCase() +
                      profileData.name.slice(1).toLowerCase()
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <div className="p-6 mt-[66px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-500 text-sm font-figTree">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold mt-1 font-figTree">
                            {stat.value}
                          </p>
                          {/* <p className="text-green-500 text-sm mt-1">{stat.change}</p> */}
                        </div>
                        <div className="p-3 bg-indigo-100 rounded-lg flex items-center justify-center">
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 font-figTree">
                      Revenue Overview
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revBar}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="revenue" fill="#4f46e5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* //! new one. -------------------------------------- */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 font-figTree">
                      User Distribution by Country
                    </h3>
                    {/* <div className="h-80"> */}
                    <div className="[@media(min-width:320px)_and_(max-width:500px)]:h-[300px] h-[400px] sm:h-[580px] md:h-[470px] lg:h-[300px] xl:h-[380px] 2xl:h-[290px] w-full">
                      <Chart
                        chartType="GeoChart"
                        data={finalChartsData}
                        options={options}
                        width="100%"
                        height="100%"
                      />
                    </div>
                  </div>
                </div>
                {/* //! new change starts from here ----------------------------------  - - - -- - - - -- - -- - - - -- - -- - ---- */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 font-figTree">
                    Recent Order
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Currency
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Shipping Method
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentOrderList?.results?.map((order) => (
                          <React.Fragment key={order.id}>
                            <tr className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.currency}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.shippingMethod}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    order.status === "paid"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                  onClick={() => {
                                    setExpandedOrders((prev) => ({
                                      ...prev,
                                      [order.id]: !prev[order.id],
                                    }));
                                  }}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  {expandedOrders[order.id]
                                    ? "Hide Details"
                                    : "View Details"}
                                </button>
                              </td>
                            </tr>
                            {expandedOrders[order.id] && (
                              <tr className="bg-gray-50">
                                <td colSpan="6" className="px-6 py-4">
                                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                    <div>
                                      <h4 className="text-md text-[#465fff] mb-2 font-bold font-figTree">
                                        Recipient Information
                                      </h4>
                                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded">
                                        <thead className="bg-gray-100">
                                          <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Name
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Email
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Phone
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              City
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                          <tr className="bg-white">
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                              {order.recipient.firstName}{" "}
                                              {order.recipient.lastName || ""}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                              {order.recipient.email || "-"}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                              {order.recipient.phone || "-"}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                              {order.recipient.city}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div>
                                      <h4 className="text-md  font-figTree font-bold text-[#465fff]">
                                        Personalized Books
                                      </h4>
                                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded">
                                        <thead className="bg-gray-100">
                                          <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Cover Image
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Title
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Child Name
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Child Age
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                          {order.personalizedBooks.map(
                                            (book, index) => {
                                              return (
                                                <tr
                                                  key={index}
                                                  className={
                                                    index % 2 === 0
                                                      ? "bg-white"
                                                      : "bg-gray-50"
                                                  }
                                                >
                                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                    {book.coverPageImage ? (
                                                      <img
                                                        src={
                                                          book.coverPageImage
                                                        }
                                                        alt={`${book.title} cover`}
                                                        className="w-10 h-10 object-cover border rounded"
                                                      />
                                                    ) : (
                                                      <span className="text-gray-400">
                                                        No image
                                                      </span>
                                                    )}
                                                  </td>
                                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                    {book.title}
                                                  </td>
                                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                    {book.childName}
                                                  </td>
                                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                    {book.childAge}
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-medium mb-2">Manage Users</h3>
                    <p className="text-indigo-100 mb-4">
                      View and manage all user accounts
                    </p>
                    <button
                      className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition"
                      onClick={() => navigate("users")}
                    >
                      Go to Users
                    </button>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-medium mb-2">
                      Content Management
                    </h3>
                    <p className="text-green-100 mb-4">
                      Manage books and stories
                    </p>
                    <button
                      className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition"
                      onClick={() => navigate("book-templates")}
                    >
                      Manage Content
                    </button>
                  </div>

                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-xl text-white "
                    onClick={() => navigate("blogs")}
                  >
                    <h3 className="text-lg font-medium mb-2">
                      Blogs Management{" "}
                    </h3>
                    <p className="text-amber-100 mb-4">View Blogs</p>
                    <button
                      className="bg-white text-amber-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 transition"
                      onClick={() => navigate("dashboard")}
                    >
                      View Reports
                    </button>
                  </div>
                </div> */}
              </div>
            }
          />
          <Route path="users" element={<Users />} />
          <Route path="book-templates" element={<BookTemplate />} />
          <Route
            path="book-templates/:templateId"
            element={<TemplateDetails />}
          />
          <Route path="blogs" element={<Blogs />} />
          <Route path="orders" element={<Orders />} />
          <Route path="create" element={<CreateForm />} />
          <Route path="edit/:id?" element={<CreateForm />} />
          <Route path="blog/:id" element={<BlogsDetailsAdmin />} />
          <Route path="templateDetails/:id" element={<TemplateDetails />} />
          <Route path="book-price" element={<BookPrice />} />
          <Route path="coupon" element={<CouponCodeAdd />} />
          <Route path="category" element={<Category />} />
          <Route path="faq" element={<FaqAdmin />} /> 
          <Route
            path="/order-details/:orderId"
            element={<OrderDetailsPageAdmin />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
