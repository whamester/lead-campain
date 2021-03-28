import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAuthRefresh, getAuthToken, initSession } from "./storage";
import urls from "./apiUrls";
const { refreshToken: refresUrl } = urls;
const { REACT_APP_API } = process.env;
axios.defaults.baseURL = REACT_APP_API;

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
// createAuthRefreshInterceptor(axios, refreshAuthLogic);

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // config.mode = "no-cors";
    config.headers = {
      // Authorization: `Bearer ${getAuthToken()}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-rapidapi-key": "ad7bf8e0femshccc60d411c6856bp14fbddjsn6d2ce9feae53",
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
    };
    config.crossdomain = true;

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
