import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate, useParams } from "react-router-dom";
import { getFilteredActivities } from "../../services/activities";
import { trackPromise } from "react-promise-tracker";

const FilteredActivities = () => {
  const { start_date, end_date } = useParams();
  let navigate = useNavigate();
  let api = useAxios();

  let [activities, setActivities] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredActivities(api, start_date, end_date)
        .then((response) => {
          if (mounted) {
            setActivities(response.data);
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

  if (!activities || activities.length === 0)
    return (
      <p className="text-xl text-bold">Can not find any activities, sorry</p>
    );

  return <Table activities={activities} />;
};

export default FilteredActivities;
