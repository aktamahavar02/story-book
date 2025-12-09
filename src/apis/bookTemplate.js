import { deleteRequest, get, patch, post, put } from "../utils/api";

export const bookTemplate = (params) => {
  let queryArray = [];
  Object.entries(params).forEach(([key, value]) => {
    if (key === "idealFor") {
      const values = Array.isArray(value) ? value : [value];
      values.forEach((v) => {
        queryArray.push(`idealFor[]=${encodeURIComponent(v)}`);
      });
    } else {
      queryArray.push(`${key}=${encodeURIComponent(value)}`);
    }
  });
  const finalQuery = queryArray.join("&");
  return get(`/v1/user/bookTemplate/paginated?${finalQuery}`);
};

export const littleGet = (params) => {
  return get(`/v1/user/bookTemplate`);
};

export const categoryTemplate = (params) => {
  const queryString = new URLSearchParams(params).toString();
  return get(`/v1/user/category?${queryString}`);
};
export const personalizationCreate = (data) => {
  const currency = data?.currencyCode;
  delete data?.currencyCode;
  return post(`/v1/user/personalizedBook?currencyCode=${currency}`, data);
};

export const myBooksGet = (data) => {
  return get(
    `/v1/user/personalizedBook/paginated?sortBy=createdAt&orderBy=desc`,
    data
  );
};
export const singleBookTemplateApi = (data) => {
  const id = data.id;
  const currency = data?.currencyCode;
  delete data?.currencyCode;
  return get(`/v1/user/bookTemplate/${id}?currencyCode=${currency}`);
};
export const reviewsApi = (data) => {
  const id = data.bookTemplateId;
  return get(`/v1/user/review/paginated?bookTemplateId=${id}`);
};
export const supportGetApi = () => {
  return get(`/v1/user/supportCategory/`);
};
export const faqsApi = () => {
  return get(`/v1/user/faqs/category/`);
};
export const supportApi = (data) => {
  return post(`/v1/user/support/`, data);
};
export const blogApi = (data) => {
  return post(`/v1/admin/blog`, data);
};

export const cityApi = (data) => {
  return post(`/v1/country/state/cities`, data);
};
export const shippingChargeApi = (data) => {
  const currency = data?.currencyCode;
  delete data?.currencyCode;
  return post(`/v1/user/order/shippingCharge?currencyCode=${currency}`, data);
};
export const shippingQuoteApi = (data) => {
  const currency = data?.currencyCode;
  delete data?.currencyCode;
  return post(`/v1/user/order/shippingQuote?currencyCode=${currency}`, data);
};
// export const checkoutOrderApi = (data) => {
//   const id = data.id;
//   const coupon = data?.couponCode;
//   delete data.id;
//   delete data?.couponCode;
//   const  currency =  data?.currencyCode
//   delete data?.currencyCode
//   return post(`/v1/user/order/checkout/${id}?currencyCode=${currency}&couponCode=${coupon}`, data);
// };

export const checkoutOrderApi = (data) => {
  const id = data.id;
  const coupon = data?.couponCode;
  const currency = data?.currencyCode;
  delete data.id;
  delete data?.couponCode;
  delete data?.currencyCode;
  // Build query params conditionally
  const params = [];
  if (currency) {
    params.push(`currencyCode=${currency}`);
  }
  if (coupon) {
    params.push(`couponCode=${coupon}`);
  }
  const queryString = params.length > 0 ? `?${params.join("&")}` : "";
  return post(`/v1/user/order/checkout/${id}${queryString}`, data);
};

export const blogGetApi = (data) => {
  const limitData = data?.limit;
  const page = data?.page;
  return get(`/v1/admin/blog/paginate?limit=${limitData}&page=${page}`);
};
export const blogUserApi = (data) => {
  const limitData = data?.limit;
  return get(`/v1/user/blog/paginate?limit=${limitData}`);
};
export const blogSingleApi = (data) => {
  const id = data.id;
  return get(`/v1/admin/blog/${id}`);
};
export const blogUserSingleApi = (data) => {
  const id = data.id;
  return get(`/v1/user/blog/${id}`);
};
export const personalizedBookApi = (data) => {
  const id = data.id;
  delete data.id;
  return put(`/v1/user/personalizedBook/${id}`, data);
};
export const confirmApi = (data) => {
  const id = data.id;
  delete data.id;
  return patch(`/v1/user/personalizedBook/confirm/${id}`, data);
};

