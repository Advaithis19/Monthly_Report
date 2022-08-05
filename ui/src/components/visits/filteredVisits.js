import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate, useParams } from "react-router-dom";
import { getFilteredIndustrial_visits } from "../../services/industrial_visits";
import { trackPromise } from "react-promise-tracker";

const FilteredIndustrial_visits = () => {
  const { start_date, end_date } = useParams();
  let navigate = useNavigate();
  let api = useAxios();

  let [industrial_visits, setIndustrial_visits] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredIndustrial_visits(api, start_date, end_date)
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
  }, [start_date, end_date]);

  if (!industrial_visits || industrial_visits.length === 0)
    return (
      <div className="text-center pt-5">
        <p className="text-xl text-bold">
          Can not find any industrial_visits, sorry
        </p>
      </div>
    );

  return <Table industrial_visits={industrial_visits} />;
};

export default FilteredIndustrial_visits;
