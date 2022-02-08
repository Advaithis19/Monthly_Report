import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { useParams } from "react-router-dom";

// mui
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { getFilteredPublications } from "../../services/publications";
import { trackPromise } from "react-promise-tracker";

const FilteredPublications = () => {
  const publicationURL = "http://shivampjt.pythonanywhere.com/";
  const axios = useAxios();
  const { start_year, end_year } = useParams();

  let [publications, setPublications] = useState([]);

  const goToDetail = (id) => {
    window.location.href = publicationURL + "paperdetails/" + id;
  };

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
          <table className="border-solid border-1 border-black mx-auto font-sans text-md overflow-auto w-[75%] mb-3">
            <thead className="">
              <tr>
                <th align="center">Title</th>
                <th align="center">Month/Year</th>
                <th align="center">ISSN</th>
                <th align="center">Level</th>
              </tr>
            </thead>
            <tbody>
              {publications.map((publication) => {
                return (
                  <tr
                    key={publication.ID}
                    className="hover:bg-[#27447e] hover:text-white cursor-pointer"
                    onClick={() => goToDetail(publication.ID)}
                  >
                    <td scope="row" align="center">
                      {publication.Title}
                    </td>
                    <td align="center">
                      {publication.Month}/{publication.Year}
                    </td>

                    <td align="center">{publication.ISSN}</td>
                    <td align="center">{publication.Level}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>

        <div className="w-[100%] h-[0.25px] bg-gray-400 mx-auto mt-5" />

        <Grid item sm={12} className="my-3">
          <Typography>
            <p className="font-semibold text-lg">
              To create/delete publications or to access more detailed
              information about specific publications of your interest, please
              visit{" "}
              <a href={publicationURL} style={{ color: "#436ef0" }}>
                {publicationURL}
              </a>
            </p>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FilteredPublications;
