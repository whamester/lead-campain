import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAuthRefresh, getAuthToken, initSession } from "./storage";
import urls from "./apiUrls";
const { refreshToken: refresUrl } = urls;

axios.defaults.baseURL = "http://104.154.208.47/api";
// axios.defaults.headers.common["Authorization"] =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjMiLCJOYW1lIjoiV29ubnlvIiwiRW1haWwiOiJ3b25ueW9AdW5pZnV0dXJlLmNvbSIsIm5iZiI6MTYxNTAwNzU2NywiZXhwIjoxNjE1MDA4NDY3LCJpYXQiOjE2MTUwMDc1Njd9.lHgbDlchDn0S_zHA0BHDef4L3jpFjFPQk3ILsH9Trik";
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-url";

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) =>
  axios
    .post(refresUrl, {
      token: getAuthRefresh(),
    })
    .then((tokenRefreshResponse) => {
      const {
        jwtToken,
        refreshToken,
        ...rest
      } = tokenRefreshResponse?.data?.data;
      console.log(tokenRefreshResponse);
      initSession(rest, jwtToken, refreshToken);
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + jwtToken;
      return Promise.resolve();
    })
    .catch((e) => {
      console.log(e);
      return Promise.reject(e);
    });

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios, refreshAuthLogic);

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.mode = "no-cors";
    config.headers = {
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
      // "Access-Control-Allow-Headers": "Authorization, Lang",
      // "Access-Control-Expose-Headers": "Content-Range",
      Authorization: getAuthToken(),
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    config.crossdomain = true;
    console.log(config);
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log(response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
