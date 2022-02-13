import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getPatents } from "../../services/patents";
import { trackPromise } from "react-promise-tracker";

const Patents = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [patents, setPatents] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getPatents(api)
        .then((response) => {
          if (mounted) {
            setPatents(response.data);
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

  if (!patents || patents.length === 0)
    return (
      <div>
        <p className="text-xl text-bold">Can not find any patents, sorry</p>
      </div>
    );

  return <Table patents={patents} />;
};

export default Patents;
