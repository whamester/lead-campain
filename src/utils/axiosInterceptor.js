import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAuthRefresh, getAuthToken, initSession } from "./storage";
import urls from "./apiUrls";
const { refreshToken: refresUrl } = urls;

axios.defaults.baseURL = "http://34.70.35.125/api";

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
    // config.mode = "no-cors";
    config.headers = {
      Authorization: `Bearer ${getAuthToken()}`,
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
