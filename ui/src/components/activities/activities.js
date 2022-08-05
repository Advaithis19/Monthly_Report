import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../../services/activities";
import { trackPromise } from "react-promise-tracker";

const Activities = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [activities, setActivities] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getActivities(api)
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
  }, []);

  if (!activities || activities.length === 0)
    return (
      <div className="text-center pt-5">
        <p className="text-xl text-bold">Can not find any activities, sorry</p>
      </div>
    );

  return <Table activities={activities} />;
};

export default Activities;
