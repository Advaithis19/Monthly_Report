import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getMous } from "../../services/mous";
import { trackPromise } from "react-promise-tracker";

const Mous = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [mous, setMous] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getMous(api)
        .then((response) => {
          if (mounted) {
            setMous(response.data);
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

  if (!mous || mous.length === 0)
    return (
      <div className="text-center pt-5">
        <p className="text-xl text-bold">Can not find any MoUs, sorry</p>
      </div>
    );

  return <Table mous={mous} />;
};

export default Mous;
