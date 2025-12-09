import { call, put, takeLatest } from "redux-saga/effects";
import {
  adminBookTemplatePost,
  adminBookTemplatePostFailure,
  adminBookTemplatePostSuccess,
  adminCountryChart,
  adminCountryChartFailure,
  adminCountryChartSuccess,
  adminDashboardRes,
  adminDashboardResFailure,
  adminDashboardResSuccess,
  adminLogin,
  adminLoginFailure,
  adminLoginSuccess,
  adminLogout,
  adminLogoutFailure,
  adminLogoutSuccess,
  adminOrderRes,
  adminOrderResFailure,
  adminOrderResSuccess,
  adminRecentOrder,
  adminRecentOrderFailure,
  adminRecentOrderSuccess,
  adminRevenueRes,
  adminRevenueResFailure,
  adminRevenueResSuccess,
  adminUsers,
  adminUsersFailure,
  adminUsersSuccess,
  contactUs,
  contactUsFailure,
  contactUsSuccess,
  countryList,
  countryListFailure,
  countryListSuccess,
  countryUpdate,
  countryUpdateFailure,
  countryUpdateSuccess,
  currencyList,
  currencyListFailure,
  currencyListSuccess,
  forgotPassword,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  guestLogin,
  guestLoginFailure,
  guestLoginSuccess,
  imageUploadFailure,
  imageUploadHandle,
  imageUploadSuccess,
  login,
  loginFailure,
  loginGoogle,
  loginGoogleFailure,
  loginGoogleSuccess,
  loginSuccess,
  profile,
  profileFailure,
  profileSuccess,
  profileUpdate,
  profileUpdateFailure,
  profileUpdateSuccess,
  register,
  registerFailure,
  registerSuccess,
  resetPassword,
  resetPasswordFailure,
  resetPasswordSuccess,
  shippingCreate,
  shippingCreateFailure,
  shippingCreateSuccess,
  statesList,
  statesListFailure,
  statesListSuccess,
  uploadImage,
  uploadImageFailure,
  uploadImageSuccess,
  verify,
} from "../slices/loginSlice";
import { API } from "../../src/apis";

function* RegisterUser(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.getRegister, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailure(error?.data));
  }
}
function* Shipping(action) {
  try {
    const response = yield call(API.shippingCreate, action?.payload);
    yield put(shippingCreateSuccess(response.data));
  } catch (error) {
    yield put(shippingCreateFailure(error?.data?.error?.message));
  }
}
function* LoginUser(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.login, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error?.data));
  }
}
function* AdminLoginUser(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.adminLogin, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(adminLoginSuccess(response.data));
  } catch (error) {
    yield put(adminLoginFailure(error?.data));
  }
}
function* AdminLogOut(action) {
  const { onSuccess, ...otherPayload } = action?.payload;
  try {
    const response = yield call(API.adminLogout, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(adminLogoutSuccess(response.data));
  } catch (error) {
    yield put(adminLogoutFailure(error?.data));
  }
}
function* adminDashboardList(action) {
  const { onSuccess, ...otherPayload } = action?.payload;
  try {
    const response = yield call(API.adminDashboardList, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(adminDashboardResSuccess(response.data));
  } catch (error) {
    yield put(adminDashboardResFailure(error?.data));
  }
}
function* adminOrder(action) {
  const { onSuccess, ...otherPayload } = action?.payload;
  try {
    const response = yield call(API.adminOrderApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(adminOrderResSuccess(response.data));
  } catch (error) {
    yield put(adminOrderResFailure(error?.data));
  }
}
function* adminRevenue(action) {
  const { onSuccess, ...otherPayload } = action?.payload;
  try {
    const response = yield call(API.adminRevenueApi, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(adminRevenueResSuccess(response.data));
  } catch (error) {
    yield put(adminRevenueResFailure(error?.data));
}
}

function* adminUser(action) {
  const { onSuccess, ...otherPayload } = action?.payload;
  try {
    const response = yield call(API.adminUsers, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(adminUsersSuccess(response.data));
  } catch (error) {
    yield put(adminUsersFailure(error?.data));
  }
}
function* recentOrder(action) {
  const { onSuccess, ...otherPayload } = action?.payload;
  try {
    const response = yield call(API.recentAdminOrder, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(adminRecentOrderSuccess(response.data));
  } catch (error) {
    yield put(adminRecentOrderFailure(error?.data));
  }
}
function* adminBookPost(action) {
  const { onSuccess, ...otherPayload } = action?.payload;
  try {
    const response = yield call(API.adminBookPost, otherPayload);

    if (typeof onSuccess === "function") {
      onSuccess(response.data);
    }
    yield put(adminBookTemplatePostSuccess(response.data));
  } catch (error) {

    yield put(adminBookTemplatePostFailure(error?.data));
  }
}
function* adminChart(action) {
  const { onSuccess, ...otherPayload } = action?.payload;
  try {
    const response = yield call(API.adminCountryChart, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(adminCountryChartSuccess(response.data));
  } catch (error) {
    yield put(adminCountryChartFailure(error?.data));
  }
}
function* Verify(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.verify, otherPayload);
    if (typeof onSuccess === "function") {
      onSuccess();
    }
    yield put(verifySuccess(response.data));
  } catch (error) {
    yield put(verifyFailure(error?.data?.error?.message));
  }
}
function* Profile(action) {
  try {
    const response = yield call(API.profile, action?.payload);
    yield put(profileSuccess(response.data));
  } catch (error) {
    yield put(profileFailure(error?.data));
  }
}
function* GuestLogin(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.guestLoginApi, otherPayload);
   
    yield put(guestLoginSuccess(response.data));
    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    yield put(guestLoginFailure(error?.data?.error?.message));
  }
}
function* ProfileUpdate(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.profileUpdate, otherPayload);
    yield put(profileUpdateSuccess(response.data));
    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    yield put(profileUpdateFailure(error?.data));
  }
}
function* imageUpload(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.imageUpload, otherPayload);
    yield put(imageUploadSuccess(response.data));
    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    yield put(imageUploadFailure(error?.data?.error?.message));
  }
}

