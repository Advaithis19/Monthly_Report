import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

//custom css
import "../../static/stylings.css";

// mui
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import exportFromJSON from "export-from-json";
import { getGrants } from "../../services/grants";
import { trackPromise } from "react-promise-tracker";

let data = [{ foo: "foo" }, { bar: "bar" }];
const fileName = "report";
const exportType = "csv";

const Grants = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [grants, setGrants] = useState([]);

  let goToCreate = () => {
    navigate("create");
    // window.location.reload();
  };

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getGrants(api)
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
  }, []);

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
              <Table
                stickyHeader
                aria-label="grants table"
                className="border-solid border-1 border-[#27447e] shadow-md"
              >
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
                          <Link to={"" + grant.id}>{grant.title}</Link>
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
            <Button
              variant="contained"
              style={{ height: 40 }}
              color="primary"
              onClick={goToCreate}
            >
              New Grant
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Grants;
