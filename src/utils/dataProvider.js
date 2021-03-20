import axios from "./axiosInterceptor";
import url from "../utils/apiUrls";

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage: pageSize } = params.pagination;
    const { field: sortOn, order: sortDirection } = params.sort;
    const { categories } = params?.filter;

    return axios(`${resource}/Page/${page}`, {
      params: {
        pageSize,
        sortOn,
        sortDirection,
        categories: Array.isArray(categories) ? categories.join(",") : "",
        categoriesId: Array.isArray(categories) ? categories.join(",") : "",
      },
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
        return {
          data: [],
          total: 0,
        };
      });
  },
  getClientsByCategory: (params) => {
    return axios(url.clientsByCategories(params.categories))
      .then((response) => {
        if (response?.data?.success) {
          const { data = [] } = response?.data;
          return {
            data,
            total: Array.isArray(data) ? data.length : 0,
          };
        }
        return {
          data: [],
          total: 0,
        };
      })
      .catch((e) => {
        return {
          data: [],
          total: 0,
        };
      });
  },
  getClientsBySendId: (params) => {
    return axios(url.clientsBySend(params.sendId))
      .then((response) => {
        if (response?.data?.success) {
          const { data = [] } = response?.data;
          return {
            data,
            total: Array.isArray(data) ? data.length : 0,
          };
        }
        return {
          data: [],
          total: 0,
        };
      })
      .catch((e) => {
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
          if (`${resource}` === `${url.clients}`) {
            data.client = {
              ...data?.client,
              categories: Array.isArray(data?.categories)
                ? data?.categories.map(({ id }) => id)
                : [],
            };
          }

          return { data: {} };
        }
        return {
          data: {},
        };
      })
      .catch((e) => {
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
      const { campainId, categories, sendNow, templateId } = params.data;

      params.data = {
        send: {
          templateId: parseInt(templateId),
          campainId: parseInt(campainId),
        },
        sendNow,
        categories: Array.isArray(categories) ? categories.join(",") : "",
      };
    }

    if (resource === url.clients) {
      const { categories, ...client } = params.data;

      params.data = {
        client,
        categories: Array.isArray(categories) ? categories.join(",") : "",
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
        return {
          data: {},
        };
      });
  },
  update: (resource, params) => {
    if (resource === url.clients) {
      const { categories, ...client } = params.data;

      params.data = {
        client,
        categories: Array.isArray(categories) ? categories.join(",") : "",
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
        return {
          data: {},
        };
      });
  },
  resendMany: (resource, params) => {
    const axiosRequests = Array.isArray(params.ids)
      ? params.ids.map((id) => {
          return axios.post(`${resource}`, { send: { id }, sendNow: true });
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
        return {
          data: {},
        };
      });
  },
};

export default dataProvider;
