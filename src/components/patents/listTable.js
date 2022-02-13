import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { findStatusLabel } from "../../constants/statusOptions";

//MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import jwt_decode from "jwt-decode";
import exportFromJSON from "export-from-json";

let data = [{ foo: "foo" }, { bar: "bar" }];
const fileName = "report";
const exportType = "csv";

const Table = ({ patents }) => {
  const navigate = useNavigate();
  const goToDetail = (id) => {
    navigate("/patents/" + id);
  };

  data = patents;

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
                <th>Topic</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patents.map((patent) => {
                return (
                  <tr
                    key={patent.id}
                    className="hover:bg-[#27447e] hover:text-white cursor-pointer"
                    onClick={() => goToDetail(patent.id)}
                  >
                    <td>{patent.title}</td>
                    <td>{patent.topic}</td>
                    <td>{findStatusLabel(patent.status)}</td>
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
            <Link to={"/patents/create"}>
              <Button
                variant="contained"
                style={{ height: 40 }}
                color="primary"
              >
                New Patent
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Table;
