import React, { useState, useEffect } from "react";
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

const LectureDetail = () => {
  let navigate = useNavigate();

  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  let [lecture, setLecture] = useState(null);
  const { id } = useParams();
  const [confirmOpen, setConfirmOpen] = useState(false);

  let goToEdit = () => {
    navigate("/lectures/edit/" + id);
  };

  let getLecture = async () => {
    api
      .get("lectures/" + id)
      .then((response) => {
        setLecture(response.data);
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
    getLecture();
  }, [setLecture]);

  const deleteLecture = () => {
    api
      .delete("lectures/delete/" + id)
      .then(function () {
        navigate("/reports/lectures");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/reports/lectures");
        } else {
          alert("Something went wrong! Please logout and try again");
        }
      });
  };

  if (!lecture || lecture.length === 0)
    return (
      <div className="text-center pt-5">
        <p className="text-xl text-bold">
          Can not find required lecture, sorry
        </p>
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
                  <th colSpan={2}>{lecture.topic}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Resource Person</td>
                  <td>{lecture.res_person}</td>
                </tr>
                <tr>
                  <td>Organisation</td>
                  <td>{lecture.organisation}</td>
                </tr>
                <tr>
                  <td>No. of Students</td>
                  <td>{lecture.n_stud}</td>
                </tr>
                <tr>
                  <td>No. of Faculty</td>
                  <td>{lecture.n_fac}</td>
                </tr>
                <tr>
                  <td>No. from Industry</td>
                  <td>{lecture.n_ind}</td>
                </tr>
                <tr>
                  <td>Faculty Involved</td>
                  <td>{lecture.f_id}</td>
                </tr>
              </tbody>
            </table>
          </Grid>

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
              title="Delete Lecture?"
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={deleteLecture}
            >
              Are you sure you want to delete this lecture?
            </ConfirmDialog>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LectureDetail;
