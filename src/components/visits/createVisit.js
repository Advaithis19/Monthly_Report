import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

const CreateIndustrial_visit = () => {
  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    purpose: "",
    industry: "",
    semester: "",
    n_stud: "",
    slug: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [facultySelected, setFacultySelected] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getUsers(api)
        .then((response) => {
          if (mounted) {
            setUsers(
              response.data.map((user) => {
                return {
                  name: user.first_name + " " + user.last_name,
                  id: user.id,
                };
              })
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
  }, []);

  const onSubmit = async () => {
    let postData = {
      ...formData,
      f_id: facultySelected.map((selectedObj) => selectedObj.id),
    };

    api
      .post(`industrial_visits/create/`, postData)
      .then(() => {
        navigate("/reports/industrial_visits/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
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
      type="Create"
    />
  );
};

export default CreateIndustrial_visit;
