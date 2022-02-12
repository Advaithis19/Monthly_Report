import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getGrantInstance } from "../../services/grants";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";

const EditGrant = () => {
  const initialFormData = Object.freeze({
    title: "",
    agency: "",
    sanc_amt: "",
    year: 2022,
    remarks: "",
    slug: "",
    PI: "",
    CO_PI: "",
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
      getGrantInstance(api, id)
        .then((res) => {
          if (mounted) {
            updateFormData({
              ...formData,
              ["title"]: res.data.title,
              ["agency"]: res.data.agency,
              ["sanc_amt"]: res.data.sanc_amt,
              ["year"]: res.data.year,
              ["remarks"]: res.data.remarks,
              ["slug"]: res.data.slug,
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
    postData.append("agency", formData.agency);
    postData.append("sanc_amt", formData.sanc_amt);
    postData.append("year", formData.year);
    postData.append("remarks", formData.remarks);
    postData.append("slug", formData.slug);
    postData.append("PI", formData.PI);
    postData.append("CO_PI", formData.CO_PI);

    api
      .put(`grants/edit/` + id + "/", postData)
      .then(() => {
        navigate("/grants/" + id);
        // window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/grants/" + id);
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

export default EditGrant;
