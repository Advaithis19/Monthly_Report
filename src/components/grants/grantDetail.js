import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

//MUI
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import ConfirmDialog from "../../utils/confirmDialog";

const GrantDetail = () => {
  let navigate = useNavigate();

  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  let [grant, setGrant] = useState(null);
  const { id } = useParams();
  const [confirmOpen, setConfirmOpen] = useState(false);

  let goToEdit = () => {
    navigate("/grants/edit/" + id);
  };

  let getGrant = async () => {
    api
      .get("grants/" + id)
      .then((response) => {
        setGrant(response.data);
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
    getGrant();
  }, [setGrant]);

  const deletePost = () => {
    api
      .delete("grants/delete/" + id)
      .then(function () {
        navigate("/grants");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/grants");
        } else {
          alert("Something went wrong! Please logout and try again");
        }
      });
  };

  if (!grant || grant.length === 0)
    return <p>Can not find required grant, sorry</p>;
  return (
    <Container
      maxWidth="md"
      component="main"
      className="border-solid border-1 border-[#27447e] my-5 shadow-xl shadow-blue-500/50"
    >
      <Box mt={3} mb={3}>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="detailed grant table"
                className="border-solid border-1 border-[#27447e]"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      {grant.title}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Agency</TableCell>
                    <TableCell>{grant.agency}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sanctioned amount</TableCell>
                    <TableCell>{grant.sanc_amt}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell>{grant.year}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remarks</TableCell>
                    <TableCell>{grant.remarks}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Principal Investigator</TableCell>
                    <TableCell>{grant.PI}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Co-Principal Investigator</TableCell>
                    <TableCell>{grant.CO_PI}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <div className="w-[100%] h-[0.25px] bg-gray-400 mx-auto mt-5" />

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
              title="Delete Grant?"
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={deletePost}
            >
              Are you sure you want to delete this grant?
            </ConfirmDialog>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default GrantDetail;
