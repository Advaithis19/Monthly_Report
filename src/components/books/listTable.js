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

const Table = ({ books }) => {
  const navigate = useNavigate();
  const goToDetail = (id) => {
    navigate("/books/" + id);
  };

  data = books;

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
                <th>ISBN #</th>
                <th>Name of Book</th>
                <th>Publisher</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                return (
                  <tr
                    key={book.id}
                    className="hover:bg-[#27447e] hover:text-white cursor-pointer"
                    onClick={() => goToDetail(book.id)}
                  >
                    <td>{book.n_isbn}</td>
                    <td>{book.name}</td>
                    <td>{book.publisher}</td>
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
            <Link to={"/books/create"}>
              <Button
                variant="contained"
                style={{ height: 40 }}
                color="primary"
              >
                New Book
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Table;
