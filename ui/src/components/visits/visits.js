import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getIndustrial_visits } from "../../services/industrial_visits";
import { trackPromise } from "react-promise-tracker";

const Industrial_visits = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [industrial_visits, setIndustrial_visits] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getIndustrial_visits(api)
        .then((response) => {
          if (mounted) {
            setIndustrial_visits(response.data);
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

  if (!industrial_visits || industrial_visits.length === 0)
    return (
      <div className="text-center pt-5">
        <p className="text-xl text-bold">
          Can not find any industrial visits, sorry
        </p>
      </div>
    );

  return <Table industrial_visits={industrial_visits} />;
};

export default Industrial_visits;
