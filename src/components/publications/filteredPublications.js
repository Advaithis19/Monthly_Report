import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { useParams } from "react-router-dom";

import makeStyles from '@mui/styles/makeStyles';
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//custom css
import "../../static/stylings.css";

import { getFilteredPublications } from "../../services/publications";
import { trackPromise } from "react-promise-tracker";

const FilteredPublications = () => {
  const publicationURL = "http://shivampjt.pythonanywhere.com/";
  const axios = useAxios();
  const { start_year, end_year } = useParams();

  let [publications, setPublications] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getFilteredPublications(axios, start_year, end_year)
        .then((response) => {
          if (mounted) {
            setPublications(response.data);
          }
        })
        .catch(() => {
          alert("Something went wrong!");
        })
    );
    return () => {
      mounted = false;
    };
  }, [start_year, end_year]);

  if (!publications || publications.length === 0)
    return <p>Can not find any publications, sorry</p>;

  return (
    <Container maxWidth="md" component="main">
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
              <Table stickyHeader aria-label="publications table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Month/Year</TableCell>
                    <TableCell align="center">ISSN</TableCell>
                    <TableCell align="center">Level</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {publications.map((publication) => {
                    return (
                      <TableRow key={publication.ID}>
                        <TableCell scope="row" align="center">
                          <a
                            href={
                              publicationURL + "paperdetails/" + publication.ID
                            }
                          >
                            {publication.Title}
                          </a>
                        </TableCell>
                        <TableCell align="center">
                          {publication.Month}/{publication.Year}
                        </TableCell>

                        <TableCell align="center">{publication.ISSN}</TableCell>
                        <TableCell align="center">
                          {publication.Level}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item sm={12}>
          <Typography>
            To create/delete publications or to access more detailed information
            about specific publications of your interest, please visit{" "}
            <a href={publicationURL}>{publicationURL}</a>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FilteredPublications;
