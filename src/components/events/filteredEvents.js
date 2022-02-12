import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate, useParams } from "react-router-dom";
import { getFilteredEvents } from "../../services/events";
import { trackPromise } from "react-promise-tracker";

const FilteredEvents = () => {
  const { start_date, end_date } = useParams();
  let navigate = useNavigate();
  let api = useAxios();

  let [events, setEvents] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredEvents(api, start_date, end_date)
        .then((response) => {
          if (mounted) {
            setEvents(response.data);
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

  if (!events || events.length === 0)
    return <p className="text-xl text-bold">Can not find any events, sorry</p>;

  return <Table events={events} />;
};

export default FilteredEvents;
