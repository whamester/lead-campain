import axios from "axios";

axios.defaults.baseURL = "http://localhost:9096/api";
// axios.defaults.headers.common["Authorization"] =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjMiLCJOYW1lIjoiV29ubnlvIiwiRW1haWwiOiJ3b25ueW9AdW5pZnV0dXJlLmNvbSIsIm5iZiI6MTYxNTAwNzU2NywiZXhwIjoxNjE1MDA4NDY3LCJpYXQiOjE2MTUwMDc1Njd9.lHgbDlchDn0S_zHA0BHDef4L3jpFjFPQk3ILsH9Trik";
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-url";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // config.mode = "no-cors";
    config.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
      "Access-Control-Allow-Headers": "Authorization, Lang",
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
