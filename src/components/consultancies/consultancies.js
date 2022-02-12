import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Table from "./listTable";
import { getConsultancies } from "../../services/consultancies";
import { trackPromise } from "react-promise-tracker";

const Consultancies = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [consultancies, setConsultancies] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getConsultancies(api)
        .then((response) => {
          if (mounted) {
            setConsultancies(response.data);
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

  if (!consultancies || consultancies.length === 0)
    return (
      <div>
        <p className="text-xl text-bold">
          Can not find any consultancies, sorry
        </p>
      </div>
    );

  return <Table consultancies={consultancies} />;
};

export default Consultancies;
