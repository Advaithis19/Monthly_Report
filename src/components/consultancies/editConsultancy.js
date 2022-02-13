import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getConsultancyInstance } from "../../services/consultancies";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

const EditConsultancy = () => {
  const initialFormData = Object.freeze({
    title: "",
    fund_agency: "",
    rec_amt: "",
    slug: "",
    f_id: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

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
            updateFormData({
              ...formData,
              ["title"]: res.data.title,
              ["fund_agency"]: res.data.fund_agency,
              ["rec_amt"]: res.data.rec_amt,
              ["slug"]: res.data.slug,
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
  }, [setUsers, updateFormData]);

  const findMatchingUser = (userInstance, userResponseArray) => {
    return userResponseArray.filter((userResponseInstance) => {
      return userInstance === userResponseInstance.label;
    })[0].value;
  };

  const onSubmit = async (e) => {
    // console.log(formData);
    let postData = new FormData();
    postData.append("title", formData.title);
    postData.append("fund_agency", formData.fund_agency);
    postData.append("rec_amt", formData.rec_amt);
    postData.append("slug", formData.slug);
    postData.append("f_id", formData.f_id);

    api
      .put(`consultancies/edit/` + id + "/", postData)
      .then(() => {
        navigate("/reports/consultancies/" + id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/reports/consultancies/" + id);
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
      type="Edit"
    />
  );
};

export default EditConsultancy;
