import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getMemberships } from "../../services/memberships";
import { trackPromise } from "react-promise-tracker";

const Memberships = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [memberships, setMemberships] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getMemberships(api)
        .then((response) => {
          if (mounted) {
            setMemberships(response.data);
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

  if (!memberships || memberships.length === 0)
    return (
      <div className="text-center pt-5">
        <p className="text-xl text-bold">Can not find any memberships, sorry</p>
      </div>
    );

  return <Table memberships={memberships} />;
};

export default Memberships;
