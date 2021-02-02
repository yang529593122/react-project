import axios from "axios";
import { HTTP_STATUS } from "../consts/statusCode";
import { getCookie } from "./filter";
import { currentEnv } from "../consts/env";

axios.defaults.timeout = 50000;
axios.defaults.headers.common["Content-Type"] = "application/json";
//axios.defaults.baseURL = apiBaseUrl;
axios.defaults.withCredentials = false;
// 中间件 拦截请求-
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err.response.status === 401) {
      if (window.location.href.indexOf("/login") === -1) {
        window.location.href = "/login";
      }
    }
    const res = err.response;

    return res;
  }
);
axios.interceptors.request.use(
  config => {
    let cookienamestr =
      currentEnv === "dev" ? "corgi-token-test-data" : "corgi-token-prod-data";
    const token = getCookie(cookienamestr);
    if (token) {
      config.headers.authorization = `bearer ${token}`;
    }
    config.headers.authorization = `bearer 6f8288c3-d111-47e4-8437-bea48e3c0626`;
    config.headers.tenantid = "6XWFVymtaB68REyRBuf";
    config.headers.appId = 12351;
    config.headers.phone = localStorage.getItem("phone");
    config.headers.businessId = localStorage.getItem("businessId");
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const exceptionHandling = res => {
  if (!res) {
    return null;
  }
  const { status, data } = res;
  if ([HTTP_STATUS.SUCCESS, HTTP_STATUS.NOT_MODIFIED].includes(status)) {
    return data && data.data ? data : res;
  }
  return res;
};

/**
 *
 * @param {*} url
 * @param {*} params
 * @param {*} cfg
 */
const get = (url, params = {}, cfg = {}) => {
  const config = {
    method: "get",
    url,
    params,
    ...cfg
  };
  return new Promise((resolve, reject) => {
    axios(config)
      .then(response => {
        resolve(exceptionHandling(response));
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * post
 * @param url
 * @param data
 * @returns {Promise}
 */

const post = (url, data = {}, handle = true) => {
  const config = {
    method: "post",
    url,
    data
  };
  return new Promise((resolve, reject) => {
    axios(config)
      .then(
        response => {
          resolve(handle ? exceptionHandling(response) : response);
        },
        error => {
          reject(error);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * put
 * @param url
 * @param data
 * @returns {Promise}
 */

const put = (url, data = {}) => {
  const config = {
    method: "put",
    url,
    data
  };
  return new Promise((resolve, reject) => {
    axios(config)
      .then(
        response => {
          if (response && response.data) {
            resolve(response.data);
          } else {
            resolve(response);
          }
        },
        error => {
          reject(error);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * delte
 * @param url
 * @param data
 * @returns {Promise}
 */

const remove = (url, data = {}) => {
  const config = {
    method: "delete",
    url,
    data
  };
  return new Promise((resolve, reject) => {
    axios(config)
      .then(
        response => {
          resolve(response);
        },
        error => {
          reject(error);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  get,
  post,
  put,
  remove
};
