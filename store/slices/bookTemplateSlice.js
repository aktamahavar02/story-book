import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const bookTemplateSlice = createSlice({
  name: "bookTemplate",
  initialState: {
    data: {},
    bookTemplateData: [],
    categoryTemplateData: [],
    personalizationData: {},
    littleData: [],
    login: {},
    currency: {},
    country: {},
    myBooksData: {},
    singleBookTemplateData: [],
    reviewsList: [],
    supportRes: {},
    orderList: {},
    getTemplateDetailsAdmin: {},
    updateChapterAdmin: {},
    isBook: false,
    blogAdd: {},
    getTemplateAdminData: {},

    getBookPriceAdminData: {},
    blogUpdate: {},
    isOrder: false,
    isCartLoading: false,
    isNavbarOpen: false,
    blogGet: [],
    blogGetUser: [],
    blogSingleGetData: [],
    blogSingleGetDataUser: [],
    personalizedBookData: {},
    personalizedBookList: {},
    bookTemplateGenerationAdmin: {},
    singleOrder: {},
    blogDelete: {},
    couponDeleteData: {},
    faqDeleteData: {},
    categoryDeleteData: {},
    templateDeleteData: {},
    userChapterList: {},
    reviewData: {},
    cartData: {},
    countryData: {},
    countryStateData: {},
    cityData: {},
    requestSupportData: {},
    orderDetails: {},
    shippingQuoteData: {},
    checkoutOrderData: {},
    couponData: {},
    payment: {},
    addCartData: {},
    getAddressData: {},
    shippingAddressData: {},
    previewBookData: {},
    singleAdminOrder: {},
    addressDeleteData: {},
    addressUpdateData: {},
    addressUpdateData: {},
    generateSummaryData: {},
    bookTemplatePulingAdmin: {},
    couponAdminData: {},
    couponAdminGetData: [],
    couponAdminUpdateData: {},
    categoryGetData: {},
    categoryUpdateData: {},
    faqsAdminData: {},
    faqsAdminUpdateData: {},
    orderDetails: {},
    orderDetailsAdmin: {},
    faqsAdminGetData: {},
    userOrderGet: {},
    confirmData: {},
    trackOrderData: {},
    bookTemplateStatusData: {},
    blogStatusData: {},
    reviewAddData: {},
    userChapterSelectList: [],
    isLoading: false,
    isOrderList: false,
    isFaqUpdate: false,
    isFaq: false,
    isFaqGet: false,
    isCategoryGet: false,
    isCategoryUpdate: false,
    isCategoryAdd: false,
    isSingleOder: false,
    isBookTemplateGeneration: false,
    isConfirmLoading: false,
    isBlogSingle: false,
    isOrderDetails: false,
    isOrderDetailsAdmin: false,
    isBlog: false,
    isCreate: false,
    isUpdate: false,
    isLoadingExplore: false,
    isPay: false,
    isGenerateSummary: false,
    isPreviewLoading: false,
    isCharge: false,
    isQuote: false,
    isCheckout: false,
    isChapterLoad: false,
    isPersonalizedBook: false,
    isPreview: false,
    error: null,
    supportSend: {},
    faqsRes: [],
  },
  reducers: {
    bookTemplate: (state) => {
      state.isLoading = true;
    },
    bookTemplateSuccess: (state, action) => {
      // toast.success(action.payload?.data?.message);
      state.isLoading = false;
      state.bookTemplateData = action?.payload?.data;
      state.data = action?.payload || [];
    },
    bookTemplateFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    littleGet: (state) => {
      state.isLoading = true;
    },
    littleGetSuccess: (state, action) => {
      state.isLoading = false;
      state.littleData = action?.payload?.data;
      state.data = action?.payload || [];
    },
    littleGetFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    categoryTemplate: (state) => {
      state.isLoading = true;
    },
    categoryTemplateSuccess: (state, action) => {
      // toast.success(action.payload?.data?.message);
      state.isLoading = false;
      state.categoryTemplateData = action?.payload?.data;
      state.data = action?.payload || [];
    },
    categoryTemplateFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action?.payload;
    },  
    setCountry: (state, action) => {
      state.country = action?.payload;
    },
    personalizationCreate: (state) => {
      state.isLoading = true;
    },
    personalizationCreateSuccess: (state, action) => {
      // toast.success(action.payload?.data?.message);
      toast.success("personalization created successfully");
      state.isLoading = false;
      state.personalizationData = action?.payload?.data;
      state.data = action?.payload || [];
    },
    personalizationCreateFailure: (state, action) => {
      state.isLoading = false;
      toast.error("personalization failed");
      state.error = action.payload;
    },
    // myBooksGet: (state) => {
    //   state.isLoading = true;
    // },
    // myBooksGetSuccess: (state, action) => {
    //   // toast.success(action.payload?.data?.message);
    //   state.isLoading = false;
    //   state.myBooksData = action?.payload?.data;
    //   state.data = action?.payload || [];
    // },
    // myBooksGetFailure: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    myBooksGet: (state) => {
      state.isBook = true;
    },
    myBooksGetSuccess: (state, action) => {
      // toast.success(action.payload?.data?.message);
      state.isBook = false;
      state.myBooksData = action?.payload?.data;
      state.data = action?.payload || [];
    },
    myBooksGetFailure: (state, action) => {
      state.isBook = false;
      state.error = action.payload;
    },
    setIsNavbarOpen: (state, action) => {
      state.isNavbarOpen = action?.payload;
    },
    singleBookTemplate: (state) => {
      state.isLoadingExplore = true;
    },
    singleBookTemplateSuccess: (state, action) => {
      // toast.success(action.payload?.data?.message);
      state.isLoadingExplore = false;
      state.singleBookTemplateData = action?.payload?.data;
      state.data = action?.payload || [];
    },
    singleBookTemplateFailure: (state, action) => {
      state.isLoadingExplore = false;
      state.error = action.payload;
    },
    reviews: (state) => {
      state.isLoading = true;
    },
    reviewsListSuccess: (state, action) => {
      // toast.success(action.payload?.data?.message);
      state.isLoading = false;
      state.reviewsList = action?.payload?.data;
      state.data = action?.payload || [];
    },
    reviewsListFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    supportList: (state) => {
      state.isLoading = true;
    },
    supportListSuccess: (state, action) => {
      state.isLoading = false;
      state.supportRes = action?.payload;
    },
    supportListFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    supportData: (state) => {
      state.isLoading = true;
    },
    supportDataSuccess: (state, action) => {
      toast.success("Support created successfully");
      state.isLoading = false;
      state.supportSend = action?.payload;
    },
    supportDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    faqsData: (state) => {
      state.isLoading = true;
    },
    faqsDataSuccess: (state, action) => {
      state.isLoading = false;
      state.faqsRes = action?.payload;
    },
    faqsDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    blogCreate: (state) => {
      state.isLoading = true;
      state.isCreate = true;
    },
    blogCreateSuccess: (state, action) => {
      toast.success("Blog created successfully");
      state.isLoading = false;
      state.isCreate = false;
      state.blogAdd = action?.payload;
    },
    blogCreateFailure: (state, action) => {
      state.isLoading = false;
      state.isCreate = false;
      state.error = action.payload;
    },

    blogUpdate: (state) => {
      state.isLoading = true;
      state.isUpdate = true;
    },

    blogUpdateSuccess: (state, action) => {
      toast.success("Blog Update successfully");
      state.isLoading = false;
      state.isUpdate = false;
      state.blogUpdate = action?.payload;
    },
    blogUpdateFailure: (state, action) => {
      state.isLoading = false;
      state.isUpdate = false;
      state.error = action.payload;
    },

    blogGet: (state) => {
      state.isLoading = true;
      state.isBlog = true;
    },
    blogGetSuccess: (state, action) => {
      state.isLoading = false;
      state.isBlog = false;
      state.blogGet = action?.payload;
    },
    blogGetFailure: (state, action) => {
      state.isLoading = false;
      state.isBlog = false;
      state.error = action.payload;
    },
    blogGetUser: (state) => {
      state.isLoading = true;
    },
    blogGetUserSuccess: (state, action) => {
      state.isLoading = false;
      state.blogGetUser = action?.payload;
    },
    blogGetUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    blogSingleGet: (state) => {
      state.isLoading = true;
      state.isBlogSingle = true;
    },
    blogSingleGetSuccess: (state, action) => {
      state.isLoading = false;
      state.isBlogSingle = false;
      state.blogSingleGetData = action?.payload;
    },
    blogSingleGetFailure: (state, action) => {
      state.isLoading = false;
      state.isBlogSingle = false;
      state.error = action.payload;
    },
    blogSingleGetUser: (state) => {
      state.isLoading = true;
    },
    blogSingleGetUserSuccess: (state, action) => {
      state.isLoading = false;
      state.blogSingleGetDataUser = action?.payload;
    },
    blogSingleGetUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    personalizedBook: (state) => {
      state.isLoading = true;
      state.isPersonalizedBook = true;
    },
    personalizedBookSuccess: (state, action) => {
      toast.success("Dedication Create successfully");
      state.isLoading = false;
      state.isPersonalizedBook = false;
      state.personalizedBookData = action?.payload;
    },
    personalizedBookFailure: (state, action) => {
      toast.error("Dedication Book Failed");
      state.isLoading = false;
      state.isPersonalizedBook = false;
      state.error = action.payload;
    },
    personalizedBookGet: (state) => {
      state.isLoading = true;
      state.isChapterLoad = true;
    },
    personalizedBookGetSuccess: (state, action) => {
      state.isLoading = false;
      state.isChapterLoad = false;
      state.personalizedBookList = action?.payload;
    },
    personalizedBookGetFailure: (state, action) => {
      state.isLoading = false;
      state.isChapterLoad = false;
      state.error = action.payload;
    },
    userChapterGet: (state) => {
      state.isLoading = true;
    },
    userChapterGetSuccess: (state, action) => {
      state.isLoading = false;
      state.userChapterList = action?.payload;
    },
    userChapterGetFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    userChapterSelect: (state) => {
      state.isLoading = true;
    },
    userChapterSelectSuccess: (state, action) => {
      state.isLoading = false;
      state.userChapterSelectList = action?.payload;
    },
    userChapterSelectFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    reviewGet: (state) => {
      state.isLoading = true;
    },
    reviewGetSuccess: (state, action) => {
      state.isLoading = false;
      state.reviewData = action?.payload;
    },
    reviewGetFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    previewGet: (state) => {
      state.isLoading = true;
      state.isPreview = true;
    },
    previewGetSuccess: (state, action) => {
      state.isLoading = false;
      state.isPreview = false;
      state.previewList = action?.payload;
    },
    previewGetFailure: (state, action) => {
      state.isLoading = false;
      state.isPreview = false;
      state.error = action.payload;
    },
    payment: (state) => {
      state.isPay = true;
    },
    paymentSuccess: (state, action) => {
      state.isPay = false;
      state.payment = action?.payload;
    },
    paymentFailure: (state, action) => {
      toast.error(action.payload?.message);
      state.isPay = false;
      state.error = action.payload;
    },
    confirm: (state) => {
      state.isConfirmLoading = true;
    },
    confirmSuccess: (state, action) => {
      state.isConfirmLoading = false;
      state.confirmData = action?.payload;
    },
    confirmFailure: (state, action) => {
      state.isConfirmLoading = false;
      state.error = action.payload;
    },
    personalizedBookCart: (state) => {
      state.isLoading = true;
    },
    personalizedBookCartSuccess: (state, action) => {
      state.isLoading = false;
      state.cartData = action?.payload;
    },
    personalizedBookCartFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    city: (state) => {
      state.isLoading = true;
    },
    citySuccess: (state, action) => {
      state.isLoading = false;
      state.cityData = action?.payload;
    },
    cityFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    requestSupport: (state) => {
      state.isLoading = true;
    },
    requestSupportSuccess: (state, action) => {
      state.isLoading = false;
      state.requestSupportData = action?.payload;
    },
    requestSupportFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    shippingCharge: (state) => {
      state.isLoading = true;
      state.isCharge = true;
    },
    shippingChargeSuccess: (state, action) => {
      state.isLoading = false;
      state.isCharge = false;
      state.requestSupportData = action?.payload;
    },
    clearShippingCharge: (state, action) => {
      state.isLoading = false;
      state.isCharge = false;
      state.requestSupportData = {};
    },
    shippingChargeFailure: (state, action) => {
      toast.error(action.payload?.message);
      state.isLoading = false;
      state.isCharge = false;
      state.error = action.payload;
    },
    shippingQuote: (state) => {
      state.isLoading = true;
      state.isQuote = true;
    },
    shippingQuoteSuccess: (state, action) => {
      state.isLoading = false;
      state.isQuote = false;
      state.shippingQuoteData = action?.payload;
    },
    shippingQuoteFailure: (state, action) => {
      state.isLoading = false;
      state.isQuote = false;
      state.error = action.payload;
    },
    checkoutOrder: (state) => {
      state.isLoading = true;
      state.isCheckout = true;
    },
    checkoutOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.isCheckout = false;
      state.checkoutOrderData = action?.payload;
    },
    checkoutOrderFailure: (state, action) => {
      state.isLoading = false;
      state.isCheckout = false;
      state.error = action.payload;
    },
    couponCode: (state) => {
      state.isLoading = true;
    },
    couponCodeSuccess: (state, action) => {
      state.isLoading = false;
      state.couponData = action?.payload;
    },
    couponCodeFailure: (state, action) => {
      toast.error(action.payload?.message);
      state.isLoading = false;
      state.error = action.payload;
    },
    addCart: (state) => {
      state.isCartLoading = true;
    },
    addCartSuccess: (state, action) => {
      state.isCartLoading = false;
      state.addCartData = action?.payload;
    },
    addCartFailure: (state, action) => {
      state.isCartLoading = false;
      state.error = action.payload;
    },
    getAddress: (state) => {
      state.isLoading = true;
    },
    getAddressSuccess: (state, action) => {
      state.isLoading = false;
      state.getAddressData = action?.payload;
    },
    getAddressFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    shippingAddress: (state) => {
      state.isLoading = true;
    },
    shippingAddressSuccess: (state, action) => {
      // toast.success("Address Add Successfully");
      state.isLoading = false;
      state.shippingAddressData = action?.payload;
    },
    shippingAddressFailure: (state, action) => {
      toast.error(action.payload?.message);
      state.isLoading = false;
      state.error = action.payload;
    },
    previewBook: (state) => {
      state.isPreviewLoading = true;
      state.isLoading = true;
    },
    previewBookSuccess: (state, action) => {
      state.isLoading = false;
      state.isPreviewLoading = false;
      state.previewBookData = action?.payload;
    },
    previewBookFailure: (state, action) => {
      state.isLoading = false;
      state.isPreviewLoading = false;
      state.error = action.payload;
    },
    addressDelete: (state) => {
      state.isLoading = true;
    },
    addressDeleteSuccess: (state, action) => {
      toast.success("address Updated Successfully");
      state.isLoading = false;
      state.addressDeleteData = action?.payload;
    },
    addressDeleteFailure: (state, action) => {
      toast.error(action.payload?.message);
      state.isLoading = false;
      state.error = action.payload;
    },
    addressUpdate: (state) => {
      state.isLoading = true;
    },
    addressUpdateSuccess: (state, action) => {
      toast.success("address Updated Successfully");
      state.isLoading = false;
      state.addressUpdateData = action?.payload;
    },
    addressUpdateFailure: (state, action) => {
      toast.error(action.payload?.message);
      state.isLoading = false;
      state.error = action.payload;
    },
    generateSummaryCategory: (state) => {
      state.isLoading = true;
      state.isGenerateSummary = true;
    },
    generateSummaryCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.isGenerateSummary = false;
      state.generateSummaryData = action?.payload;
    },
    generateSummaryCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.isGenerateSummary = false;
      state.error = action.payload;
    },
    orderDetails: (state) => {
      state.isLoading = true;
    },
    orderDetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.orderDetails = action?.payload;
    },
    orderDetailsFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    userOrder: (state) => {
      state.isLoading = true;
      state.isOrder = true;
    },
    userOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.isOrder = false;
      state.userOrderGet = action?.payload;
    },
    userOrderFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.isOrder = false;
      state.error = action.payload;
    },
    orderList: (state) => {
      state.isLoading = true;
      state.isOrderList = true;
    },
    orderListSuccess: (state, action) => {
      state.isLoading = false;
      state.isOrderList = false;
      state.orderList = action?.payload;
    },
    orderListFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.isOrderList = false;
      state.error = action.payload;
    },
    getSingleOrder: (state) => {
      state.isLoading = true;
    },
    getSingleOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.singleOrder = action?.payload;
    },
    getSingleOrderFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    blogDelete: (state) => {
      state.isLoading = true;
    },
    blogDeleteSuccess: (state, action) => {
      toast.success("Blog Delete Successfully");
      state.isLoading = false;
      state.blogDelete = action?.payload;
    },
    blogDeleteFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
     couponDelete: (state) => {
      state.isLoading = true;
    },
    couponDeleteSuccess: (state, action) => {
      toast.success("Coupon Delete Successfully");
      state.isLoading = false;
      state.couponDeleteData = action?.payload;
    },
    couponDeleteFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    }, 
      faqDelete: (state) => {
      state.isLoading = true;
    },
    faqDeleteSuccess: (state, action) => {
      toast.success("FQA Delete Successfully");
      state.isLoading = false;
      state.faqDeleteData = action?.payload;
    },
    faqDeleteFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    }, 
      categoryDelete: (state) => {
      state.isLoading = true;
    },
    categoryDeleteSuccess: (state, action) => {
      toast.success(" Category Delete Successfully");
      state.isLoading = false;
      state.categoryDeleteData = action?.payload;
    },
    categoryDeleteFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    }, 
    templateDelete: (state) => {
      state.isLoading = true;
    },
    templateDeleteSuccess: (state, action) => {
      toast.success(" Category Delete Successfully");
      state.isLoading = false;
      state.templateDeleteData = action?.payload;
    },
    templateDeleteFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    getSingleAdminOrder: (state) => {
      state.isSingleOder = true;
    },
    getSingleAdminOrderSuccess: (state, action) => {
      state.isSingleOder = false;
      state.singleAdminOrder = action?.payload;
    },
    getSingleAdminOrderFailure: (state, action) => {
      toast.error(action.payload);
      state.isSingleOder = false;
      state.error = action.payload;
    },
    getTemplateAdmin: (state) => {
      state.isLoading = true;
    },
    getTemplateAdminSuccess: (state, action) => {
      state.isLoading = false;
      state.getTemplateAdminData = action?.payload;
    },
    getTemplateAdminFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },

    getBookPriceAdmin: (state) => {
      state.isLoading = true;
    },
    getBookPriceAdminSuccess: (state, action) => {
      state.isLoading = false;
      state.getBookPriceAdminData = action?.payload;
    },
    getBookPriceAdminFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    updateBookPrice: (state) => {
      state.isLoading = true;
    },
    updateBookPriceSuccess: (state, action) => {
      toast.success("Book Price Update Successfully");
      state.isLoading = false;
      state.getBookPriceAdminData = action?.payload;
    },
    updateBookPriceFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    getTemplateDetailsAdmin: (state) => {
      state.isLoading = true;
    },
    getTemplateDetailsAdminSuccess: (state, action) => {
      state.isLoading = false;
      state.getTemplateDetailsAdmin = action?.payload;
    },
    getTemplateDetailsAdminFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    bookChaptersUpdateAdmin: (state) => {
      state.isLoading = true;
    },
    bookChaptersUpdateAdminSuccess: (state, action) => {
      toast.success("Book Template Update Successfully");
      state.isLoading = false;
      state.updateChapterAdmin = action?.payload;
    },
    bookChaptersUpdateAdminFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    bookTemplateGenerationAdmin: (state) => {
      state.isLoading = true;
      state.isBookTemplateGeneration = true;
    },
    bookTemplateGenerationAdminSuccess: (state, action) => {
      state.isLoading = false;
      state.isBookTemplateGeneration = false;
      state.bookTemplateGenerationAdmin = action?.payload;
    },
    bookTemplateGenerationAdminFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.isBookTemplateGeneration = false;
      state.error = action.payload;
    },
    bookTemplatePulingAdmin: (state) => {
      state.isLoading = true;
    },
    bookTemplatePulingAdminSuccess: (state, action) => {
      state.isLoading = false;
      state.bookTemplatePulingAdmin = action?.payload;
    },
    bookTemplatePulingAdminFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },

    couponAdmin: (state) => {
      state.isLoading = true;
    },
    couponAdminSuccess: (state, action) => {
      toast.success("Coupon Code Create Successfully ");
      state.isLoading = false;
      state.couponAdminData = action?.payload;
    },
    couponAdminFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    couponAdminGet: (state) => {
      state.isLoading = true;
    },
    couponAdminGetSuccess: (state, action) => {
      state.isLoading = false;
      state.couponAdminGetData = action?.payload;
    },
    couponAdminGetFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    couponAdminUpdate: (state) => {
      state.isLoading = true;
    },
    couponAdminUpdateSuccess: (state, action) => {
      toast.success("Coupon Code Update Successfully ");
      state.isLoading = false;
      state.couponAdminUpdateData = action?.payload;
    },
    couponAdminUpdateFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    categoryAdd: (state) => {
      state.isLoading = true;
      state.isCategoryAdd = true;
    },
    categoryAddSuccess: (state, action) => {
      toast.success("Category Add Successfully ");
      state.isLoading = false;
      state.isCategoryAdd = false;
      state.categoryAddData = action?.payload;
    },
    categoryAddFailure: (state, action) => {

      toast.error(action.payload);
      state.isLoading = false;
      state.isCategoryAdd = false;
      state.error = action.payload;
    },
    categoryGet: (state) => {
      state.isLoading = true;
      state.isCategoryGet = true;
    },
    categoryGetSuccess: (state, action) => {
      state.isLoading = false;
      state.isCategoryGet = false;
      state.categoryGetData = action?.payload;
    },
    categoryGetFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.isCategoryGet = false;
      state.error = action.payload;
    },
    categoryUpdate: (state) => {
      state.isLoading = true;
      state.isCategoryUpdate = true;
    },
    categoryUpdateSuccess: (state, action) => {
      toast.success("Category Update Successfully ");
      state.isLoading = false;
      state.isCategoryUpdate = false;
      state.categoryUpdateData = action?.payload;
    },
    categoryUpdateFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.isCategoryUpdate = false;
      state.error = action.payload;
    },
    faqAdmin: (state) => {
      state.isFaq = true;
    },
    faqAdminSuccess: (state, action) => {
      toast.success("FAQ Update Successfully ");
      state.isFaq = false;
      state.faqsAdminData = action?.payload;
    },
    faqAdminFailure: (state, action) => {
      toast.error(action.payload);
      state.isFaq = false;
      state.error = action.payload;
    },
    faqAdminGet: (state) => {
      state.isFaqGet = true;
    },
    faqAdminGetSuccess: (state, action) => {
      state.isFaqGet = false;
      state.faqsAdminGetData = action?.payload;
    },
    faqAdminGetFailure: (state, action) => {
      toast.error(action.payload);
      state.isFaqGet = false;
      state.error = action.payload;
    },
    faqAdminUpdate: (state) => {
      state.isFaqUpdate = true;
    },
    faqAdminUpdateSuccess: (state, action) => {
      state.isFaqUpdate = false;
      state.faqsAdminUpdateData = action?.payload;
    },
    faqAdminUpdateFailure: (state, action) => {
      toast.error(action.payload);
      state.isFaqUpdate = false;
      state.error = action.payload;
    },  
    orderDetailsSingle : (state) => {
      state.isOrderDetails = true;
    },
    orderDetailsSingleSuccess: (state, action) => {
      state.isOrderDetails = false;
      state.orderDetails = action?.payload;
    },
    orderDetailsSingleFailure: (state, action) => {
      toast.error(action.payload);
      state.isOrderDetails = false;
      state.error = action.payload;
    },
     orderDetailsSingleAdmin : (state) => {
      state.isOrderDetailsAdmin = true;
    },
    orderDetailsSingleAdminSuccess: (state, action) => {
      state.isOrderDetailsAdmin = false;
      state.orderDetailsAdmin = action?.payload;
    },
    orderDetailsSingleAdminFailure: (state, action) => {
      toast.error(action.payload);
      state.isOrderDetailsAdmin = false;
      state.error = action.payload;
    },
    trackOrder: (state) => {
      state.isLoading = true;
    },
    trackOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.trackOrderData = action?.payload;
    },
    trackOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    bookTemplateStatus: (state) => {
      state.isLoading = true;
    },
    bookTemplateStatusSuccess: (state, action) => {
      state.isLoading = false;
      state.bookTemplateStatusData = action?.payload;
    },
    bookTemplateStatusFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, 
    blogStatus: (state) => {
      state.isLoading = true;
    },
    blogStatusSuccess: (state, action) => {
      state.isLoading = false;
      state.blogStatusData = action?.payload;
    },
    blogStatusFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, 
     reviewAdd: (state) => {
      state.isLoading = true;
    },
    reviewAddSuccess: (state, action) => {
      toast.success("Review Create Successfully ");
      state.isLoading = false;
      state.reviewAddData = action?.payload;
    },
    reviewAddFailure: (state, action) => {
      toast.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  bookTemplate,
  bookTemplateSuccess,
  bookTemplateFailure,
  categoryTemplate,
  categoryTemplateSuccess,
  categoryTemplateFailure,
  personalizationCreate,
  personalizationCreateSuccess,
  personalizationCreateFailure,
  littleGet,
  littleGetSuccess,
  littleGetFailure,
  myBooksGet,
  myBooksGetSuccess,
  myBooksGetFailure,
  singleBookTemplate,
  singleBookTemplateSuccess,
  singleBookTemplateFailure,
  reviews,
  reviewsListSuccess,
  reviewsListFailure,
  supportList,
  supportListSuccess,
  supportListFailure,
  supportData,
  supportDataSuccess,
  supportDataFailure,
  faqsDataSuccess,
  faqsData,
  faqsDataFailure,
  blogCreate,
  blogCreateSuccess,
  blogCreateFailure,
  blogGet,
  blogGetSuccess,
  blogGetFailure,
  blogSingleGet,
  blogSingleGetSuccess,
  blogSingleGetFailure,
  blogUpdate,
  blogUpdateSuccess,
  blogUpdateFailure,
  blogGetUser,
  blogGetUserSuccess,
  blogGetUserFailure,
  blogSingleGetUser,
  blogSingleGetUserSuccess,
  blogSingleGetUserFailure,
  personalizedBook,
  personalizedBookSuccess,
  personalizedBookFailure,
  personalizedBookGet,
  personalizedBookGetSuccess,
  personalizedBookGetFailure,
  userChapterGet,
  userChapterGetSuccess,
  userChapterGetFailure,
  userChapterSelect,
  userChapterSelectSuccess,
  userChapterSelectFailure,
  reviewGet,
  reviewGetSuccess,
  reviewGetFailure,
  previewGet,
  previewGetSuccess,
  previewGetFailure,
  payment,
  paymentSuccess,
  paymentFailure,
  confirm,
  confirmSuccess,
  confirmFailure,
  personalizedBookCart,
  personalizedBookCartSuccess,
  personalizedBookCartFailure,
  city,
  citySuccess,
  cityFailure,
  requestSupport,
  requestSupportSuccess,
  requestSupportFailure,
  shippingCharge,
  shippingChargeSuccess,
  shippingChargeFailure,
  shippingQuote,
  shippingQuoteFailure,
  shippingQuoteSuccess,
  setIsNavbarOpen,
  checkoutOrder,
  checkoutOrderSuccess,
  checkoutOrderFailure,
  couponCode,
  couponCodeSuccess,
  couponCodeFailure,
  addCart,
  addCartSuccess,
  addCartFailure,
  getAddress,
  getAddressSuccess,
  getAddressFailure,
  shippingAddress,
  shippingAddressSuccess,
  shippingAddressFailure,
  addressDelete,
  addressDeleteSuccess,
  addressDeleteFailure,
  addressUpdate,
  addressUpdateSuccess,
  addressUpdateFailure,
  previewBook,
  previewBookFailure,
  previewBookSuccess,
  generateSummaryCategory,
  generateSummaryCategorySuccess,
  generateSummaryCategoryFailure,
  userOrder,
  userOrderSuccess,
  userOrderFailure,
  orderDetails,
  orderDetailsSuccess,
  orderDetailsFailure,
  orderList,
  orderListSuccess,
  orderListFailure,
  getSingleOrder,
  getSingleOrderSuccess,
  getSingleOrderFailure,
  blogDelete,
  blogDeleteSuccess,
  blogDeleteFailure,
  getSingleAdminOrder,
  getSingleAdminOrderSuccess,
  getSingleAdminOrderFailure,
  getTemplateAdmin,
  getTemplateAdminSuccess,
  getTemplateAdminFailure,
  getTemplateDetailsAdmin,
  getTemplateDetailsAdminSuccess,
  getTemplateDetailsAdminFailure,
  bookChaptersUpdateAdmin,
  bookChaptersUpdateAdminSuccess,
  bookChaptersUpdateAdminFailure,
  getBookPriceAdmin,
  getBookPriceAdminSuccess,
  getBookPriceAdminFailure,
  updateBookPrice,
  updateBookPriceSuccess,
  updateBookPriceFailure,
  bookTemplateGenerationAdmin,
  bookTemplateGenerationAdminSuccess,
  bookTemplateGenerationAdminFailure,
  bookTemplatePulingAdmin,
  bookTemplatePulingAdminSuccess,
  bookTemplatePulingAdminFailure,
  couponAdmin,
  couponAdminSuccess,
  couponAdminFailure,
  couponAdminGet,
  couponAdminGetSuccess,
  couponAdminGetFailure,
  couponAdminUpdate,
  couponAdminUpdateSuccess,
  couponAdminUpdateFailure,
  categoryAdd,
  categoryAddSuccess,
  categoryAddFailure,
  categoryGet,
  categoryGetSuccess,
  categoryGetFailure,
  categoryUpdate,
  categoryUpdateSuccess,
  categoryUpdateFailure,
  faqAdmin,
  faqAdminSuccess,
  faqAdminFailure,
  faqAdminGet,
  faqAdminGetSuccess,
  faqAdminGetFailure,
  faqAdminUpdate,
  faqAdminUpdateSuccess,
  faqAdminUpdateFailure,
  setCurrency,
  setCountry,
  orderDetailsSingle,
  orderDetailsSingleSuccess,
  orderDetailsSingleFailure,
  trackOrder,
  trackOrderSuccess,
  trackOrderFailure,
  orderDetailsSingleAdmin,
  orderDetailsSingleAdminSuccess,
  orderDetailsSingleAdminFailure,
  bookTemplateStatus,
  bookTemplateStatusSuccess,
  bookTemplateStatusFailure,
  blogStatus,
  blogStatusSuccess,
  blogStatusFailure,
  reviewAdd,
  reviewAddSuccess,
  reviewAddFailure,
  couponDelete,
  couponDeleteSuccess,
  couponDeleteFailure,
  faqDelete,
  faqDeleteSuccess,
  faqDeleteFailure,
  categoryDelete,
  categoryDeleteSuccess,
  categoryDeleteFailure,
  templateDelete,
  templateDeleteSuccess,
  templateDeleteFailure
  
} = bookTemplateSlice.actions;
export default bookTemplateSlice.reducer;
