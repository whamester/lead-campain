import axios from "./axiosInterceptor";
import url from "../utils/apiUrls";

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
        return {
          data: [],
          total: 0,
        };
      });
  },
  getCatalog: (resource) => {
    return axios(`${resource}`, {})
      .then((response) => {
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
        return {
          data: [],
          total: 0,
        };
      });
  },
  getOne: (resource, params) => {
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
    if (resource === url.sends) {
      resource = url.sendNewCampain;
      const { campainId, categosries, sendNow, templateId } = params.data;

      params.data = {
        send: {
          templateId: parseInt(templateId),
          campainId: parseInt(campainId),
        },
        sendNow,
        categosries: Array.isArray(categosries) ? categosries.join(",") : "",
      };
    }

    if (resource === url.clients) {
      const { categosries, ...client } = params.data;

      params.data = {
        client,
        categosries: Array.isArray(categosries) ? categosries.join(",") : "",
      };
    }

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
    if (resource === url.clients) {
      const { categosries, ...client } = params.data;

      params.data = {
        client,
        categosries: Array.isArray(categosries) ? categosries.join(",") : "",
      };
    }

    return axios
      .put(`${resource}`, { ...params.data })
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
  deleteMany: (resource, params) => {
    const axiosRequests = Array.isArray(params.ids)
      ? params.ids.map((id) => {
          return axios.delete(`${resource}/${id}`);
        })
      : [];

    return axios
      .all(axiosRequests)
      .then(
        axios.spread((...responses) => {
          return {
            data: responses,
          };
        })
      )
      .catch((e) => {
        console.log(e);
        return {
          data: {},
        };
      });
  },
};

export default dataProvider;
