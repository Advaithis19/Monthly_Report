import React, { useState, useEffect } from "react";
import useAxios from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

//MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Profile = () => {
  let navigate = useNavigate();

  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  let [profile, setProfile] = useState(null);
  const { id } = useParams();

  let goToEdit = () => {
    navigate("/grants/edit/" + id);
  };

  let getProfile = async () => {
    api
      .get("users/" + id)
      .then((response) => {
        setProfile(response.data);
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
    getProfile();
  }, [setProfile]);

  if (!profile || profile.length === 0)
    return (
      <p className="text-xl text-bold">
        Could not find the profile you asked for, sorry
      </p>
    );
  return (
    <Container
      maxWidth="md"
      component="main"
      className="border-solid border-1 border-[#27447e] my-5 shadow-xl shadow-blue-500/50"
    >
      <div className="text-3xl font-semibold my-3 text-center">
        <h1>Profile</h1>
      </div>
      <Box mt={3} mb={3}>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <table className="border-solid border-1 border-black mx-auto font-sans text-md overflow-auto w-[75%] mb-3">
              <thead className="">
                <tr className="text-center">
                  <th colSpan={2}>{profile.username}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>{profile.email}</td>
                </tr>
                <tr>
                  <td>Full Name</td>
                  <td>{profile.first_name + " " + profile.last_name}</td>
                </tr>
                <tr>
                  <td>Department</td>
                  <td>{profile.department}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>
                    {profile.is_teacher
                      ? "Teacher"
                      : profile.is_admin
                      ? "Admin"
                      : "Super-admin"}
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
