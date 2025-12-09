import { call, put, takeLatest } from "redux-saga/effects";
import {} from "../slices/loginSlice";
import { API } from "../../src/apis";
import {
  addCart,
  addCartFailure,
  addCartSuccess,
  addressDelete,
  addressDeleteFailure,
  addressDeleteSuccess,
  addressUpdate,
  addressUpdateFailure,
  addressUpdateSuccess,
  blogCreate,
  blogCreateFailure,
  blogCreateSuccess,
  blogDelete,
  blogDeleteFailure,
  blogDeleteSuccess,
  blogGet,
  blogGetFailure,
  blogGetSuccess,
  blogGetUser,
  blogGetUserFailure,
  blogGetUserSuccess,
  blogSingleGet,
  blogSingleGetFailure,
  blogSingleGetSuccess,
  blogSingleGetUser,
  blogSingleGetUserFailure,
  blogSingleGetUserSuccess,
  blogStatus,
  blogStatusFailure,
  blogStatusSuccess,
  blogUpdate,
  blogUpdateFailure,
  blogUpdateSuccess,
  bookChaptersUpdateAdmin,
  bookChaptersUpdateAdminFailure,
  bookChaptersUpdateAdminSuccess,
  bookTemplate,
  bookTemplateFailure,
  bookTemplateGenerationAdmin,
  bookTemplateGenerationAdminFailure,
  bookTemplateGenerationAdminSuccess,
  bookTemplatePulingAdmin,
  bookTemplatePulingAdminFailure,
  bookTemplatePulingAdminSuccess,
  bookTemplateStatus,
  bookTemplateStatusFailure,
  bookTemplateStatusSuccess,
  bookTemplateSuccess,
  categoryAdd,
  categoryAddFailure,
  categoryAddSuccess,
  categoryDelete,
  categoryDeleteFailure,
  categoryDeleteSuccess,
  categoryGet,
  categoryGetFailure,
  categoryGetSuccess,
  categoryTemplate,
  categoryTemplateFailure,
  categoryTemplateSuccess,
  categoryUpdate,
  categoryUpdateFailure,
  categoryUpdateSuccess,
  checkoutOrder,
  checkoutOrderFailure,
  checkoutOrderSuccess,
  city,
  cityFailure,
  citySuccess,
  confirm,
  confirmFailure,
  confirmSuccess,
  couponAdmin,
  couponAdminFailure,
  couponAdminGet,
  couponAdminGetFailure,
  couponAdminGetSuccess,
  couponAdminSuccess,
  couponAdminUpdate,
  couponAdminUpdateFailure,
  couponAdminUpdateSuccess,
  couponCode,
  couponCodeFailure,
  couponCodeSuccess,
  couponDelete,
  couponDeleteFailure,
  couponDeleteSuccess,
  faqAdmin,
  faqAdminFailure,
  faqAdminGet,
  faqAdminGetFailure,
  faqAdminGetSuccess,
  faqAdminSuccess,
  faqAdminUpdate,
  faqAdminUpdateFailure,
  faqAdminUpdateSuccess,
  faqDelete,
  faqDeleteFailure,
  faqDeleteSuccess,
  faqsData,
  faqsDataFailure,
  faqsDataSuccess,
  generateSummaryCategory,
  generateSummaryCategoryFailure,
  generateSummaryCategorySuccess,
  getAddress,
  getAddressFailure,
  getAddressSuccess,
  getBookPriceAdmin,
  getBookPriceAdminFailure,
  getBookPriceAdminSuccess,
  getSingleAdminOrder,
  getSingleAdminOrderFailure,
  getSingleAdminOrderSuccess,
  getSingleOrder,
  getSingleOrderFailure,
  getSingleOrderSuccess,
  getTemplateAdmin,
  getTemplateAdminFailure,
  getTemplateAdminSuccess,
  getTemplateDetailsAdmin,
  getTemplateDetailsAdminFailure,
  getTemplateDetailsAdminSuccess,
  littleGet,
  littleGetSuccess,
  myBooksGet,
  myBooksGetFailure,
  myBooksGetSuccess,
  orderDetails,
  orderDetailsFailure,
  orderDetailsSingle,
  orderDetailsSingleAdmin,
  orderDetailsSingleAdminFailure,
  orderDetailsSingleAdminSuccess,
  orderDetailsSingleFailure,
  orderDetailsSingleSuccess,
  orderDetailsSuccess,
  orderList,
  orderListFailure,
  orderListSuccess,
  payment,
  paymentFailure,
  paymentSuccess,
  personalizationCreate,
  personalizationCreateFailure,
  personalizationCreateSuccess,
  personalizedBook,
  personalizedBookCart,
  personalizedBookCartFailure,
  personalizedBookCartSuccess,
  personalizedBookFailure,
  personalizedBookGet,
  personalizedBookGetFailure,
  personalizedBookGetSuccess,
  personalizedBookSuccess,
  previewBook,
  previewBookFailure,
  previewBookSuccess,
  previewGet,
  previewGetFailure,
  previewGetSuccess,
  requestSupport,
  requestSupportFailure,
  requestSupportSuccess,
  reviewAdd,
  reviewAddFailure,
  reviewAddSuccess,
  reviewGet,
  reviewGetFailure,
  reviewGetSuccess,
  reviews,
  reviewsListFailure,
  reviewsListSuccess,
  shippingAddress,
  shippingAddressFailure,
  shippingAddressSuccess,
  shippingCharge,
  shippingChargeFailure,
  shippingChargeSuccess,
  shippingQuote,
  shippingQuoteFailure,
  shippingQuoteSuccess,
  singleBookTemplate,
  singleBookTemplateFailure,
  singleBookTemplateSuccess,
  supportData,
  supportDataFailure,
  supportDataSuccess,
  supportList,
  supportListFailure,
  supportListSuccess,
  templateDelete,
  templateDeleteFailure,
  templateDeleteSuccess,
  trackOrder,
  trackOrderFailure,
  trackOrderSuccess,
  updateBookPrice,
  updateBookPriceFailure,
  updateBookPriceSuccess,
  userChapterGet,
  userChapterGetFailure,
  userChapterGetSuccess,
  userChapterSelect,
  userChapterSelectFailure,
  userChapterSelectSuccess,
  userOrder,
  userOrderFailure,
  userOrderSuccess,
} from "../slices/bookTemplateSlice";

