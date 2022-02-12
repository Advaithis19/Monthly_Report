import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import Table from "./listTable";

import { getFilteredGrants } from "../../services/grants";
import { trackPromise } from "react-promise-tracker";

const FilteredGrants = () => {
  const { start_date, end_date } = useParams();
  let navigate = useNavigate();
  let api = useAxios();

  let [grants, setGrants] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredGrants(api, start_date, end_date)
        .then((response) => {
          if (mounted) {
            setGrants(response.data);
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

  if (!grants || grants.length === 0)
    return <p className="text-xl text-bold">Can not find any grants, sorry</p>;

  return <Table grants={grants} />;
};

export default FilteredGrants;
