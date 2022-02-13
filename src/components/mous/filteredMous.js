import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate, useParams } from "react-router-dom";
import { getFilteredMous } from "../../services/mous";
import { trackPromise } from "react-promise-tracker";

const FilteredMous = () => {
  const { start_date, end_date } = useParams();
  let navigate = useNavigate();
  let api = useAxios();

  let [mous, setMous] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredMous(api, start_date, end_date)
        .then((response) => {
          if (mounted) {
            setMous(response.data);
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

  if (!mous || mous.length === 0)
    return <p className="text-xl text-bold">Can not find any MoUs, sorry</p>;

  return <Table mous={mous} />;
};

export default FilteredMous;
