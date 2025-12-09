import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { cookie } from "../../src/utils/cookies";

const loginSlice = createSlice({
  name: "register",
  initialState: {
    data: {},
    register: {},
    login: {},
    adminLogin: {},
    adminLogout: {},
    profile: {},
    guestData: {},
    profileUpdate: {},
    adminDashboardData: {},
    adminRecentOrder: {},
    adminCountryChart: {},
    countryData: {},
    trackOrderData: {},
    adminBookTemplate: {},
    adminOrderData: {},
    adminRevenueData: {},
    adminRevenueData: {},
    forgotPassword: {},
    contactUsData: {},
    resetPasswordData: {},
    uploadImageLink: {},
    adminUsersRes: {},
    uploadImage: {},
    googleSend: {},
    countryList: [],
    currencyList: [],
    isLoading: false,
    isUserLoading: false,
    isUploadImage: false,
    isOrder: false,
    isResetPassword: false,
    isForgotPassword: false,
    isRegister: false,
    isLogin: false,
    isAdminLogin: false,
    isImageUpload: false,
    error: null,
    isCountryLoading: false
  },
  reducers: {
    register: (state) => {
      state.isLoading = true;
      state.isRegister = true;
    },
    registerSuccess: (state, action) => {
      toast.success(action.payload?.data?.message);
      state.isLoading = false;
      state.isRegister = false;
      state.register = action?.payload;
      state.data = action?.payload || [];
    },
    registerFailure: (state, action) => {
      toast.error(action?.payload?.message);
      state.isLoading = false;
      state.isRegister = false;
      state.error = action.payload;
    },
    shippingCreate: (state) => {
      state.isLoading = true;
    },
    shippingCreateSuccess: (state, action) => {
      toast.success("Shipping Address Created Successfully");
      state.isLoading = false;
      // state.shippingCreate = action?.payload;
      state.data = action?.payload || [];
    },
    shippingCreateFailure: (state, action) => {
      toast.error("Shipping Address Created Failed");
      state.isLoading = false;
      state.error = action.payload;
    },
    login: (state) => {
      state.isLoading = true;
      state.isLogin = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isLogin = false;
      toast.success("Login Successfully");
      const token = action?.payload?.data?.tokens?.access?.token;
      cookie.set("token", token);
      cookie.remove("adminToken");
      cookie.remove("adminRefreshToken");
      state.login = action?.payload;
      state.data = action?.payload || [];
    },
    loginFailure: (state, action) => {
      state.isLogin = false;
      toast.error(action?.payload?.message);
      state.isLoading = false;
      state.error = action.payload;
    },
    adminLogin: (state) => {
      state.isLoading = true;
      state.isAdminLogin = true;
    },
    adminLoginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAdminLogin = false;
      toast.success("Admin Login Successfully");
      const token = action?.payload?.data?.tokens?.access?.token;
      const refreshToken = action?.payload?.data?.tokens?.refresh?.token;
      cookie.set("adminToken", token);
      cookie.set("adminRefreshToken", refreshToken);
      state.adminLogin = action?.payload;
      state.data = action?.payload || [];
    },
    adminLoginFailure: (state, action) => {
      state.isAdminLogin = false;
      toast.error(action?.payload?.message);
      state.isLoading = false;
      state.error = action.payload;
    },

    adminLogout: (state) => {
      state.isLoading = true;
    },
    adminLogoutSuccess: (state, action) => {
      state.isLoading = false;
      toast.success("Admin Logout Successfully");
      cookie.remove("adminToken");
      cookie.remove("adminRefreshToken");
      cookie.remove("token");
      state.adminLogout = action?.payload;
    },
    adminLogoutFailure: (state, action) => {
      toast.error(action?.payload?.message);
      state.isLoading = false;
      state.error = action.payload;
    },
    verify: (state) => {
      state.isLoading = true;
    },
    verifySuccess: (state, action) => {
      state.isLoading = false;
      state.login = action?.payload;
      state.data = action?.payload || [];
    },
    verifyFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    profile: (state) => {
      state.isLoading = true;
    },
    profileSuccess: (state, action) => {
      state.isLoading = false;
      state.profile = action?.payload.data?.user;
    },
    profileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    guestLogin: (state) => {
      state.isLoading = true;
    },
    guestLoginSuccess: (state, action) => {
      state.isLoading = false;
      const token = action?.payload?.data?.tokens?.access?.token;
      cookie.set("token", token);
      // state.guestData = action?.payload.data?.tokens?.access?.token;
    },
    guestLoginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    countryList: (state) => {
      state.isCountryLoading = true;
    },
    countryListSuccess: (state, action) => {
      state.isCountryLoading = false;
      state.countryList = action?.payload?.data;
    },
    countryListFailure: (state, action) => {
      state.isCountryLoading = false;
      state.error = action.payload;
    },
    currencyList: (state) => {
      state.isLoading = true;
    },
    currencyListSuccess: (state, action) => {
      state.isLoading = false;
      state.currencyList = action?.payload?.data;
    },
    currencyListFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    statesList: (state) => {
      state.isLoading = true;
    },
    statesListSuccess: (state, action) => {
      state.isLoading = false;
      state.statesList = action?.payload?.data;
    },
    statesListFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    profileUpdate: (state) => {
      state.isLoading = true;
    },
    profileUpdateSuccess: (state, action) => {
      toast.success("User update successfully");
      state.isLoading = false;
      state.profileUpdate = action?.payload;
    },
    profileUpdateFailure: (state, action) => {
      toast.error(action?.payload?.message);
      state.isLoading = false;
      state.error = action.payload;
    },
    forgotPassword: (state) => {
      state.isLoading = true;
      state.isForgotPassword = true;
    },
    forgotPasswordSuccess: (state, action) => {
      toast.success("Password reset link sent! ");
      state.isLoading = false;
      state.isForgotPassword = false;
      state.forgotPassword = action?.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.isLoading = false;
      state.isForgotPassword = false;
      state.error = action.payload;
    },
    contactUs: (state) => {
      state.isLoading = true;
    },
    contactUsSuccess: (state, action) => {
      state.isLoading = false;
      state.contactUsData = action?.payload;
    },
    contactUsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetPassword: (state) => {
      state.isLoading = true;
      state.isResetPassword = true;
    },
    resetPasswordSuccess: (state, action) => {
      toast.success("Password is reset successfully ");
      state.isLoading = false;
      state.isResetPassword = false;
      state.resetPasswordData = action?.payload;
    },
    resetPasswordFailure: (state, action) => {
      toast.error(action?.payload?.message);
      state.isLoading = false;
      state.isResetPassword = false;
      state.error = action.payload;
    },
    uploadImage: (state) => {
      state.isLoading = true;
      state.isUploadImage = true;
    },
    uploadImageSuccess: (state, action) => {
      state.isLoading = false;
      state.isUploadImage = false;
      state.uploadImageLink = action.payload;
      state.data = action.payload;
    },
    uploadImageFailure: (state, action) => {
      toast.error(action?.payload);
      state.isLoading = false;
      state.isUploadImage = false;
      state.error = action.payload;
    },
    imageUploadHandle: (state) => {
      state.isLoading = true;
      state.isImageUpload = true;
    },
    imageUploadSuccess: (state, action) => {
      state.isLoading = false;
      state.isImageUpload = false;
      state.uploadImage = action.payload;
      state.data = action.payload;
    },
    imageUploadFailure: (state, action) => {
      state.isLoading = false;
      state.isImageUpload = false;
      state.error = action.payload;
    },
    loginGoogle: (state) => {
      state.isLoading = true;
    },
    loginGoogleSuccess: (state, action) => {
      toast.success("Google Login successfully");
      const token = action?.payload?.data?.tokens?.access?.token;
      cookie.set("token", token);

      state.isLoading = false;
      state.googleSend = action.payload;
      state.data = action.payload;
    },
    loginGoogleFailure: (state, action) => {
      toast.error("Google Login Failed");
      state.isLoading = false;
      state.error = action.payload;
    },
    adminDashboardRes: (state) => {
      state.isLoading = true;
    },
    adminDashboardResSuccess: (state, action) => {
      state.isLoading = false;
      state.adminDashboardData = action?.payload;
    },
    adminDashboardResFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    adminOrderRes: (state) => {
      state.isLoading = true;
      state.isOrder = true;
    },
    adminOrderResSuccess: (state, action) => {
      state.isLoading = false;
      state.isOrder = false;
      state.adminOrderData = action?.payload;
    },
    adminOrderResFailure: (state, action) => {
      state.isLoading = false;
      state.isOrder = false;
      state.error = action.payload;
    },
    adminRevenueRes: (state) => {
      state.isLoading = true;
    },
    adminRevenueResSuccess: (state, action) => {
      state.isLoading = false;
      state.adminRevenueData = action?.payload;
    },
    adminRevenueResFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    adminUsers: (state) => {
      state.isUserLoading = true;
   
    },
    adminUsersSuccess: (state, action) => {
      state.isUserLoading = false;
      state.adminUsersRes = action?.payload;
    },
    adminUsersFailure: (state, action) => {
      state.isUserLoading = false;
      state.error = action.payload;
    },
    adminRecentOrder: (state) => {
      state.isLoading = true;
    },
    adminRecentOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.adminRecentOrder = action?.payload;
    },
    adminRecentOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    adminBookTemplatePost: (state) => {
      state.isLoading = true;
    },
    adminBookTemplatePostSuccess: (state, action) => {
      toast.success("BookTemplate Add Successfully");
      state.isLoading = false;
      state.adminBookTemplate = action?.payload;
    },
    adminBookTemplatePostFailure: (state, action) => {    
      toast.error(action?.payload?.message)
      state.isLoading = false;
      state.error = action.payload;
    },
    adminCountryChart: (state) => {
      state.isLoading = true;
    },
    adminCountryChartSuccess: (state, action) => {
      state.isLoading = false;
      state.adminCountryChart = action?.payload;
    },
    adminCountryChartFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    countryUpdate: (state) => {
      state.isLoading = true;
    },
    countryUpdateSuccess: (state, action) => {
      state.isLoading = false;
      state.countryData = action?.payload;
    },
    countryUpdateFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  register,
  registerSuccess,
  registerFailure,
  login,
  loginSuccess,
  loginFailure,
  verify,
  verifySuccess,
  verifyFailure,
  profile,
  profileSuccess,
  profileFailure,
  profileUpdate,
  profileUpdateSuccess,
  profileUpdateFailure,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure,
  imageUploadHandle,
  imageUploadSuccess,
  imageUploadFailure,
  shippingCreate,
  shippingCreateSuccess,
  shippingCreateFailure,
  countryList,
  countryListSuccess,
  countryListFailure,
  statesList,
  statesListSuccess,
  statesListFailure,
  loginGoogle,
  loginGoogleSuccess,
  loginGoogleFailure,
  guestLogin,
  guestLoginSuccess,
  guestLoginFailure,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
  contactUs,
  contactUsSuccess,
  contactUsFailure,
  adminLogin,
  adminLoginSuccess,
  adminLoginFailure,
  adminLogout,
  adminLogoutSuccess,
  adminLogoutFailure,
  adminDashboardRes,
  adminDashboardResSuccess,
  adminDashboardResFailure,
  adminOrderRes,
  adminOrderResSuccess,
  adminOrderResFailure,
  adminRevenueRes,
  adminRevenueResSuccess,
  adminRevenueResFailure,
  adminUsers,
  adminUsersSuccess,
  adminUsersFailure,
  adminRecentOrder,
  adminRecentOrderSuccess,
  adminRecentOrderFailure,
  adminBookTemplatePost,
  adminBookTemplatePostSuccess,
  adminBookTemplatePostFailure,
  adminCountryChart,
  adminCountryChartSuccess,
  adminCountryChartFailure,
  countryUpdate,
  countryUpdateSuccess,
  countryUpdateFailure,
  currencyList,
  currencyListSuccess,
  currencyListFailure
} = loginSlice.actions;
export default loginSlice.reducer;
