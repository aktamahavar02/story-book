import axios from "axios";
import { startsWith } from "lodash";
import { cookie } from "./cookies";

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": true,
};

const authHeader = () => {
  const token = cookie.get("token");
  const adminToken = cookie.get("adminToken");
  return { Authorization: `Bearer ${token || adminToken}` };
};

const API_URL = import.meta.env.VITE_API_URL;
const url = (path, params = {}, isThirdParty = false) => {
  const isFullUrl = /^https?:\/\//.test(path);

  if (isThirdParty && isFullUrl) {
    return path; // Use full third-party URL as-is
  }

  const sections = path.split(":");
  const sectionsWithParams = sections.map((section) =>
    startsWith(section, "/") ? section : params[section]
  );
  const pathWithParams = sectionsWithParams.join("");
  return (isThirdParty ? "" : API_URL) + pathWithParams;
};

const getHeaders = (auth, isThirdParty) => {
  if (isThirdParty) return {}
  let headers = { ...defaultHeaders };

  if (auth) {
    headers = { ...headers, ...authHeader() };
  }
  return headers;
};

const apiService = axios.create({});

// export const get = (path, params = {}, auth = true) => apiService.get(url(path, params), { params, headers: getHeaders(auth) });
//edit
export const get = (path, params = {}, auth = true, isThirdParty) =>
  apiService.get(url(path, params, isThirdParty), { params, headers: isThirdParty ? {} : getHeaders(auth) });

export const post = (path, params = {}, auth = true, isThirdParty) =>
  apiService.post(url(path, params, isThirdParty), params, { headers: getHeaders(auth) });

export const put = (path, params = {}, auth = true) =>
  apiService.put(url(path, params), params, { headers: getHeaders(auth) });

export const uploadImg = (path, params = {}, auth = true) =>
  apiService.put(url(path, params), params, { headers: getHeaders(auth) });

export const patch = (path, params = {}, auth = true) =>
  apiService.patch(url(path, params), params, { headers: getHeaders(auth) });

export const deleteRequest = (path, params = {}, auth = true) =>
  apiService.delete(url(path, params), { headers: getHeaders(auth) }, params);

export const upload = (path, params = {}, auth = true, isThirdParty) =>
  apiService.post(url(path, params, isThirdParty), params, {
    headers: { ...getHeaders(auth, isThirdParty), "content-type": "multipart/form-data" },
  });

export const download = (path, params = {}, auth = true) =>
  apiService.get(url(path, params), {
    responseType: "blob",
    params,
    headers: getHeaders(auth),
  });

apiService.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // toast.error(error.response.data.message);
    }

    if (error && error.response && error.response.status === 401) {
      cookie.remove("token");
      window.location.href = "/";
    } else {
      return Promise.reject(error.response);
    }
    return Promise.reject(error.response);
  },
);