import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Table from "./listTable";
import { getGrants } from "../../services/grants";
import { trackPromise } from "react-promise-tracker";

const Grants = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [grants, setGrants] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getGrants(api)
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
  }, []);

  if (!grants || grants.length === 0)
    return (
      <div className="text-center pt-5">
        <p className="text-xl text-bold">Can not find any grants, sorry</p>
      </div>
    );

  return <Table grants={grants} />;
};

export default Grants;
