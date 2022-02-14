import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getProposalInstance } from "../../services/proposals";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";
import useForm from "../../validation/proposals/useForm";
import validate from "../../validation/proposals/validateInfo";

const EditProposal = () => {
  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const usersRef = useRef();

  const submitForm = async (e) => {
    // console.log(values);
    let postData = new FormData();
    postData.append("title", values.title);
    postData.append("submitted_to", values.submitted_to);
    postData.append("budg_amt", values.budg_amt);
    postData.append("status", values.status);
    postData.append("PI", values.PI);
    postData.append("CO_PI", values.CO_PI);

    api
      .put(`proposals/edit/` + id + "/", postData)
      .then(() => {
        navigate("/proposals/" + id);
        // window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/proposals/" + id);
        } else {
          alert("Error! Please check the values entered for any mistakes....");
        }
      });
  };

  const { handleChange, handleSubmit, values, errors, setValues } = useForm(
    submitForm,
    validate
  );

  const findMatchingUser = (userInstance, userResponseArray) => {
    return userResponseArray.filter((userResponseInstance) => {
      return userInstance === userResponseInstance.label;
    })[0].value;
  };

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getUsers(api)
        .then((response) => {
          if (mounted) {
            usersRef.current = response.data.map((user) => {
              return {
                label: user.first_name + " " + user.last_name,
                value: user.id,
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
      getProposalInstance(api, id)
        .then((res) => {
          if (mounted) {
            setValues({
              ...values,
              ["title"]: res.data.title,
              ["submitted_to"]: res.data.submitted_to,
              ["budg_amt"]: res.data.budg_amt,
              ["status"]: res.data.status,
              ["PI"]: findMatchingUser(res.data.PI, usersRef.current),
              ["CO_PI"]: findMatchingUser(res.data.CO_PI, usersRef.current),
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

export default EditProposal;
