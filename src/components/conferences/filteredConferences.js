import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate, useParams } from "react-router-dom";
import { getFilteredConferences } from "../../services/conferences";
import { trackPromise } from "react-promise-tracker";

const FilteredConferences = () => {
  const { start_date, end_date } = useParams();
  let navigate = useNavigate();
  let api = useAxios();

  let [conferences, setConferences] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredConferences(api, start_date, end_date)
        .then((response) => {
          if (mounted) {
            setConferences(response.data);
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

  if (!conferences || conferences.length === 0)
    return (
      <p className="text-xl text-bold">Can not find any conferences, sorry</p>
    );

  return <Table conferences={conferences} />;
};

export default FilteredConferences;