export const blogUpdateApi = (data) => {
  const id = data.id;
  delete data.id;
  return patch(`/v1/admin/blog/${id}`, data);
};
export const personalizedBookGetApi = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/user/personalizedBook/${id}`);
};
export const userChapterApi = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/user/chapter/${id}`);
};
export const reviewApi = (data) => {
  const limitData = data?.limit;
  return get(`/v1/user/review/paginated?limit=${limitData}`);
};
export const previewApi = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/user/personalizedBook/preview/${id}`);
};
export const userChapterSelectApi = (data) => {
  const id = data.id;
  delete data.id;
  return patch(`/v1/user/chapter/select/${id}`, data);
};
export const requestSupportApi = (data) => {
  const id = data.id;
  delete data.id;
  return patch(`/v1/user/personalizedBook/${id}`, data);
};
export const paymentApi = (data) => {
  const id = data.id;
  delete data.id;
  return post(`/v1/user/payment/create-checkout-session/${id}`, data);
};
export const CouponCodeApi = (data) => {
  const currency = data?.currencyCode;
  delete data?.currencyCode;
  return post(`/v1/user/coupon/validate?currencyCode=${currency}`, data);
};
export const shippingAddressApi = (data) => {
  return post(`/v1/user/user/shippingAddress`, data);
};
export const addressApi = (data) => {
  return get(`/v1/user/user/address`, data);
};
export const personalizedBookCartApi = (data) => {
  const currency = data?.currencyCode;
  delete data?.currencyCode;
  return get(`/v1/user/personalizedBook/cart?currencyCode=${currency}`);
};
export const generateSummaryCategoryApi = (data) => {
  return post(`/v1/user/category/generateSummary`, data);
};

export const orderPaymentData = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/user/order/${id}`);
};
export const orderList = (data) => {
  return get(`/v1/user/order/paginated`);
};
export const previewBookApi = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/user/personalizedBook/preview/${id}`);
};
export const getSingleOrder = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/user/order/details/${id}`, data);
};
export const getSingleOrderAdmin = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/admin/order/details/${id}`, data);
};
export const userOrderApi = (data) => {
  const id = data.id;
  delete data.id;
  return post(`/v1/user/order/${id}`, data);
};
export const countryApi = () => {
  return get(`/v1/country`);
};
export const addCartApi = (data) => {
  const id = data.id;
  delete data.id;
  return patch(`/v1/user/personalizedBook/addToCart/${id}`, data);
};
export const addressUpdateApi = (data) => {
  const id = data.id;
  delete data.id;
  return patch(`/v1/user/user/shippingAddress/${id}`, data);
};
export const addressDeleteApi = (data) => {
  const id = data.id;
  delete data.id;
  return deleteRequest(`/v1/user/user/shippingAddress/${id}`, data);
};
export const blogDeleteApi = (data) => {
  const id = data.id;
  delete data.id;
  return deleteRequest(`/v1/admin/blog/${id}`, data);
};
export const couponDeleteApi = (data) => {
  const id = data.id;
  delete data.id;
  return deleteRequest(`/v1/admin/coupon/${id}`, data);
};
export const faqDeleteApi = (data) => {
  const id = data.id;
  delete data.id;
  return deleteRequest(`/v1/admin/faqs/${id}`, data);
};
export const categoryDeleteApi = (data) => {
  const id = data.id;
  delete data.id;
  return deleteRequest(`/v1/admin/category/${id}`, data);
};
export const templateDeleteApi = (data) => {
  const id = data.id;
  delete data.id;
  return deleteRequest(`/v1/admin/bookTemplate/${id}`, data);
};
export const getTemplateAdminApi = (data) => {
  const { limit, page, searchText } = data || {};

  let url = `/v1/admin/bookTemplate/paginated?limit=${limit}&page=${page}`;

  if (searchText) {
    url += `&searchText=${encodeURIComponent(searchText)}`;
  }

  return get(url);
};
export const bookTemplateDetailsAdmin = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/admin/bookTemplate/${id}`, data);
};
export const chapterUpdateAdmin = (data) => {
  const id = data.id;
  delete data.id;
  return put(`/v1/admin/bookTemplate/${id}`, data);
};
export const bookTemplateGenerateAdmin = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/admin/bookTemplate/generateImage/${id}`);
};
export const orderDetailsSingleApi = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/user/order/${id}`);
};
export const orderDetailsSingleAdminApi = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/admin/order/${id}`);
};
export const trackOrderApi = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/user/order/track/${id}`);
};
export const bookTemplateStatusApi = (data) => {
  return get(`/v1/admin/bookTemplate/stats`);
};
export const blogStatusApi = (data) => {
  return get(`/v1/admin/blog/stats`);
};
export const couponAdminApi = (data) => {
  return post(`/v1/admin/coupon/`, data);
};
export const reviewAddApi = (data) => {
  return post(`/v1/user/review/`, data);
};
export const couponAdminGetApi = (data) => {
  const { limit, page } = data || {};
  delete data?.page; 
  delete data?.limit; 
  return get(`/v1/admin/coupon/paginated?limit=${limit}&page=${page}`, data);
};
export const categoryAddApi = (data) => {
  return post(`/v1/admin/category`, data);
};
export const faqAdminApi = (data) => {
  return post(`/v1/admin/faqs`, data);
};
export const faqAdminUpdateApi = (data) => {
  const id = data.id;
  delete data.id;
  return put(`/v1/admin/faqs/${id}`, data);
};

