import React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { Toaster } from "react-hot-toast";

// Static Pages
import HomePage from "./pages/HomePageSimple";
import BookDetailPageStatic from "./pages/BookDetailPageStatic";
import TemplateSelectionPageStatic from "./pages/TemplateSelectionPageStatic";

// Auth Components
import AuthPage from "./pages/AuthPage";
import Login from "./components/ui/Login";
import Register from "./components/ui/Register";
import ForgotPassword from "./components/ui/ForgotPassword";
import ResetPassword from "./components/ui/resetPassword";

// Other Pages
import Faqs from "./pages/Faqs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import { ContactUs } from "./pages/contactUs";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";
import BlogsDetails from "./pages/BlogsDetails";
import BlogList from "./pages/BlogList";
import BookChildInfo from "./pages/BookChildInfo";
import FromScratchPage from "./pages/FromScratchPage";
import SetupPage from "./pages/SetupPage";

// Private Route Component
import PrivateRoute from "./pages/PrivateRoute";

// Protected Pages
import MyBooksPage from "./pages/MyBooksPage";
import AccountPage from "./pages/AccountPage";
import Cart from "./pages/Cart";
import BookDetailPage from "./pages/BookDetailPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import PersonalizeBookChapter from "./pages/PersonalizeBookChapter";
import ChooseFlowPage from "./pages/ChooseFlowPage";
import PaymentSuccess from "./components/ui/PaymentSuccess";
import { PaymentFailed } from "./components/ui/PaymentFailed";
import BookPreview from "./pages/BookPreview";
import PreviewSetupPage from "./pages/PreviewSetupPage";
import PreviewPaywallPage from "./pages/PreviewPaywallPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";

// Admin Components
import AdminLogin from "./components/ui/AdminLogin";
import AdminPrivateRoute from "./pages/AdminPrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  useScrollToTop();

  return (
    <div>
      <Routes>
        {/* Public Routes */}
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
        <Route path="/setup/:id?" element={<SetupPage />} />
        <Route path="/support" element={<SupportPage />} />

        {/* Auth Routes */}
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

        {/* Protected Routes - Require Authentication */}
        <Route path="/book/:bookId" element={<PrivateRoute Component={BookDetailPage} />} />
        <Route path="/order" element={<PrivateRoute Component={OrderPage} />} />
        <Route path="/order-details/:orderId/:userId" element={<PrivateRoute Component={OrderDetailsPage} />} />
        <Route path="/personalize-book" element={<PrivateRoute Component={PersonalizeBookChapter} />} />
        <Route path="/my-books" element={<PrivateRoute Component={MyBooksPage} />} />
        <Route path="/choose-flow" element={<PrivateRoute Component={ChooseFlowPage} />} />
        <Route path="/cart" element={<PrivateRoute Component={Cart} stepNo={1} />} />
        <Route path="/cart/delivery" element={<PrivateRoute Component={Cart} stepNo={2} />} />
        <Route path="/cart/checkout" element={<PrivateRoute Component={Cart} stepNo={3} />} />
        <Route path="/payment-success" element={<PrivateRoute Component={PaymentSuccess} />} />
        <Route path="/payment-failed" element={<PrivateRoute Component={PaymentFailed} />} />
        <Route path="/preview-gate/:id?" element={<PrivateRoute Component={BookPreview} />} />
        <Route path="/preview-setup/:id?" element={<PrivateRoute Component={PreviewSetupPage} />} />
        <Route path="/preview-paywall/:id?" element={<PrivateRoute Component={PreviewPaywallPage} />} />
        <Route path="/checkout" element={<PrivateRoute Component={CheckoutPage} />} />
        <Route path="/profile" element={<PrivateRoute Component={AccountPage} />} />
        <Route path="/thank-you" element={<PrivateRoute Component={ThankYouPage} />} />

        {/* Admin Routes */}
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
          path="/admin/*"
          element={<AdminPrivateRoute Component={AdminDashboard} />}
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