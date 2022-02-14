import React, { useState, useEffect, useContext } from "react";
import useAxios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import getChartData from "../services/chartData";
import { trackPromise } from "react-promise-tracker";
import Chart from "../utils/chart";
import AuthContext from "../context/AuthContext";

//MUI
import Container from "@mui/material/Container";

const Dashboard = () => {
  let navigate = useNavigate();
  let api = useAxios();

  //context api consumption - declaration
  let { user } = useContext(AuthContext);

  let [chartData, setChartData] = useState({});

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getChartData(api)
        .then((response) => {
          if (mounted) {
            const data = response.data;
            setChartData({
              labels: data.values.map((obj) => obj.label),
              datasets: [
                {
                  label: "count",
                  data: data.values.map((obj) => obj.count),
                  backgroundColor: [
                    "rgba(0,255,255,0.75)",
                    "rgba(0,0,0,0.75)",
                    "rgba(0,0,255, 0.75)",
                    "rgba(255,0,255, 0.75)",
                    "rgba(128,128,128, 0.75)",
                    "rgba(0,128,0, 0.75)",
                    "rgba(0,255,0, 0.75)",
                    "rgba(128,0,0, 0.75)",
                    "rgba(0,0,128, 0.75)",
                    "rgba(128,128,0, 0.75)",
                    "rgba(128,0,128, 0.75)",
                    "rgba(255,0,0, 0.75)",
                    "rgba(192,192,192, 0.75)",
                    "rgba(0,128,128, 0.75)",
                    "rgba(255,255,0, 0.75)",
                  ],
                },
              ],
            });
          }
        })
        .catch((error) => {
          if (mounted) {
            if (error.response.status === 401) {
              alert("Authentication has expired! Please re-login");
              navigate("/logout");
            } else {
              alert("Something went wrong! Please logout and try again");
            }
          }
        })
    );
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container
      // maxWidth="md"
      component="main"
      className="text-center border-solid border-1 border-[#27447e] shadow-xl shadow-blue-500/50 p-5"
      style={{ margin: "2% auto", width: "65%" }}
    >
      <div className="text-3xl font-semibold mb-3">
        {user.is_teacher ? (
          <p>Your statistics since March, 2022</p>
        ) : user.is_admin ? (
          <p>Department statistics since March, 2022</p>
        ) : (
          <p>Institute statistics since March, 2022</p>
        )}
      </div>

      <Chart chartData={chartData} />
    </Container>
  );
};

export default Dashboard;
