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

const Table = ({ lectures }) => {
  const navigate = useNavigate();
  const goToDetail = (id) => {
    navigate("/lectures/" + id);
  };

  data = lectures;

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
                <th>Topic</th>
                <th>Resource Person</th>
                <th>Organisation</th>
              </tr>
            </thead>
            <tbody>
              {lectures.map((lecture) => {
                return (
                  <tr
                    key={lecture.id}
                    className="hover:bg-[#27447e] hover:text-white cursor-pointer"
                    onClick={() => goToDetail(lecture.id)}
                  >
                    <td>{lecture.topic}</td>
                    <td>{lecture.res_person}</td>
                    <td>{lecture.organisation}</td>
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
            <Link to={"/lectures/create"}>
              <Button
                variant="contained"
                style={{ height: 40 }}
                color="primary"
              >
                New Lecture
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Table;
