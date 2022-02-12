import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getProposals } from "../../services/proposals";
import { trackPromise } from "react-promise-tracker";

const Proposals = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [proposals, setProposals] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getProposals(api)
        .then((response) => {
          if (mounted) {
            setProposals(response.data);
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

  if (!proposals || proposals.length === 0)
    return (
      <div>
        <p className="text-xl text-bold">Can not find any proposals, sorry</p>
      </div>
    );

  return <Table proposals={proposals} />;
};

export default Proposals;