function* BookTemplate(action) {
  try {
        const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.bookTemplate, otherPayload);
 
    if (typeof onSuccess === "function") {
      onSuccess(response);
    }
    yield put(bookTemplateSuccess(response.data));
    
  } catch (error) {
    yield put(bookTemplateFailure(error?.data?.error?.message));
  }
}
function* littleGetData(action) {
  try {
    const response = yield call(API.littleGet, action.payload);
    yield put(littleGetSuccess(response.data));
  } catch (error) {
    yield put(littleGetFailure(error?.data?.error?.message));
  }
}
function* CategoryTemplate(action) {
  try {
    const response = yield call(API.categoryTemplate, action.payload);
    yield put(categoryTemplateSuccess(response.data));
  } catch (error) {
    yield put(categoryTemplateFailure(error?.data?.error?.message));
  }
}
function* PersonalizationCreate(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;

    const response = yield call(API.personalizationCreate, otherPayload);
    yield put(personalizationCreateSuccess(response.data));
    if (typeof onSuccess === "function") {
      onSuccess(response);
    }
  } catch (error) {
    yield put(personalizationCreateFailure(error?.data?.error?.message));
  }
}
function* MyBooks(action) {
  try {
    const response = yield call(API.myBooksGet, action.payload);
    yield put(myBooksGetSuccess(response.data));
  } catch (error) {
    yield put(myBooksGetFailure(error?.data?.error?.message));
  }
}
function* SingleBookTemplate(action) {
  try {
    const response = yield call(API.singleBookTemplateApi, action.payload);
    yield put(singleBookTemplateSuccess(response.data));
  } catch (error) {
    yield put(singleBookTemplateFailure(error?.data?.error?.message));
  }
}
function* Reviews(action) {
  try {
    const response = yield call(API.reviewsApi, action.payload);
    yield put(reviewsListSuccess(response.data));
  } catch (error) {
    yield put(reviewsListFailure(error?.data?.error?.message));
  }
}
function* supportGet(action) {
  try {
    const response = yield call(API.supportGetApi, action.payload);
    yield put(supportListSuccess(response.data));
  } catch (error) {
    yield put(supportListFailure(error?.data?.error?.message));
  }
}
function* support(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.supportApi, otherPayload);
    yield put(supportDataSuccess(response.data));
    if (typeof onSuccess === "function") {
      onSuccess(response);
    }
  } catch (error) {
    yield put(supportDataFailure(error?.data?.error?.message));
  }
}
function* faqsGet(action) {
  try {
    const response = yield call(API.faqsApi, action.payload);
    yield put(faqsDataSuccess(response.data));
  } catch (error) {
    yield put(faqsDataFailure(error?.data?.error?.message));
  }
}
function* blogAdd(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.blogApi, otherPayload);
    yield put(blogCreateSuccess(response.data));
    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    yield put(blogCreateFailure(error?.data?.error?.message));
  }
}
function* blog(action) {
  try {
    const response = yield call(API.blogGetApi, action.payload);

    yield put(blogGetSuccess(response.data));
  } catch (error) {
    yield put(blogGetFailure(error?.data?.error?.message));
  }
}
function* blogSingle(action) {
  try {
    const response = yield call(API.blogSingleApi, action.payload);
    yield put(blogSingleGetSuccess(response.data));
  } catch (error) {
    yield put(blogSingleGetFailure(error?.data?.error?.message));
  }
}
function* blogUser(action) {
  try {
    const response = yield call(API.blogUserApi, action.payload);
    yield put(blogGetUserSuccess(response.data));
  } catch (error) {
    yield put(blogGetUserFailure(error?.data?.error?.message));
  }
}
function* blogSingleUser(action) {
  try {
    const response = yield call(API.blogUserSingleApi, action.payload);
    yield put(blogSingleGetUserSuccess(response.data));
  } catch (error) {
    yield put(blogSingleGetUserFailure(error?.data?.error?.message));
  }
}

