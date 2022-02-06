import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";

//MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import exportFromJSON from "export-from-json";
import jwt_decode from "jwt-decode";
import { getFilteredGrants } from "../../services/grants";
import { trackPromise } from "react-promise-tracker";

let data = [{ foo: "foo" }, { bar: "bar" }];
const fileName = "report";
const exportType = "csv";

const FilteredGrants = () => {
  const { start_date, end_date } = useParams();
  let navigate = useNavigate();
  let api = useAxios();

  let [grants, setGrants] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredGrants(api, start_date, end_date)
        .then((response) => {
          if (mounted) {
            setGrants(response.data);
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

  if (!grants || grants.length === 0)
    return <p>Can not find any grants, sorry</p>;

  return (
    <Container maxWidth="md" component="main">
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
              <Table stickyHeader aria-label="grants table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Agency</TableCell>
                    <TableCell align="center">Year</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {grants.map((grant) => {
                    return (
                      <TableRow key={grant.id}>
                        <TableCell scope="row" align="center">
                          <Link to={"/grants/" + grant.id}>{grant.title}</Link>
                        </TableCell>
                        <TableCell align="center">{grant.agency}</TableCell>
                        <TableCell align="center">{grant.year}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
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
                New Grant
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default FilteredGrants;
