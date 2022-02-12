import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useParams } from "react-router-dom";
import { getFilteredPublications } from "../../services/publications";
import { trackPromise } from "react-promise-tracker";

const FilteredPublications = () => {
  const axios = useAxios();
  const { start_year, end_year } = useParams();

  let [publications, setPublications] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredPublications(axios, start_year, end_year)
        .then((response) => {
          if (mounted) {
            setPublications(response.data);
          }
        })
        .catch(() => {
          alert("Something went wrong!");
        })
    );
    return () => {
      mounted = false;
    };
  }, [start_year, end_year]);

  if (!publications || publications.length === 0)
    return (
      <p className="text-xl text-bold">Can not find any publications, sorry</p>
    );

  return <Table publications={publications} />;
};

export default FilteredPublications;
