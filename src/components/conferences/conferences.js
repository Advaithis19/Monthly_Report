import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getConferences } from "../../services/conferences";
import { trackPromise } from "react-promise-tracker";

const Conferences = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [conferences, setConferences] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getConferences(api)
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
  }, []);

  if (!conferences || conferences.length === 0)
    return (
      <div>
        <p className="text-xl text-bold">Can not find any conferences, sorry</p>
      </div>
    );

  return <Table conferences={conferences} />;
};

export default Conferences;
