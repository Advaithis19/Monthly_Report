import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getConsultancyInstance } from "../../services/consultancies";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";
import useForm from "../../validation/consultancies/useForm";
import validate from "../../validation/consultancies/validateInfo";

const EditConsultancy = () => {
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
    postData.append("fund_agency", values.fund_agency);
    postData.append("rec_amt", values.rec_amt);
    postData.append("f_id", values.f_id);

    api
      .put(`consultancies/edit/` + id + "/", postData)
      .then(() => {
        navigate("/consultancies/" + id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/consultancies/" + id);
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
      getConsultancyInstance(api, id)
        .then((res) => {
          if (mounted) {
            setValues({
              ...values,
              ["title"]: res.data.title,
              ["fund_agency"]: res.data.fund_agency,
              ["rec_amt"]: res.data.rec_amt,
              ["f_id"]: findMatchingUser(res.data.f_id, usersRef.current),
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

export default EditConsultancy;
