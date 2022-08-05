import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { findNatIntLabel } from "../../constants/nat_int";

//MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import exportFromJSON from "export-from-json";

let data = [{ foo: "foo" }, { bar: "bar" }];
const fileName = "report";
const exportType = "csv";

const Table = ({ conferences }) => {
  const navigate = useNavigate();
  const goToDetail = (id) => {
    navigate("/conferences/" + id);
  };

  data = conferences;

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
                <th>Title of Publication</th>
                <th>Conference</th>
                <th>National/International</th>
              </tr>
            </thead>
            <tbody>
              {conferences.map((conference) => {
                return (
                  <tr
                    key={conference.id}
                    className="hover:bg-[#27447e] hover:text-white cursor-pointer"
                    onClick={() => goToDetail(conference.id)}
                  >
                    <td>{conference.title}</td>
                    <td>{conference.conference}</td>
                    <td>{findNatIntLabel(conference.nat_int)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12} className="text-center">
          <Button
            variant="contained"
            style={{ height: 40 }}
            onClick={ExportToExcel}
          >
            Export To Excel
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Table;
