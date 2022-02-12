import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

const CreateEvent = () => {
  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    title: "",
    venue: "",
    n_stud: "",
    n_fac: "",
    n_ind: "",
    slug: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [date, setDate] = useState(new Date());
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
      date: dayjs(date).format("YYYY-MM-DD"),
      u_id: facultySelected.map((selectedObj) => selectedObj.id),
    };

    api
      .post(`events/create/`, postData)
      .then(() => {
        navigate("/events/");
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
      date={date}
      setDate={setDate}
      facultySelected={facultySelected}
      setFacultySelected={setFacultySelected}
      users={users}
      onSubmit={onSubmit}
      type="Create"
    />
  );
};

export default CreateEvent;