function* personalizedBookList(action) {
  try {
    const response = yield call(API.personalizedBookGetApi, action.payload);
    yield put(personalizedBookGetSuccess(response.data));
  } catch (error) {
    yield put(personalizedBookGetFailure(error?.data?.error?.message));
  }
}
function* personalizedBookData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.personalizedBookApi, otherPayload);
    yield put(personalizedBookSuccess(response.data));
    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    yield put(personalizedBookFailure(error?.data?.error?.message));
  }
}
function* blogUpdateData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.blogUpdateApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(blogUpdateSuccess(response.data));
  } catch (error) {
    yield put(blogUpdateFailure(error?.data?.error?.message));
  }
}
function* userChapter(action) {
  try {
    const response = yield call(API.userChapterApi, action?.payload);
    yield put(userChapterGetSuccess(response.data));
  } catch (error) {
    yield put(userChapterGetFailure(error?.data?.error?.message));
  }
}
function* userChapterSelectData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;

    const response = yield call(API.userChapterSelectApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(userChapterSelectSuccess(response.data));
  } catch (error) {
    yield put(userChapterSelectFailure(error?.data?.error?.message));
  }
}
function* review(action) {
  try {
    const response = yield call(API.reviewApi, action?.payload);
    yield put(reviewGetSuccess(response.data));
  } catch (error) {
    yield put(reviewGetFailure(error?.data?.error?.message));
  }
}
function* requestSupportAdd(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.requestSupportApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(requestSupportSuccess(response.data));
  } catch (error) {
    yield put(requestSupportFailure(error?.data?.error?.message));
  }
}
function* shippingChargeAdd(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.shippingChargeApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(shippingChargeSuccess(response.data));
  } catch (error) {
    yield put(shippingChargeFailure(error?.data));
  }
}
function* shippingQuoteSubmit(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.shippingQuoteApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(shippingQuoteSuccess(response.data));
  } catch (error) {
    yield put(shippingQuoteFailure(error?.data?.error?.message));
  }
}
function* checkoutOrderGet(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.checkoutOrderApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(checkoutOrderSuccess(response.data));
  } catch (error) {
    yield put(checkoutOrderFailure(error?.data?.error?.message));
  }
}
function* CouponCodeGet(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.CouponCodeApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(couponCodeSuccess(response.data));
  } catch (error) {
    yield put(couponCodeFailure(error?.data));
  }
}
function* getAddressList(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.addressApi, otherPayload);

    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(getAddressSuccess(response.data));
  } catch (error) {
    yield put(getAddressFailure(error?.data));
  }
}
function* shippingAddressAdd(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.shippingAddressApi, otherPayload);

    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(shippingAddressSuccess(response.data));
  } catch (error) {
    yield put(shippingAddressFailure(error?.data));
  }
}
function* deleteAddress(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.addressDeleteApi, otherPayload);

    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(addressDeleteSuccess(response.data));
  } catch (error) {
    yield put(addressDeleteFailure(error?.data));
  }
}
function* address(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.addressUpdateApi, otherPayload);

    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(addressUpdateSuccess(response.data));
  } catch (error) {
    yield put(addressUpdateFailure(error?.data));
  }
}

