import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

const CreateTalk = () => {
  let api = useAxios();
  api.defaults.xsrfCookieName = "csrftoken";
  api.defaults.xsrfHeaderName = "X-CSRFToken";

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    topic: "",
    venue: "",
    n_stud: "",
    n_fac: "",
    n_ind: "",
    slug: "",
    f_id: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [date, setDate] = useState(new Date());
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
    postData.append("topic", formData.topic);
    postData.append("venue", formData.venue);
    postData.append("n_stud", formData.n_stud);
    postData.append("n_fac", formData.n_fac);
    postData.append("n_ind", formData.n_ind);
    postData.append("slug", formData.slug);
    postData.append("date", dayjs(date).format("YYYY-MM-DD"));
    postData.append("f_id", formData.f_id);

    api
      .post(`talks/create/`, postData)
      .then(() => {
        navigate("/reports/talks/");
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
      users={users}
      onSubmit={onSubmit}
      type="Create"
    />
  );
};

export default CreateTalk;
