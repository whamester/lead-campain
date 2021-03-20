import axios from "./axiosInterceptor";
import urls from "./apiUrls";
import { encryptData } from "./index";
import { getAuthData, initSession, removeSession } from "./storage";

const { login, signup } = urls;

const authProvider = {
  login: ({ username, password }) => {
    return axios
      .post(`${login}`, { username, password: encryptData(password) })
      .then((response) => {
        if (response?.data?.success) {
          const { jwtToken, refreshToken, ...rest } = response?.data?.data;
          initSession(rest, jwtToken, refreshToken);

          return { data: rest };
        }
        return {
          data: response?.data,
        };
      })
      .catch((e) => {
        throw new Error(e);
      });
  },
  signup: ({ name, email, password }) => {
    return axios
      .post(`${signup}`, { name, email, password: encryptData(password) })
      .then((response) => {
        if (response?.data?.success) {
          const userData = response?.data?.user;
          const { jwtToken, refreshToken } = response?.data?.auth;

          initSession(userData, jwtToken, refreshToken);

          return { data: userData };
        }
        return {
          data: response?.data,
        };
      })
      .catch((e) => {
        throw new Error(e);
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
