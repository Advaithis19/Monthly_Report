import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { findNatIntLabel } from "../../constants/nat_int";

//MUI
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import ConfirmDialog from "../../utils/confirmDialog";

const ConferenceDetail = () => {
  let navigate = useNavigate();

  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  let [conference, setConference] = useState(null);
  const { id } = useParams();
  const [confirmOpen, setConfirmOpen] = useState(false);

  let goToEdit = () => {
    navigate("/conferences/edit/" + id);
  };

  let getConference = async () => {
    api
      .get("conferences/" + id)
      .then((response) => {
        setConference(response.data);
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
    getConference();
  }, [setConference]);

  const deleteConference = () => {
    api
      .delete("conferences/delete/" + id)
      .then(function () {
        navigate("/reports/conferences");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/reports/conferences");
        } else {
          alert("Something went wrong! Please logout and try again");
        }
      });
  };

  if (!conference || conference.length === 0)
    return (
      <div className="text-center pt-5">
        <p className="text-xl text-bold">
          Can not find required conference, sorry
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
                  <th colSpan={2}>{conference.title}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Venue</td>
                  <td>{conference.conference}</td>
                </tr>
                <tr>
                  <td>Volume #</td>
                  <td>{conference.volume}</td>
                </tr>
                <tr>
                  <td>Issue #</td>
                  <td>{conference.issue}</td>
                </tr>
                <tr>
                  <td>Page #</td>
                  <td>{conference.n_page}</td>
                </tr>
                <tr>
                  <td>National/International</td>
                  <td>{findNatIntLabel(conference.nat_int)}</td>
                </tr>
                <tr>
                  <td>Faculty Involved</td>
                  <td>{conference.f_id}</td>
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
              title="Delete Conference?"
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={deleteConference}
            >
              Are you sure you want to delete this conference?
            </ConfirmDialog>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ConferenceDetail;
