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

const Table = ({ grants }) => {
  const navigate = useNavigate();
  const goToDetail = (id) => {
    navigate("/grants/" + id);
  };

  data = grants;

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
                <th>Agency</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {grants.map((grant) => {
                return (
                  <tr
                    key={grant.id}
                    className="hover:bg-[#27447e] hover:text-white cursor-pointer"
                    onClick={() => goToDetail(grant.id)}
                  >
                    <td>{grant.title}</td>
                    <td>{grant.agency}</td>
                    <td>{grant.year}</td>
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
            <Link to={"/grants/create"}>
              <Button
                variant="contained"
                style={{ height: 40 }}
                color="primary"
              >
                New Grant
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Table;
