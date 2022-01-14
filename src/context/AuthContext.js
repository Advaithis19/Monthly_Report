// import { createContext, useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axios";

// const AuthContext = createContext();

// export default AuthContext;

// export const AuthProvider = ({ children }) => {
//   //authTokens, user and loading are state variables
//   let [authTokens, setAuthTokens] = useState(() =>
//     localStorage.getItem("authTokens")
//       ? JSON.parse(localStorage.getItem("authTokens"))
//       : null
//   );

//   let [user, setUser] = useState(() =>
//     localStorage.getItem("authTokens")
//       ? jwt_decode(localStorage.getItem("authTokens").access)
//       : null
//   );

//   const navigate = useNavigate();

//   let loginUser = async (e) => {
//     e.preventDefault();
//     let response = await fetch("http://127.0.0.1:8000/api/token/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: e.target.email.value,
//         password: e.target.password.value,
//       }),
//     });
//     let data = await response.json();
//     if (response.status === 200) {
//       setAuthTokens(data);
//       setUser(jwt_decode(data.access));
//       localStorage.setItem("authTokens", JSON.stringify(data));
//       navigate("/grants");
//     } else {
//       alert("Something went wrong!");
//     }
//   };

//   let logoutUser = async () => {
//     let response = await axiosInstance.post("user/logout/blacklist/", {
//       refresh_token: authTokens.refresh,
//     });
//     setAuthTokens(null);
//     setUser(null);
//     localStorage.removeItem("authTokens");
//     axiosInstance.defaults.headers["Authorization"] = null;
//     navigate("/login");
//   };

//   let contextData = {
//     user: user,
//     authTokens: authTokens,
//     setUser: setUser,
//     setAuthTokens: setAuthTokens,
//     loginUser: loginUser,
//     logoutUser: logoutUser,
//   };

//   useEffect(() => {
//     if (authTokens) {
//       setUser(jwt_decode(authTokens.access));
//     }
//   }, [setAuthTokens]);

//   return (
//     <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
//   );
// };
