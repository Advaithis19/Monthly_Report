import React from "react";
import axiosInstance from "../../utils/axios";
import { useParams, useNavigate } from "react-router-dom";
//MaterialUI
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

const DeleteGrant = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // const [open, setOpen] = React.useState(true);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .delete("grants/delete/" + id)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(function () {
        // handleClose();
        navigate("/grants");
        window.location.reload();
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleSubmit}
        >
          Press here to confirm delete
        </Button>
      </Box>
    </Container>

    // <Dialog
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="alert-dialog-title"
    //   aria-describedby="alert-dialog-description"
    // >
    //   <DialogTitle id="alert-dialog-title">{"Attention"}</DialogTitle>
    //   <DialogContent>
    //     <DialogContentText id="alert-dialog-description">
    //       You are about to delete grant-{id}
    //     </DialogContentText>
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={handleClose}>Cancel</Button>
    //     <Button
    //       variant="contained"
    //       color="secondary"
    //       type="submit"
    //       onClick={handleSubmit}
    //     >
    //       Delete
    //     </Button>
    //   </DialogActions>
    // </Dialog>
  );
};

export default DeleteGrant;
