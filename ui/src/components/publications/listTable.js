import React from "react";
import { useNavigate } from "react-router-dom";

//MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Table = ({ publications }) => {
  const navigate = useNavigate();
  const publicationURL = "http://shivampjt.pythonanywhere.com/";
  const goToDetail = (id) => {
    window.location.href = publicationURL + "paperdetails/" + id;
  };

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
            <div className="font-semibold text-lg">
              To create/delete publications or to access more detailed
              information about specific publications of your interest, please
              visit{" "}
              <a href={publicationURL} style={{ color: "#436ef0" }}>
                {publicationURL}
              </a>
            </div>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Table;
