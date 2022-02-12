import React from "react";
import { Link, useNavigate } from "react-router-dom";

//MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import jwt_decode from "jwt-decode";
import exportFromJSON from "export-from-json";

let data = [{ foo: "foo" }, { bar: "bar" }];
const fileName = "report";
const exportType = "csv";

const Table = ({ consultancies }) => {
  const navigate = useNavigate();
  const goToDetail = (id) => {
    navigate("/consultancies/" + id);
  };

  data = consultancies;

  let ExportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };

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
            <Link to={"/consultancies/create"}>
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

export default Table;
