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

const ActivityDetail = () => {
  let navigate = useNavigate();

  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  let [activity, setActivity] = useState(null);
  const { id } = useParams();
  const [confirmOpen, setConfirmOpen] = useState(false);

  let goToEdit = () => {
    navigate("/activities/edit/" + id);
  };

  let getActivity = async () => {
    api
      .get("activities/" + id)
      .then((response) => {
        setActivity(response.data);
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
    getActivity();
  }, [setActivity]);

  const deleteActivity = () => {
    api
      .delete("activities/delete/" + id)
      .then(function () {
        navigate("/reports/activities");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/reports/activities");
        } else {
          alert("Something went wrong! Please logout and try again");
        }
      });
  };

  if (!activity || activity.length === 0)
    return (
      <p className="text-xl text-bold">Can not find required activity, sorry</p>
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
                  <th colSpan={2}>{activity.activity}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Date</td>
                  <td>{activity.date}</td>
                </tr>
                <tr>
                  <td>Faculty Involved</td>
                  <td>{activity.f_id}</td>
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
              title="Delete Activity?"
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={deleteActivity}
            >
              Are you sure you want to delete this activity?
            </ConfirmDialog>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ActivityDetail;
