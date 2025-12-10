import React, { useEffect, useState } from "react";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
// import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import MyBooksPage from "./pages/MyBooksPage";
import SetupPage from "./pages/SetupPage";
import ChooseFlowPage from "./pages/ChooseFlowPage";
import TemplateSelectionPage from "./pages/TemplateSelectionPage";
import FromScratchPage from "./pages/FromScratchPage";
import PreviewSetupPage from "./pages/PreviewSetupPage";
import PreviewPaywallPage from "./pages/PreviewPaywallPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import NotFound from "./pages/NotFound";
import SupportPage from "./pages/SupportPage";
import AuthPage from "./pages/AuthPage";
import Register from "./components/ui/Register";
import ForgotPassword from "./components/ui/ForgotPassword";
import Login from "./components/ui/Login";
import AdminLogin from "./components/ui/AdminLogin";
import BookPreview from "./pages/BookPreview";
import AccountPage from "./pages/AccountPage";
import Verify from "./components/ui/verify";
import Faqs from "./pages/Faqs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "../src/pages/PrivateRoute";
import TermsAndConditions from "./pages/TermsAndConditions";
import BlogsDetails from "./pages/BlogsDetails";
import PaymentSuccess from "./components/ui/PaymentSuccess";
import { PaymentFailed } from "./components/ui/PaymentFailed";
import Cart from "./pages/Cart";
import BlogList from "./pages/BlogList";
import CreateForm from "./pages/CreateForm";
import PersonalizeBookChapter from "./pages/PersonalizeBookChapter";
import BookChildInfo from "./pages/BookChildInfo";
import { cookie } from "./utils/cookies.js";
import { useDispatch, useSelector } from "react-redux";
import {
  profile,
  currencyList,
  countryList,
} from ".././store/slices/loginSlice.js";
import {
  setCurrency,
  setCountry,
} from ".././store/slices/bookTemplateSlice.js";
import ResetPassword from "./components/ui/resetPassword.js";
import { ContactUs } from "./pages/contactUs.js";
import OrderPage from "./pages/OrderPage.js";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPrivateRoute from "../src/pages/AdminPrivateRoute";
import axios from "axios";
import OrderDetailsPage from "./pages/OrderDetailsPage.js";
import HomePage from "./pages/HomePageSimple.js";
import BookDetailPageStatic from "./pages/BookDetailPageStatic.js";
import TemplateSelectionPageStatic from "./pages/TemplateSelectionPageStatic.js";

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  useScrollToTop();
  const token = cookie.get("token");
  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    dispatch(countryList());
    dispatch(currencyList());
  }, []);
  const currencyName = localStorage.getItem("currencySave");
  const countryName = localStorage.getItem("countrySave");
  const countryListData = useSelector((state) => state?.auth?.countryList);
  const currencyListData = useSelector((state) => state?.auth?.currencyList);


  const currencyInitialRES = currencyListData?.find(
    (item) => item?.currencyCode === currencyName
  );
  const currencySet = countryData?.currency || "EUR";
  const currency = currencyListData?.find(
    (item) => item?.currencyCode === currencySet
  );

  const currencyInitial = currencyInitialRES ? currencyInitialRES: currency ;

  const countrySet = countryName || "GB";

  const initialCountryName = countryListData?.find(
    (item, ind) => item?.countryName === countryData?.currency
  );

  const countryInitial = countryListData?.find(
    (item, ind) => item?.countryCode === countrySet
  );

  const country = initialCountryName || countryInitial;

  useEffect(() => {
    if (token) {
      // navigate("/login");
      dispatch(profile());
    }
  }, [token, dispatch]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");

        setCountryData(response.data);
      } catch (error) {
        console.error("Error fetching country info:", error);
      }
    };

    fetchCountry();
  }, []);

  useEffect(() => {
    if (currencyInitial?._id) {
      dispatch(setCurrency(currencyInitial));
    }
  }, [currencyInitial?._id]);
  useEffect(() => {
    if (country?.countryName) {
      dispatch(setCountry(country));
    }
  }, [country?.countryName]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/template-selection" element={<TemplateSelectionPageStatic />} />
        <Route path="/book-detail/:id?" element={<BookDetailPageStatic />} />
        <Route path="/blog/:id" element={<BlogsDetails />} />
        <Route path="/blog/" element={<BlogList />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/from-scratch" element={<FromScratchPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/BookChildInfo" element={<BookChildInfo />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/setup/:id?" element={<SetupPage />} />{" "}

        <Route
          path="/support"
          element={<SupportPage />}
        />
        <Route
          path="/book/:bookId"
          element={<PrivateRoute Component={BookDetailPage} />}
        />
        <Route path="/order" element={<PrivateRoute Component={OrderPage} />} />
        <Route
          path="/order-details/:orderId/:userId"
          element={<PrivateRoute Component={OrderDetailsPage} />}
        />
        <Route
          path="/personalize-book"
          element={<PrivateRoute Component={PersonalizeBookChapter} />}
        />
        <Route
          path="/login"
          element={
            <AuthPage
              title="Login to Account"
              description="Enter your credentials to access your account."
              Component={Login}
              extraClass={"max-w-6xl"}
            />
          }
        />
        <Route
          path="/admin/login"
          element={
            <AuthPage
              title="Admin Login"
              description="Enter your admin credentials to access the admin panel."
              Component={AdminLogin}
              extraClass={"max-w-6xl"}
            />
          }
        />
        <Route
          path="/user/verify-email"
          element={
            <AuthPage
              title=""
              description=""
              Component={Verify}
              extraClass={"max-w-5xl "}
            />
          }
        />
        <Route
          path="/register"
          element={
            <AuthPage
              title="Create Account"
              description="Create an account to carry on with your personalised book."
              Component={Register}
              extraClass={"max-w-6xl"}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthPage
              title="Forgot Password"
              description="Enter your email address, and we'll send you a link to reset your password."
              Component={ForgotPassword}
              isForgot={true}
              extraClass={"max-w-2xl"}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <AuthPage
              title="Reset Password"
              description="Enter your new password below to reset your account password."
              Component={ResetPassword}
              isReset={true}
              isForgot={true}
              extraClass={"max-w-2xl"}
            />
          }
        />
        <Route
          path="/my-books"
          element={<PrivateRoute Component={MyBooksPage} />}
        />
        {/* //! admin routes */}
        <Route
          path="/admin"
          element={<AdminPrivateRoute Component={AdminDashboard} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={<div>Dashboard content will go here</div>}
          />
          <Route path="users" element={<div>Users content will go here</div>} />
          <Route
            path="book-templates"
            element={<div>Book Templates content will go here</div>}
          />
          <Route
            path="book-templates/:templateId"
            element={<div>Book Templates Single page</div>}
          />
          <Route path="blogs" element={<div>Blogs content will go here</div>} />
          <Route
            path="orders"
            element={<div>Orders content will go here</div>}
          />
          <Route
            path="create"
            element={<div>blog create content will go here</div>}
          />
          <Route
            path="edit/:id"
            element={<div>blog create content will go here</div>}
          />
          <Route
            path="blog/:id"
            element={<div>blog create content will go here</div>}
          />
          <Route
            path="book-price"
            element={<div>blog create content will go here</div>}
          />
          <Route
            path="coupon"
            element={<div>blog create content will go here</div>}
          />
          <Route
            path="category"
            element={<div>blog create content will go here</div>}
          />
          <Route
            path="faq"
            element={<div>blog create content will go here</div>}
          />  
             <Route
            path="order-details/:orderId"
            element={<div>blog create content will go here</div>}
          />
        </Route>
        {/* <Route path="disease-list" element={<PrivateRoute Component={DiseaseSelect} />} /> */}
    
        <Route
          path="/choose-flow"
          element={<PrivateRoute Component={ChooseFlowPage} />}
        />
        <Route
          path="/cart"
          element={<PrivateRoute Component={Cart} stepNo={1} />}
        />
        <Route
          path="/cart/delivery"
          element={<PrivateRoute Component={Cart} stepNo={2} />}
        />
        <Route
          path="/cart/checkout"
          element={<PrivateRoute Component={Cart} stepNo={3} />}
        />
        <Route
          path="/payment-success"
          element={<PrivateRoute Component={PaymentSuccess} />}
        />
        <Route
          path="/payment-failed"
          element={<PrivateRoute Component={PaymentFailed} />}
        />
        <Route
          path="/preview-gate/:id?"
          element={<PrivateRoute Component={BookPreview} />}
        />
        <Route
          path="/preview-setup/:id?"
          element={<PrivateRoute Component={PreviewSetupPage} />}
        />
        <Route
          path="/preview-paywall/:id?"
          element={<PrivateRoute Component={PreviewPaywallPage} />}
        />
        <Route
          path="/checkout"
          element={<PrivateRoute Component={CheckoutPage} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute Component={AccountPage} />}
        />
        <Route
          path="/thank-you"
          element={<PrivateRoute Component={ThankYouPage} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster reverseOrder={false} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
