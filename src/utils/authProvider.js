import axios from "./axiosInterceptor";
import urls from "./apiUrls";

const auth_item = "auth";
const { login } = urls;

const authProvider = {
  login: ({ username, password }) => {
    return axios
      .post(`${login}`, { username, password })
      .then((response) => {
        console.log(response, username, password);
        if (response?.data?.success) {
          const { data = {} } = response?.data;
          localStorage.setItem(auth_item, JSON.stringify(data));

          return { data };
        }
        return {
          data: {},
        };
      })
      .catch((e) => {
        localStorage.removeItem(auth_item);
        throw new Error(e);
      });

    // const request = new Request("https://mydomain.com/authenticate", {
    //   method: "POST",
    //   body: JSON.stringify({ username, password }),
    //   headers: new Headers({ "Content-Type": "application/json" }),
    // });

    // return fetch(request)
    //   .then((response) => {
    //     if (response.status < 200 || response.status >= 300) {
    //       throw new Error(response.statusText);
    //     }
    //     return response.json();
    //   })
    //   .then((auth) => {
    //     localStorage.setItem(auth_item, JSON.stringify(auth));
    //   })
    //   .catch(() => {
    //     throw new Error("Network error");
    //   });
  },
  checkAuth: () =>
    localStorage.getItem(auth_item)
      ? Promise.resolve()
      : Promise.reject({ message: "login.required" }),
  logout: () => {
    localStorage.removeItem(auth_item);
    return Promise.resolve("/login");
  },
  getIdentity: () => {
    try {
      const { id, fullName, avatar } = JSON.parse(
        localStorage.getItem(auth_item)
      );
      return Promise.resolve({ id, fullName, avatar });
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
