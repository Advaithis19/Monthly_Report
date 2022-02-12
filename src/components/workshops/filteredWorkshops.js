import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate, useParams } from "react-router-dom";
import { getFilteredWorkshops } from "../../services/workshops";
import { trackPromise } from "react-promise-tracker";

const FilteredWorkshops = () => {
  const { start_date, end_date } = useParams();
  let navigate = useNavigate();
  let api = useAxios();

  let [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredWorkshops(api, start_date, end_date)
        .then((response) => {
          if (mounted) {
            setWorkshops(response.data);
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

  if (!workshops || workshops.length === 0)
    return (
      <p className="text-xl text-bold">Can not find any workshops, sorry</p>
    );

  return <Table workshops={workshops} />;
};

export default FilteredWorkshops;
