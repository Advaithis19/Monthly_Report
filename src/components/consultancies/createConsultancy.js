import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

const CreateConsultancy = () => {
  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    title: "",
    fund_agency: "",
    rec_amt: "",
    slug: "",
    f_id: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
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
                  label: user.first_name + " " + user.last_name,
                  value: user.id,
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
    let postData = new FormData();
    postData.append("title", formData.title);
    postData.append("fund_agency", formData.fund_agency);
    postData.append("rec_amt", formData.rec_amt);
    postData.append("slug", formData.slug);
    postData.append("f_id", formData.f_id);
    api
      .post(`consultancies/create/`, postData)
      .then(() => {
        navigate("/consultancies/");
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
      users={users}
      onSubmit={onSubmit}
      type="Create"
    />
  );
};

export default CreateConsultancy;
