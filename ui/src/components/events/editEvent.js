import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getEventInstance } from "../../services/events";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";
import dayjs from "dayjs";
import useForm from "../../validation/events/useForm";
import validate from "../../validation/events/validateInfo";

const EditEvent = () => {
  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const usersRef = useRef();

  const submitForm = async () => {
    let postData = {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DD"),
      f_id: values.f_id.map((selectedObj) => selectedObj.id),
    };

    api
      .put(`events/edit/` + id + "/", postData)
      .then(() => {
        navigate("/events/" + id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/events/" + id);
        } else {
          alert("Error! Please check the values entered for any mistakes....");
        }
      });
  };

  const { handleChange, handleSubmit, values, errors, setValues } = useForm(
    submitForm,
    validate
  );

  const findMatchingUsers = (facultyList, userResponseArray) => {
    let faculty_selected = [];
    facultyList.forEach((name) => {
      faculty_selected.push(
        userResponseArray.filter((userObj) => userObj.name === name)[0]
      );
    });
    return faculty_selected;
  };

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
      getEventInstance(api, id)
        .then((res) => {
          if (mounted) {
            setValues({
              ...values,
              ["title"]: res.data.title,
              ["venue"]: res.data.venue,
              ["n_stud"]: res.data.n_stud,
              ["n_fac"]: res.data.n_fac,
              ["n_ind"]: res.data.n_ind,
              ["date"]: res.data.date,
              ["f_id"]: findMatchingUsers(res.data.f_id, usersRef.current),
            });
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
  }, [errors]);

  return (
    <Form
      values={values}
      handleChange={handleChange}
      users={users}
      handleSubmit={handleSubmit}
      errors={errors}
      type="Edit"
    />
  );
};

export default EditEvent;
