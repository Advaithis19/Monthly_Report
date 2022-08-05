import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getWorkshops } from "../../services/workshops";
import { trackPromise } from "react-promise-tracker";

const Workshops = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getWorkshops(api)
        .then((response) => {
          if (mounted) {
            setWorkshops(response.data);
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

  if (!workshops || workshops.length === 0)
    return (
      <div className="text-center pt-5">
        <p className="text-xl text-bold">Can not find any workshops, sorry</p>
      </div>
    );

  return <Table workshops={workshops} />;
};

export default Workshops;
