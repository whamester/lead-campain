import axios from "./axiosInterceptor";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjMiLCJOYW1lIjoiV29ubnlvIiwiRW1haWwiOiJ3b25ueW9AdW5pZnV0dXJlLmNvbSIsIm5iZiI6MTYxNTAwNTg3NSwiZXhwIjoxNjE1MDA2Nzc1LCJpYXQiOjE2MTUwMDU4NzV9._y3OKy1IPx7O7WoRv7ch14kd9c1WoJRr5Kd9OUP3_2E";

// const fetchRequest = (url, options = {}) => {
//   if (!options.headers) {
//     options.headers = new Headers({ Accept: "application/json" });
//   }
//   // add your own headers here
//   options.headers.set("Authorization", token);
//   options.headers.set("Access-Control-Allow-Origin", "*");

//   return fetchUtils.fetchJson(url, options);
// };

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage: pageSize } = params.pagination;
    const { field: sortOn, order: sortDirection } = params.sort;

    return axios(`${resource}/Page/${page}`, {
      params: { pageSize, sortOn, sortDirection },
    })
      .then((response) => {
        console.log(response);
        if (response?.data?.success) {
          const { items = [], totalCount = 0 } = response?.data?.data;
          return { data: items, total: totalCount };
        }
        return {
          data: [],
          total: 0,
        };
      })
      .catch((e) => {
        console.log(e);
      });
  },
  getOne: (resource, params) => {
    console.log(params);

    return axios(`${resource}/${params.id}`, {})
      .then((response) => {
        if (response?.data?.success) {
          const { data = {} } = response?.data;
          return { data };
        }
        return {
          data: {},
        };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: {},
        };
      });
  },
  // getMany:    (resource, params) => Promise,
  // getManyReference: (resource, params) => Promise,
  create: (resource, params) => {
    console.log(params);

    return axios
      .post(`${resource}`, params.data)
      .then((response) => {
        if (response?.data?.success) {
          const { data = {} } = response?.data;
          return { data };
        }
        return {
          data: {},
        };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: {},
        };
      });
  },
  update: (resource, params) => {
    console.log(params);

    return axios
      .put(`${resource}/${params.id}`, { ...params.data })
      .then((response) => {
        if (response?.data?.success) {
          const { data = {} } = response?.data;
          return { data };
        }
        return {
          data: {},
        };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: {},
        };
      });
  },
  // updateMany: (resource, params) => Promise,
  delete: (resource, params) => {
    console.log(params);

    return axios
      .delete(`${resource}/${params.id}`)
      .then((response) => {
        if (response?.data?.success) {
          const { data = {} } = response?.data;
          return { data };
        }
        return {
          data: {},
        };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: {},
        };
      });
  },
  // deleteMany: (resource, params) => Promise,
};

export default dataProvider;