export function* UploadImage(action) {
  try {
    const { file, key, contentType, onSuccess } = action.payload;
    const res = yield call(API.uploadImage, { key, contentType });
    const presignedUrl = res?.data?.data?.url;
    const s3Url = presignedUrl;
    if (typeof onSuccess === "function") {
      yield call(onSuccess, s3Url);
    }
    yield put(uploadImageSuccess(res?.data?.data));
  } catch (error) {
    yield put(
      uploadImageFailure(error?.data?.message || "Upload failed")
    );
  }
}
function* Country(action) {
  try {
    const response = yield call(API.countryList, action?.payload);
    yield put(countryListSuccess(response.data));
  } catch (error) {
    yield put(countryListFailure(error?.data?.error?.message));
  }
}
function* currency(action) {
  try {
    const response = yield call(API.currencyApi, action?.payload);
    yield put(currencyListSuccess(response.data));
  } catch (error) {
    yield put(currencyListFailure(error?.data?.error?.message));
  }
}
function* States(action) {
  try {
    const response = yield call(API.statesList, action?.payload);
    yield put(statesListSuccess(response.data));
  } catch (error) {
    yield put(statesListFailure(error?.data?.error?.message));
  }
}
function* loginGoogleSend(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.loginGoogleApi, otherPayload);
    yield put(loginGoogleSuccess(response.data));

    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    yield put(loginGoogleFailure(error?.data?.error?.message));
  }
}
function* forgotPasswordAdd(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.forgotPasswordApi, otherPayload);
    yield put(forgotPasswordSuccess(response.data));

    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    yield put(forgotPasswordFailure(error?.data));
  }
}
function* resetPasswordAdd(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.resetPasswordApi, otherPayload);
    yield put(resetPasswordSuccess(response.data));

    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    yield put(resetPasswordFailure(error?.data));
  }
}
function* contactUsAdd(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.contactUsApi, otherPayload);
    yield put(contactUsSuccess(response.data));

    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    yield put(contactUsFailure(error?.data));
  }
}
function* countryUpdatePut(action) {
  try {
    const { onSuccess, ...otherPayload } = action?.payload;
    const response = yield call(API.countryUpdateApi, otherPayload);
    yield put(countryUpdateSuccess(response.data));

    if (typeof onSuccess === "function") {
      onSuccess();
    }
  } catch (error) {
    yield put(countryUpdateFailure(error?.data));
  }
}

export default function* RegisterSaga() {
  yield takeLatest(register.type, RegisterUser);
  yield takeLatest(login.type, LoginUser);
  yield takeLatest(verify.type, Verify);
  yield takeLatest(profile.type, Profile);
  yield takeLatest(guestLogin.type, GuestLogin);
  yield takeLatest(profileUpdate.type, ProfileUpdate);
  yield takeLatest(uploadImage.type, UploadImage);
  yield takeLatest(imageUploadHandle.type, imageUpload);
  yield takeLatest(shippingCreate.type, Shipping);
  yield takeLatest(countryList.type, Country);
  yield takeLatest(currencyList.type, currency);
  yield takeLatest(statesList.type, States);
  yield takeLatest(forgotPassword.type, forgotPasswordAdd);
  yield takeLatest(resetPassword.type, resetPasswordAdd);
  yield takeLatest(contactUs.type, contactUsAdd);
  yield takeLatest(loginGoogle.type, loginGoogleSend);
  yield takeLatest(adminLogin.type, AdminLoginUser);
  yield takeLatest(adminLogout.type, AdminLogOut);
  yield takeLatest(adminDashboardRes.type, adminDashboardList);
  yield takeLatest(adminOrderRes.type, adminOrder);
  yield takeLatest(adminRevenueRes.type, adminRevenue);
  yield takeLatest(adminUsers.type, adminUser);
  yield takeLatest(adminRecentOrder.type, recentOrder);
  yield takeLatest(adminBookTemplatePost.type, adminBookPost);
  yield takeLatest(adminCountryChart.type, adminChart);
  yield takeLatest(countryUpdate.type, countryUpdatePut);
}