function* preview(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.previewApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(previewGetSuccess(response.data));
  } catch (error) {
    yield put(previewGetFailure(error?.data?.error?.message));
  }
}
function* addCartAdd(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.addCartApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(addCartSuccess(response.data));
  } catch (error) {
    yield put(addCartFailure(error?.data));
  }
}
function* paymentGet(action) {
  try {
    const response = yield call(API.paymentApi, action?.payload);
    yield put(paymentSuccess(response.data));
  } catch (error) {
    yield put(paymentFailure(error?.data));
  }
}

function* cityAdd(action) {
  try {
    const response = yield call(API.cityApi, action?.payload);
    yield put(citySuccess(response.data));
  } catch (error) {
    yield put(cityFailure(error?.data?.error?.message));
  }
}

function* personalizedBookCartGet(action) {
  try {
    const response = yield call(API.personalizedBookCartApi, action?.payload);
    yield put(personalizedBookCartSuccess(response.data));
  } catch (error) {
    yield put(personalizedBookCartFailure(error?.data?.error?.message));
  }
}
function* generateSummaryCategoryGet(action) {
  try {
    const response = yield call(
      API.generateSummaryCategoryApi,
      action?.payload
    );
    yield put(generateSummaryCategorySuccess(response.data));
  } catch (error) {
    yield put(generateSummaryCategoryFailure(error?.data?.error?.message));
  }
}
function* orderPaymentData(action) {
  try {
    const response = yield call(API.orderPaymentData, action?.payload);
    yield put(orderDetailsSuccess(response.data));
  } catch (error) {
    yield put(orderDetailsFailure(error?.data?.error?.message));
  }
}
function* confirmPut(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.confirmApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(confirmSuccess(response?.data));
  } catch (error) {
    yield put(confirmFailure(error?.data?.error?.message));
  }
}
function* previewBookGet(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.previewBookApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(previewBookSuccess(response.data));
  } catch (error) {
    yield put(previewBookFailure(error?.data?.error?.message));
  }
}
function* userOrderGet(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.userOrderApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(userOrderSuccess(response.data));
  } catch (error) {
    yield put(userOrderFailure(error?.data?.message));
  }
}
function* blogDeleteData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.blogDeleteApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(blogDeleteSuccess(response.data));
  } catch (error) {
    yield put(blogDeleteFailure(error?.data?.message));
  }
}
function* userOrderList(action) {
  // const { onSuccess, ...otherPayload } = action?.payload;
  try {
    const response = yield call(API.orderList, action?.payload);
    // if (typeof onSuccess === "function") {
    //   onSuccess();
    // }
    yield put(orderListSuccess(response.data));
  } catch (error) {
    yield put(orderListFailure(error?.data?.message));
  }
}
function* getSingleOrderList(action) {
  try {
    const response = yield call(API.getSingleOrder, action?.payload);
    yield put(getSingleOrderSuccess(response.data));
  } catch (error) {
    yield put(getSingleOrderFailure(error?.data?.message));
  }
}
function* getSingleOrderAdminList(action) {
  try {
    const response = yield call(API.getSingleOrderAdmin, action?.payload);
    yield put(getSingleAdminOrderSuccess(response.data));
  } catch (error) {
    yield put(getSingleAdminOrderFailure(error?.data?.message));
  }
}
function* getTemplateAdminList(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.getTemplateAdminApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(getTemplateAdminSuccess(response.data));
  } catch (error) {
    yield put(getTemplateAdminFailure(error?.data?.message));
  }
}
function* getTemplateDetailsAdminList(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.bookTemplateDetailsAdmin, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(getTemplateDetailsAdminSuccess(response.data));
  } catch (error) {
    yield put(getTemplateDetailsAdminFailure(error?.data?.message));
  }
}
function* updateBookChapter(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.chapterUpdateAdmin, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(bookChaptersUpdateAdminSuccess(response.data));
  } catch (error) {
    yield put(bookChaptersUpdateAdminFailure(error?.data?.message));
  }
}
function* bookTemplateGenerate(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.bookTemplateGenerateAdmin, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(bookTemplateGenerationAdminSuccess(response.data));
  } catch (error) {
    yield put(bookTemplateGenerationAdminFailure(error?.data?.message));
  }
}
function* couponAdminAdd(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.couponAdminApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(couponAdminSuccess(response.data));
  } catch (error) {
    yield put(couponAdminFailure(error?.data?.message));
  }
}
function* couponAdminGetData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.couponAdminGetApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(couponAdminGetSuccess(response.data));
  } catch (error) {
    yield put(couponAdminGetFailure(error?.data?.message));
  }
}
function* couponAdminUpdateData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.couponAdminUpdateApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(couponAdminUpdateSuccess(response.data));
  } catch (error) {
    yield put(couponAdminUpdateFailure(error?.data?.message));
  }
}
function* categoryAddData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.categoryAddApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(categoryAddSuccess(response.data));
  } catch (error) {
    yield put(categoryAddFailure(error?.data?.message));
  }
}
function* categoryGetData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.categoryGetApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(categoryGetSuccess(response.data));
  } catch (error) {
    yield put(categoryGetFailure(error?.data?.message));
  }
}
function* categoryUpdateData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.categoryUpdateApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(categoryUpdateSuccess(response.data));
  } catch (error) {
    yield put(categoryUpdateFailure(error?.data?.message));
  }
}
function* faqAdminAdd(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.faqAdminApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(faqAdminSuccess(response.data));
  } catch (error) {
    yield put(faqAdminFailure(error?.data?.message));
  }
}
function* faqAdminGetData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.faqAdminGetApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(faqAdminGetSuccess(response.data));
  } catch (error) {
    yield put(faqAdminGetFailure(error?.data?.message));
  }
}
function* faqAdminUpdateData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.faqAdminUpdateApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(faqAdminUpdateSuccess(response.data));
  } catch (error) {
    yield put(faqAdminUpdateFailure(error?.data?.message));
  }
}
function* orderDetailsSingleData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.orderDetailsSingleApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(orderDetailsSingleSuccess(response.data));
  } catch (error) {
    yield put(orderDetailsSingleFailure(error?.data?.message));
  }
}
function* orderDetailsSingleAdminData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.orderDetailsSingleAdminApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(orderDetailsSingleAdminSuccess(response.data));
  } catch (error) {
    yield put(orderDetailsSingleAdminFailure(error?.data?.message));
  }
}
function* trackOrderData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.trackOrderApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(trackOrderSuccess(response.data));
  } catch (error) {
    yield put(trackOrderFailure(error?.data?.message));
  }
}
function* bookTemplateStatusData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.bookTemplateStatusApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(bookTemplateStatusSuccess(response.data));
  } catch (error) {
    yield put(bookTemplateStatusFailure(error?.data?.message));
  }
}
function* reviewAddData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.reviewAddApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(reviewAddSuccess(response.data));
  } catch (error) {
    yield put(reviewAddFailure(error?.data?.message));
  }
}
function* couponDeleteData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.couponDeleteApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(couponDeleteSuccess(response.data));
  } catch (error) {
    yield put(couponDeleteFailure(error?.data?.message));
  }
}
function* faqDeleteData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.faqDeleteApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(faqDeleteSuccess(response.data));
  } catch (error) {
    yield put(faqDeleteFailure(error?.data?.message));
  }
}
function* categoryDeleteData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.categoryDeleteApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(categoryDeleteSuccess(response.data));
  } catch (error) {
    yield put(categoryDeleteFailure(error?.data?.message));
  }
}
function* templateDeleteData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.templateDeleteApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(templateDeleteSuccess(response.data));
  } catch (error) {
    yield put(templateDeleteFailure(error?.data?.message));
  }
}
function* blogStatusData(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.blogStatusApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(blogStatusSuccess(response.data));
  } catch (error) {
    yield put(blogStatusFailure(error?.data?.message));
  }
}


