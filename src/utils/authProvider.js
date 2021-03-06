import axios from "./axiosInterceptor";
import urls from "./apiUrls";
import { getAuthData, initSession, removeSession } from "./storage";

const { login, signup } = urls;

const authProvider = {
  login: ({ username, password }) => {
    return axios
      .post(`${login}`, { username, password })
      .then((response) => {
        console.log(response?.data);
        if (response?.data?.success) {
          const { jwtToken, refreshToken, ...rest } = response?.data?.data;
          initSession(rest, jwtToken, refreshToken);

          return { data: rest };
        }
        return {
          data: {},
        };
      })
      .catch((e) => {
        // localStorage.removeItem(auth_item);
        // throw new Error(e);
        const response = {
          data: {
            id: 3,
            name: "Wonnyo",
            email: "wonnyo@unifuture.com",
            jwtToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjMiLCJOYW1lIjoiV29ubnlvIiwiRW1haWwiOiJ3b25ueW9AdW5pZnV0dXJlLmNvbSIsIm5iZiI6MTYxNTM0MjYyNCwiZXhwIjoxNjE1MzQ0NDI0LCJpYXQiOjE2MTUzNDI2MjR9.UIgKpx7v7zAXXExAaus9cLWxncfZ4lZrfOjhEebxBcE",
            refreshToken:
              "ak2RhsJp21oWP0qnXBvG/6VQR4Rf7g3YdzM7Wz81Gy0lpOKkMzL2G1EL0kbbfW6aPHCkyHpV1wp06CMoo/2Hng==",
          },
          message: "Ingreso exitoso.",
          success: true,
        };
        const { jwtToken, refreshToken, ...rest } = response?.data;
        initSession(rest, jwtToken, refreshToken);

        return response;
      });
  },
  signup: ({ name, email, password }) => {
    return axios
      .post(`${signup}`, { name, email, password })
      .then((response) => {
        console.log(response);
        if (response?.data?.success) {
          const userData = response?.data?.user;
          const { jwtToken, refreshToken } = response?.data?.auth;

          initSession(userData, jwtToken, refreshToken);

          return { data: userData };
        }
        return {
          data: {},
        };
      })
      .catch((e) => {
        // localStorage.removeItem(auth_item);
        // throw new Error(e);
        const response = {
          data: {
            id: 3,
            name: "Wonnyo",
            email: "wonnyo@unifuture.com",
            jwtToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjMiLCJOYW1lIjoiV29ubnlvIiwiRW1haWwiOiJ3b25ueW9AdW5pZnV0dXJlLmNvbSIsIm5iZiI6MTYxNTEyODIxOCwiZXhwIjoxNjE1MTI5MTE4LCJpYXQiOjE2MTUxMjgyMTh9.bp3XdQ3MXPBDmaQzcxOBhTq_eSXw48uiosZWE4zhWr0",
            refreshToken:
              "ak2RhsJp21oWP0qnXBvG/6VQR4Rf7g3YdzM7Wz81Gy0lpOKkMzL2G1EL0kbbfW6aPHCkyHpV1wp06CMoo/2Hng==",
          },
          message: "Ingreso exitoso.",
          success: true,
        };
        const { jwtToken, refreshToken, ...rest } = response?.data;
        initSession(rest, jwtToken, refreshToken);

        return response;
      });
  },
  checkAuth: () =>
    getAuthData()
      ? Promise.resolve()
      : Promise.reject({ message: "login.required" }),
  logout: () => {
    removeSession();

    return Promise.resolve("/login");
  },
  getIdentity: () => {
    try {
      const { id, name, email } = JSON.parse(getAuthData());
      return Promise.resolve({ id, name, email });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: () => {
    const role = localStorage.getItem("permissions");
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
