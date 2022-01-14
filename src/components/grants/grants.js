import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  grantTitle: {
    fontSize: "16px",
    textAlign: "left",
  },
  grantText: {
    display: "flex",
    justifyContent: "left",
    alignItems: "baseline",
    fontSize: "12px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
  },
}));

const Grants = () => {
  const classes = useStyles();

  let [grants, setGrants] = useState([]);
  const user = jwt_decode(localStorage.getItem("access_token"));

  let getGrants = async () => {
    let response = await axiosInstance.get("grants/");
    if (response.status === 200) setGrants(response.data);
  };

  useEffect(() => {
    getGrants();
  }, [setGrants]);

  if (!grants || grants.length === 0)
    return <p>Can not find any grants, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="left">Agency</TableCell>
                  <TableCell align="left">Sanctioned Amount</TableCell>
                  <TableCell align="left">Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grants.map((grant) => {
                  return (
                    <TableRow key={grant.id}>
                      <TableCell component="th" scope="row">
                        <Link
                          color="textPrimary"
                          to={"" + grant.id}
                          className={classes.link}
                        >
                          {grant.title}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{grant.agency}</TableCell>

                      <TableCell align="left">{grant.sanc_amt}</TableCell>

                      <TableCell align="left">
                        <Link
                          color="textPrimary"
                          to={"edit/" + grant.id}
                          className={classes.link}
                        >
                          <EditIcon></EditIcon>
                        </Link>
                        <Link
                          color="textPrimary"
                          to={"delete/" + grant.id}
                          className={classes.link}
                        >
                          <DeleteForeverIcon></DeleteForeverIcon>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Link to={"create"}>
                      <Button variant="contained" color="primary">
                        New Grant
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Grants;
