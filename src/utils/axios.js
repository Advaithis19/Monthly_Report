import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const apiBaseURL = "http://127.0.0.1:8000/api/";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: apiBaseURL,
    timeout: 5000,
    headers: {
      Authorization: null,
      // "Content-Type": "application/json",
      // accept: "application/json",
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    let authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    req.headers.Authorization = `JWT ${authTokens?.access}`;

    const user_refresh = jwt_decode(authTokens.refresh);
    const isRefreshExpired = dayjs.unix(user_refresh.exp).diff(dayjs()) < 1;
    if (isRefreshExpired) {
      return req;
    }

    const user_access = jwt_decode(authTokens.access);
    const isAccessExpired = dayjs.unix(user_access.exp).diff(dayjs()) < 1;
    if (!isAccessExpired) {
      return req;
    }

    const response = await axios.post(`${apiBaseURL}token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    req.headers.Authorization = `JWT ${response.data.access}`;

    return req;
  });

  return axiosInstance;
};

export default useAxios;
