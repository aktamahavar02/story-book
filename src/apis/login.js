import { get, post, put } from "../utils/api";
import axios from "axios";

const apiService = axios.create({});

export const getRegister = (data) => {
  return post(`/v1/user/auth/register`, data);
};
export const shippingCreate = (data) => {
  return post(`/v1/user/user/shippingAddress`, data);
};

export const login = (data) => {
  return post(`/v1/user/auth/login`, data);
};
export const adminLogin = (data) => {
  return post(`/v1/admin/auth/login`, data);
};
export const adminLogout = (data) => {
  return post(`/v1/admin/auth/logout`, data);
};
export const verify = (data) => {
  const token = data.token;
  return get(`/v1/user/auth/verify-email?token=${token}`);
};
export const profile = (data) => {
  return get(`/v1/user/auth/me`);
};
export const adminDashboardList = (data) => {
  return get(`/v1/admin/dashBoard`);
};
export const adminOrderApi = (data) => {
  return get(`/v1/admin/order/paginated`);
};
export const adminRevenueApi = (data) => {
  return get(`/v1/admin/dashBoard/revenue`);
}
export const adminUsers = (data) => {
  const limit = 10;
  const page = data?.page
  return get(`/v1/admin/dashBoard/user?limit=${limit}&page=${page}`);
};

export const recentAdminOrder = () => {
  return get(`/v1/admin/order/recentOrder`);
};
export const adminBookPost = (data) => {
  return post(`/v1/admin/bookTemplate`, data);
};

export const adminCountryChart = (data) => {
  return get(`/v1/admin/dashBoard/revenue/country`, data);
};

export const guestLoginApi = (data) => {
  return post(`/v1/user/auth/guest` , data);
};
export const profileUpdate = (data) => {
  const profileData = data;
  delete profileData.email;
  return put(`/v1/user/auth/me`, profileData);
};
export const uploadImage = (data) => {
  return post(`/v1/s3/presignedurl`, data);
};
export const countryList = (data) => {
  return get(`/v1/country`, data);
};
export const currencyApi = (data) => {
  return get(`/v1/currency`, data);
};
export const loginGoogleApi = (data) => {
  return post(`/v1/user/auth/google`, data);
};
export const forgotPasswordApi = (data) => {
  return post(`/v1/user/auth/forgot-password-based-on-token`, data);
};
export const resetPasswordApi = (data) => {
  return post(`/v1/user/auth/reset-password-based-on-token`, data);
};
export const contactUsApi = (data) => {
  return post(`/v1/user/contactUs`, data);
};
export const statesList = (data) => {
  return post(`/v1/country/state`, data);
};
export const countryUpdateApi = (data) => {
  return put(`/v1/user/user/preferences`, data);
};
export const imageUpload = (data) => {
  return apiService.put(data?.imageUrl, data?.file, {
    headers: {
      "Content-Type": data?.file?.type,
    },
  });
};

export const registerApi = {
  getRegister,
  login,
  verify,
  profile,
  guestLoginApi,
  profileUpdate,
  uploadImage,
  imageUpload,
  shippingCreate,
  countryList,
  currencyApi,
  statesList,
  loginGoogleApi,
  forgotPasswordApi,
  resetPasswordApi,
  contactUsApi,
  countryUpdateApi,
  adminLogin,
  adminLogout,
  adminDashboardList,
  adminOrderApi,
  adminRevenueApi,
  adminUsers,
  recentAdminOrder,
  adminBookPost,
  adminCountryChart
};
