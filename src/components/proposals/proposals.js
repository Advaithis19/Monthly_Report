import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// mui
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import exportFromJSON from "export-from-json";
import { getProposals } from "../../services/proposals";
import { trackPromise } from "react-promise-tracker";

let data = [{ foo: "foo" }, { bar: "bar" }];
const fileName = "report";
const exportType = "csv";

const Proposals = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [proposals, setProposals] = useState([]);

  let goToCreate = () => {
    navigate("create");
  };

  const goToDetail = (id) => {
    navigate("" + id);
  };

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getProposals(api)
        .then((response) => {
          if (mounted) {
            setProposals(response.data);
            data = response.data;
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

  let ExportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  if (!proposals || proposals.length === 0)
    return (
      <div>
        <p className="text-xl text-bold">Can not find any proposals, sorry</p>
      </div>
    );

  return (
    <Container maxWidth="md" component="main">
      <Grid container rowSpacing={2}>
        <Grid item xs={12} className="">
          <table className="border-solid border-1 border-black mx-auto font-sans text-md overflow-auto w-[75%] mb-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Submitted to</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => {
                return (
                  <tr
                    key={proposal.id}
                    className="hover:bg-[#27447e] hover:text-white cursor-pointer"
                    onClick={() => goToDetail(proposal.id)}
                  >
                    <td>{proposal.title}</td>
                    <td>{proposal.submitted_to}</td>
                    <td>{proposal.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
        <Grid item sm={6} className="">
          <Button
            variant="contained"
            style={{ height: 40 }}
            onClick={ExportToExcel}
          >
            Export To Excel
          </Button>
        </Grid>
        {jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
          .is_teacher && (
          <Grid item sm={6} className="">
            <Button
              variant="contained"
              style={{ height: 40 }}
              color="primary"
              onClick={goToCreate}
            >
              New Proposal
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Proposals;
