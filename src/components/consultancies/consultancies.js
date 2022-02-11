import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// mui
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import exportFromJSON from "export-from-json";
import { getConsultancies } from "../../services/consultancies";
import { trackPromise } from "react-promise-tracker";

let data = [{ foo: "foo" }, { bar: "bar" }];
const fileName = "report";
const exportType = "csv";

const Consultancies = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [consultancies, setConsultancies] = useState([]);

  let goToCreate = () => {
    navigate("create");
  };

  const goToDetail = (id) => {
    navigate("" + id);
  };

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getConsultancies(api)
        .then((response) => {
          if (mounted) {
            setConsultancies(response.data);
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

  if (!consultancies || consultancies.length === 0)
    return (
      <div>
        <p className="text-xl text-bold">
          Can not find any consultancies, sorry
        </p>
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
                <th>Funding Agency</th>
                <th>Received Amount</th>
              </tr>
            </thead>
            <tbody>
              {consultancies.map((consultancy) => {
                return (
                  <tr
                    key={consultancy.id}
                    className="hover:bg-[#27447e] hover:text-white cursor-pointer"
                    onClick={() => goToDetail(consultancy.id)}
                  >
                    <td>{consultancy.title}</td>
                    <td>{consultancy.fund_agency}</td>
                    <td>{consultancy.rec_amt}</td>
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
              New Consultancy
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Consultancies;
