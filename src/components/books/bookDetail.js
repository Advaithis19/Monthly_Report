import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

//MUI
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import ConfirmDialog from "../../utils/confirmDialog";

import AuthContext from "../../context/AuthContext";

const BookDetail = () => {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  let [book, setBook] = useState(null);
  const { id } = useParams();
  const [confirmOpen, setConfirmOpen] = useState(false);

  let goToEdit = () => {
    navigate("/books/edit/" + id);
  };

  let getBook = async () => {
    api
      .get("books/" + id)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else {
          alert("Something went wrong! Please logout and try again");
        }
      });
  };

  useEffect(() => {
    getBook();
  }, [setBook]);

  const deleteBook = () => {
    api
      .delete("books/delete/" + id)
      .then(function () {
        navigate("/reports/books");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/reports/books");
        } else {
          alert("Something went wrong! Please logout and try again");
        }
      });
  };

  if (!book || book.length === 0)
    return (
      <div className="text-center pt-5">
        <p className="text-xl text-bold">Can not find required book, sorry</p>
      </div>
    );
  return (
    <Container
      maxWidth="md"
      component="main"
      className="border-solid border-1 border-[#27447e] my-5 shadow-xl shadow-blue-500/50"
    >
      <Box mt={3} mb={3}>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <table className="border-solid border-1 border-black mx-auto font-sans text-md overflow-auto w-[75%] mb-3">
              <thead className="">
                <tr className="text-center">
                  <th colSpan={2}>{book.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ISBN #</td>
                  <td>{book.n_isbn}</td>
                </tr>
                <tr>
                  <td>Publisher</td>
                  <td>{book.publisher}</td>
                </tr>
                <tr>
                  <td>Faculty involved</td>
                  <td>
                    <div>
                      {book.f_id.map((faculty, index) => {
                        return <div key={index}>{faculty}</div>;
                      })}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>

          {user.is_teacher && (
            <div>
              <div className="w-[100%] h-[0.25px] bg-gray-400 mx-auto mt-3" />

              <Grid item xs={6} className="text-center">
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<EditIcon />}
                  onClick={goToEdit}
                  className="w-[50%]"
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={6} className="text-center">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setConfirmOpen(true)}
                  className="w-[50%]"
                >
                  Delete
                </Button>
                <ConfirmDialog
                  title="Delete Book?"
                  open={confirmOpen}
                  setOpen={setConfirmOpen}
                  onConfirm={deleteBook}
                >
                  Are you sure you want to delete this book?
                </ConfirmDialog>
              </Grid>
            </div>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default BookDetail;
