import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getIndustrial_visitInstance } from "../../services/industrial_visits";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

const EditIndustrial_visit = () => {
  const initialFormData = Object.freeze({
    purpose: "",
    industry: "",
    semester: "",
    n_stud: "",
    slug: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [facultySelected, setFacultySelected] = useState([]);

  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const usersRef = useRef();

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getUsers(api)
        .then((response) => {
          if (mounted) {
            usersRef.current = response.data.map((user) => {
              return {
                name: user.first_name + " " + user.last_name,
                id: user.id,
              };
            });
            setUsers(usersRef.current);
          }
        })
        .catch((error) => {
          if (mounted) {
            if (error.response.status === 401) {
              alert("Authentication has expired! Please re-login");
              navigate("/logout");
            } else {
              alert("Something went wrong! Please logout and try again");
            }
          }
        })
    );
    trackPromise(
      getIndustrial_visitInstance(api, id)
        .then((res) => {
          if (mounted) {
            updateFormData({
              ...formData,
              ["purpose"]: res.data.purpose,
              ["industry"]: res.data.industry,
              ["semester"]: res.data.semester,
              ["n_stud"]: res.data.n_stud,
              ["slug"]: res.data.slug,
            });
            setFacultySelected(
              findMatchingUsers(res.data.f_id, usersRef.current)
            );
          }
        })
        .catch((error) => {
          if (mounted) {
            if (error.response.status === 401) {
              alert("Authentication has expired! Please re-login");
              navigate("/logout");
            } else {
              alert("Something went wrong! Please logout and try again");
            }
          }
        })
    );

    return () => {
      mounted = false;
    };
  }, [setUsers, updateFormData, setFacultySelected]);

  const findMatchingUsers = (facultyList, userResponseArray) => {
    let faculty_selected = [];
    facultyList.forEach((name) => {
      faculty_selected.push(
        userResponseArray.filter((userObj) => userObj.name === name)[0]
      );
    });
    return faculty_selected;
  };

  const onSubmit = async () => {
    let postData = {
      ...formData,
      f_id: facultySelected.map((selectedObj) => selectedObj.id),
    };

    api
      .put(`industrial_visits/edit/` + id + "/", postData)
      .then(() => {
        navigate("/industrial_visits/" + id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/industrial_visits/" + id);
        } else {
          alert("Error! Please check the values entered for any mistakes....");
        }
      });
  };

  return (
    <Form
      formData={formData}
      updateFormData={updateFormData}
      facultySelected={facultySelected}
      setFacultySelected={setFacultySelected}
      users={users}
      onSubmit={onSubmit}
      type="Edit"
    />
  );
};

export default EditIndustrial_visit;