export const categoryGetApi = (data) => {
  return get(`/v1/admin/category`, data);
};
export const faqAdminGetApi = (data) => {
  return get(`/v1/admin/faqs`, data);
};
export const categoryUpdateApi = (data) => {
  const id = data.id;
  delete data.id;
  return put(`/v1/admin/category/${id}`, data);
};
export const couponAdminUpdateApi = (data) => {
  const id = data.id;
  delete data.id;
  return put(`/v1/admin/coupon/${id}`, data);
};
export const bookTemplatePulingAdmin = (data) => {
  const id = data.id;
  delete data.id;
  return get(`/v1/admin/bookTemplate/${id}`);
};

export const getBookPriceAdminApi = (data) => {
  return get(`/v1/admin/bookPrice/`, data);
};
export const updateBookPriceApi = (data) => {
  const id = data.id;
  delete data.id;
  return patch(`/v1/admin/bookPrice/${id}`, data);
};
export const bookTemplateApi = {
  bookTemplate,
  categoryTemplate,
  personalizationCreate,
  littleGet,
  myBooksGet,
  singleBookTemplateApi,
  reviewsApi,
  supportGetApi,
  supportApi,
  faqsApi,
  blogApi,
  blogGetApi,
  blogSingleApi,
  blogUpdateApi,
  blogUserApi,
  blogUserSingleApi,
  personalizedBookApi,
  personalizedBookGetApi,
  userChapterApi,
  userChapterSelectApi,
  reviewApi,
  requestSupportApi,
  shippingChargeApi,
  shippingQuoteApi,
  checkoutOrderApi,
  CouponCodeApi,
  addressApi,
  addCartApi,
  shippingAddressApi,
  addressDeleteApi,
  addressUpdateApi,

  previewApi,
  paymentApi,
  cityApi,
  countryApi,
  personalizedBookCartApi,
  generateSummaryCategoryApi,
  confirmApi,
  previewBookApi,
  userOrderApi,
  blogDeleteApi,
  orderPaymentData,
  orderList,
  getSingleOrder,
  getSingleOrderAdmin,
  getTemplateAdminApi,
  bookTemplateDetailsAdmin,
  chapterUpdateAdmin,
  getBookPriceAdminApi,
  updateBookPriceApi,
  bookTemplateGenerateAdmin,
  couponAdminApi,
  couponAdminGetApi,
  couponAdminUpdateApi,
  categoryAddApi,
  categoryGetApi,
  categoryUpdateApi,
  faqAdminApi,
  faqAdminGetApi,
  faqAdminUpdateApi,
  orderDetailsSingleApi,
  orderDetailsSingleAdminApi,
  trackOrderApi,
  bookTemplateStatusApi,
  reviewAddApi,
  couponDeleteApi,
  faqDeleteApi,
  categoryDeleteApi,
  templateDeleteApi,
  blogStatusApi,
  bookTemplatePulingAdmin,
};
