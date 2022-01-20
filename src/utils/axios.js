// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";

// const baseURL = "http://127.0.0.1:8000/api/";

// const axiosInstance = axios.create({
//   baseURL: baseURL,
//   timeout: 5000,
//   //   headers: {
//   //     Authorization: "JWT " + localStorage.getItem("access_token"),
//       // "Content-Type": "application/json",
//       // accept: "application/json",
//   //   },
// });

// export default axiosInstance;

import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const apiBaseURL = "http://127.0.0.1:8000/api/";

const useAxios = () => {
  // const accessToken = localStorage.getItem("access_token");
  // const refreshToken = localStorage.getItem("refresh_token");
  // const user = jwt_decode(accessToken);

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

    // console.log("access token has expired and hence making refresh request");

    // console.log("oldaccesstoken", accessToken);
    // console.log("oldrefreshtoken", refreshToken);

    const response = await axios.post(`${apiBaseURL}token/refresh/`, {
      refresh: authTokens.refresh,
    });

    // let newAccessToken = JSON.stringify(response.data.access);
    // console.log("newaccesstoken", newAccessToken);

    // let newRefreshToken = JSON.stringify(response.data.refresh);
    // console.log("newrefreshtoken", newRefreshToken);

    // localStorage.setItem("access_token", newAccessToken);
    // console.log(
    //   "localstorage access token",
    //   localStorage.getItem("access_token")
    // );

    // localStorage.setItem("refresh_token", newRefreshToken);
    // console.log(
    //   "localstorage refresh token",
    //   localStorage.getItem("refresh_token")
    // );

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    req.headers.Authorization = `JWT ${response.data.access}`;

    return req;
  });

  return axiosInstance;
};

export default useAxios;
