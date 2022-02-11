import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";

//MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import exportFromJSON from "export-from-json";
import jwt_decode from "jwt-decode";
import { getFilteredConsultancies } from "../../services/consultancies";
import { trackPromise } from "react-promise-tracker";

let data = [{ foo: "foo" }, { bar: "bar" }];
const fileName = "report";
const exportType = "csv";

const FilteredConsultancies = () => {
  const { start_date, end_date } = useParams();
  let navigate = useNavigate();
  let api = useAxios();

  let [consultancies, setConsultancies] = useState([]);

  const goToDetail = (id) => {
    navigate("/consultancies/" + id);
  };

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredConsultancies(api, start_date, end_date)
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
  }, [start_date, end_date]);

  let ExportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  if (!consultancies || consultancies.length === 0)
    return (
      <p className="text-xl text-bold">Can not find any consultancies, sorry</p>
    );

  return (
    <Container maxWidth="md" component="main">
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
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
        <Grid item sm={6} className="bottomButton">
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
          <Grid item sm={6} className="bottomButton">
            <Link to={"create"}>
              <Button
                variant="contained"
                style={{ height: 40 }}
                color="primary"
              >
                New Consultancy
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default FilteredConsultancies;
