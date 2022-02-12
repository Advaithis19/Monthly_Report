import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../services/events";
import { trackPromise } from "react-promise-tracker";

const Events = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [events, setEvents] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getEvents(api)
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
  }, []);

  if (!events || events.length === 0)
    return (
      <div>
        <p className="text-xl text-bold">Can not find any events, sorry</p>
      </div>
    );

  return <Table events={events} />;
};

export default Events;
