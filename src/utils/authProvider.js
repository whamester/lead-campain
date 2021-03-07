const authProvider = {
  login: ({ username, password }) => {
    const request = new Request("https://mydomain.com/authenticate", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem("auth", JSON.stringify(auth));
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
  checkAuth: () =>
    localStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject({ message: "login.required" }),
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve("/my-custom-login");
  },
  getIdentity: () => {
    try {
      const { id, fullName, avatar } = JSON.parse(localStorage.getItem("auth"));
      return Promise.resolve({ id, fullName, avatar });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: () => {
    const role = localStorage.getItem('permissions');
    return role ? Promise.resolve(role) : Promise.reject();
}
};

export default authProvider;
