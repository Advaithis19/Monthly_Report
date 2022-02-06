import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";

//MUI
// import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@material-ui/core/Button";
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
    // window.location.reload();
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
    <Container maxWidth="md" component="main">
      <Box mt={3} mb={3}>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="detailed grant table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      Grant - {grant.id}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>{grant.title}</TableCell>
                  </TableRow>
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
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<EditIcon />}
              onClick={goToEdit}
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => setConfirmOpen(true)}
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
