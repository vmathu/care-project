import axios from "axios";

const REACT_APP_WEB_API = "http://localhost:3000";

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network error" && !error.response)
      return Promise.reject(error);

    if (!error.response) return Promise.reject(error);

    const { status } = error.response;
    if (status === 404) window.location.href = "/Errors/404";
    else if (status === 500) window.location.href = "Errors/500";
    return Promise.reject(error);
  },
);

const doAxios = (method: string, action: string, data: any) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return axios({
    headers,
    method,
    url: `${REACT_APP_WEB_API}/${action}`,
    data,
    responseType: "json",
    timeout: 30000,
  });
};

export const doPost = (action: string, data: any) =>
  doAxios("POST", action, data);
