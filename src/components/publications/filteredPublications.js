import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
import axios from "axios";

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
  publicationTitle: {
    fontSize: "16px",
    textAlign: "left",
  },
  publicationText: {
    display: "flex",
    justifyContent: "left",
    alignItems: "baseline",
    fontSize: "12px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
  },
}));

const FilteredPublications = () => {
  const publicationURL = "http://shivampjt.pythonanywhere.com/";
  const { start_year, end_year } = useParams();
  const classes = useStyles();

  let [publications, setPublications] = useState([]);

  let getPublications = async () => {
    axios
      .get(
        "http://shivampjt.pythonanywhere.com/publication/" +
          start_year +
          "/" +
          end_year +
          "/"
      )
      .then((response) => {
        setPublications(response.data);
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  };

  useEffect(() => {
    getPublications();
  }, [setPublications]);
  if (!publications || publications.length === 0)
    return <p>Can not find any publications, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="left">Month/Year</TableCell>
                  <TableCell align="left">ISSN</TableCell>
                  <TableCell align="left">Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {publications.map((publication) => {
                  return (
                    <TableRow key={publication.ID}>
                      <TableCell component="th" scope="row">
                        <a
                          href={
                            publicationURL + "paperdetails/" + publication.ID
                          }
                        >
                          {publication.Title}
                        </a>
                      </TableCell>
                      <TableCell align="left">
                        {publication.Month}/{publication.Year}
                      </TableCell>

                      <TableCell align="left">{publication.ISSN}</TableCell>
                      <TableCell align="left">{publication.Level}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <p>
        To create/delete publications or to access more detailed information
        about specific publications of your interest, please visit{" "}
        <a href={publicationURL}>{publicationURL}</a>
      </p>
    </React.Fragment>
  );
};

export default FilteredPublications;
