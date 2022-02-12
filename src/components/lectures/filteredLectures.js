import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate, useParams } from "react-router-dom";
import { getFilteredLectures } from "../../services/lectures";
import { trackPromise } from "react-promise-tracker";

const FilteredLectures = () => {
  const { start_date, end_date } = useParams();
  let navigate = useNavigate();
  let api = useAxios();

  let [lectures, setLectures] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredLectures(api, start_date, end_date)
        .then((response) => {
          if (mounted) {
            setLectures(response.data);
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

  if (!lectures || lectures.length === 0)
    return (
      <p className="text-xl text-bold">Can not find any lectures, sorry</p>
    );

  return <Table lectures={lectures} />;
};

export default FilteredLectures;
