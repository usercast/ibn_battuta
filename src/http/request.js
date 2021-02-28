import { noop, successErrorHandler } from "./response";

const request = (
  path,
  method,
  payload,
  success = noop,
  err = noop,
  headers,
  fatal,
  unauth
) => {
  let status = 0;
  let statusText = "Something went wrong";
  const options = {
    method: method,
    credentials: "omit",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "widget",
      "X-Client": "NeetoChangelog Widget",
      ...headers
    }
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  fetch(path, options)
    .then(res => {
      status = res.status;
      statusText = res.statusText || statusText;
      if (status === 404) {
        statusText = "Not Found";
      }
      return res.json();
    })
    .then(data => {
      if (status >= 200 && status < 400) {
        success(data, status);
      } else if (status === 401) {
        console.error(method + " UNAUTH " + status + ": " + path);
        (unauth || err)(data, status);
      } else {
        console.error(method + " ERROR " + status + ": " + path);
        (fatal || err)(data, status);
      }
    })
    .catch(e => {
      console.error(
        method + " FATAL " + status + ": " + path,
        status,
        statusText,
        e
      );
      (fatal || err)({ errors: { base: [statusText] } }, status);
    });
};

export const genericRequest = (
  url,
  type = "GET",
  headers,
  onError,
  onSuccess,
  dataOptions = {}
) => {
  request(url, type, dataOptions, onSuccess, onError, headers);
};

// here rest is [success, err, headers, fatal, unauth]
export const get = (path, ...rest) => request(path, "GET", undefined, ...rest);

export const post = (path, payload, ...rest) =>
  request(path, "POST", payload, ...rest);

export const patch = (path, payload, ...rest) =>
  request(path, "PATCH", payload, ...rest);

export const put = (path, payload, ...rest) =>
  request(path, "PUT", payload, ...rest);

export const destroy = (path, payload, ...rest) =>
  request(path, "DELETE", payload, ...rest);

export const getRequest = (url, headers) => {
  return new Promise((resolve, reject) => {
    const { success, err } = successErrorHandler(resolve, reject);
    get(url, success, err, headers);
  });
};

export const postRequest = (url, payload, headers) => {
  return new Promise((resolve, reject) => {
    const { success, err } = successErrorHandler(resolve, reject);
    post(url, payload, success, err, headers);
  });
};

export const patchRequest = (url, payload, headers) => {
  return new Promise((resolve, reject) => {
    const { success, err } = successErrorHandler(resolve, reject);
    patch(url, payload, success, err, headers);
  });
};

export const putRequest = (url, payload, headers) => {
  return new Promise((resolve, reject) => {
    const { success, err } = successErrorHandler(resolve, reject);
    put(url, payload, success, err, headers);
  });
};

export const destroyRequest = (url, payload = {}) => {
  return new Promise((resolve, reject) => {
    const { success, err } = successErrorHandler(resolve, reject);
    destroy(url, payload, success, err);
  });
};

export const performMultipartRequest = (url, method, payload) => {
  const config = {
    method: method,
    body: payload
  };

  return new Promise((resolve, reject) => {
    const { success, err } = successErrorHandler(resolve, reject);
    fetch(url, config)
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(data => {
        if (status >= 200 && status < 400) {
          success(data, status);
        } else {
          console.error(method + " ERROR " + status + ": " + url);
          err(data, status);
        }
      });
  });
};