function* getBookPriceAdminList(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.getBookPriceAdminApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(getBookPriceAdminSuccess(response.data));
  } catch (error) {
    yield put(getBookPriceAdminFailure(error?.data?.message));
  }
}
function* bookPriceUpdate(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.updateBookPriceApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(updateBookPriceSuccess(response.data));
  } catch (error) {
    yield put(updateBookPriceFailure(error?.data?.message));
  }
}

export default function* BookTemplateSaga() {
  yield takeLatest(bookTemplate.type, BookTemplate);
  yield takeLatest(categoryTemplate.type, CategoryTemplate);
  yield takeLatest(personalizationCreate.type, PersonalizationCreate);
  yield takeLatest(littleGet.type, littleGetData);
  yield takeLatest(myBooksGet.type, MyBooks);
  yield takeLatest(singleBookTemplate.type, SingleBookTemplate);
  yield takeLatest(reviews.type, Reviews);
  yield takeLatest(supportList.type, supportGet);
  yield takeLatest(supportData.type, support);
  yield takeLatest(faqsData.type, faqsGet);
  yield takeLatest(blogCreate.type, blogAdd);
  yield takeLatest(blogGet.type, blog);
  yield takeLatest(blogSingleGet.type, blogSingle);
  yield takeLatest(blogUpdate.type, blogUpdateData);
  yield takeLatest(blogGetUser.type, blogUser);
  yield takeLatest(blogSingleGetUser.type, blogSingleUser);
  yield takeLatest(personalizedBook.type, personalizedBookData);
  yield takeLatest(personalizedBookGet.type, personalizedBookList);
  yield takeLatest(userChapterGet.type, userChapter);
  yield takeLatest(userChapterSelect.type, userChapterSelectData);
  yield takeLatest(reviewGet.type, review);
  yield takeLatest(requestSupport.type, requestSupportAdd);
  yield takeLatest(previewGet.type, preview);
  yield takeLatest(payment.type, paymentGet);
  yield takeLatest(shippingCharge.type, shippingChargeAdd);
  yield takeLatest(shippingQuote.type, shippingQuoteSubmit);
  yield takeLatest(checkoutOrder.type, checkoutOrderGet);
  yield takeLatest(couponCode.type, CouponCodeGet);
  yield takeLatest(addCart.type, addCartAdd);
  yield takeLatest(getAddress.type, getAddressList);
  yield takeLatest(shippingAddress.type, shippingAddressAdd);
  yield takeLatest(addressDelete.type, deleteAddress);
  yield takeLatest(addressUpdate.type, address);
  yield takeLatest(city.type, cityAdd);
  yield takeLatest(confirm.type, confirmPut);
  yield takeLatest(previewBook.type, previewBookGet);
  yield takeLatest(userOrder.type, userOrderGet);
  yield takeLatest(personalizedBookCart.type, personalizedBookCartGet);
  yield takeLatest(generateSummaryCategory.type, generateSummaryCategoryGet);
  yield takeLatest(orderDetails.type, orderPaymentData);
  yield takeLatest(orderList.type, userOrderList);
  yield takeLatest(getSingleOrder.type, getSingleOrderList);
  yield takeLatest(blogDelete.type, blogDeleteData);
  yield takeLatest(getSingleAdminOrder.type, getSingleOrderAdminList);
   yield takeLatest(getTemplateAdmin.type, getTemplateAdminList);
   yield takeLatest(getTemplateDetailsAdmin.type, getTemplateDetailsAdminList);
   yield takeLatest(bookChaptersUpdateAdmin.type, updateBookChapter);
   yield takeLatest(getBookPriceAdmin.type, getBookPriceAdminList);
   yield takeLatest(updateBookPrice.type, bookPriceUpdate);
   yield takeLatest(bookTemplateGenerationAdmin.type, bookTemplateGenerate);
   yield takeLatest(couponAdmin.type, couponAdminAdd);
   yield takeLatest(couponAdminGet.type, couponAdminGetData);
   yield takeLatest(couponAdminUpdate.type, couponAdminUpdateData);
   yield takeLatest(categoryAdd.type, categoryAddData);
   yield takeLatest(categoryGet.type, categoryGetData);
   yield takeLatest(categoryUpdate.type, categoryUpdateData);
   yield takeLatest(faqAdmin.type, faqAdminAdd);
   yield takeLatest(faqAdminGet.type, faqAdminGetData);
   yield takeLatest(faqAdminUpdate.type, faqAdminUpdateData);
   yield takeLatest(orderDetailsSingle.type, orderDetailsSingleData);
   yield takeLatest(orderDetailsSingleAdmin.type, orderDetailsSingleAdminData);
   yield takeLatest(trackOrder.type, trackOrderData);
   yield takeLatest(bookTemplateStatus.type, bookTemplateStatusData);
   yield takeLatest(reviewAdd.type, reviewAddData);
   yield takeLatest(blogStatus.type, blogStatusData);
   yield takeLatest(couponDelete.type, couponDeleteData);
   yield takeLatest(faqDelete.type, faqDeleteData);
   yield takeLatest(categoryDelete.type, categoryDeleteData);
   yield takeLatest(templateDelete.type, templateDeleteData);
}
