import React, { useState, useEffect, useRef } from "react";
import useAxios from "../../utils/axios";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getWorkshopInstance } from "../../services/workshops";
import { getUsers } from "../../services/users";
import { trackPromise } from "react-promise-tracker";
import dayjs from "dayjs";

const EditWorkshop = () => {
  const initialFormData = Object.freeze({
    event_name: "",
    venue: "",
    slug: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [date, setDate] = useState(new Date());
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
      getWorkshopInstance(api, id)
        .then((res) => {
          if (mounted) {
            updateFormData({
              ...formData,
              ["event_name"]: res.data.event_name,
              ["venue"]: res.data.venue,
              ["slug"]: res.data.slug,
            });
            setDate(dayjs(res.data.date));
            setFacultySelected(
              findMatchingUsers(res.data.u_id, usersRef.current)
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
  }, [setUsers, updateFormData, setDate, setFacultySelected]);

  const findMatchingUsers = (facultyList, userResponseArray) => {
    console.log("facultyList", facultyList);
    console.log("userResponseArray", userResponseArray);
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
      date: dayjs(date).format("YYYY-MM-DD"),
      u_id: facultySelected.map((selectedObj) => selectedObj.id),
    };

    api
      .put(`workshops/edit/` + id + "/", postData)
      .then(() => {
        navigate("/reports/workshops/" + id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Authentication has expired! Please re-login");
          navigate("/logout");
        } else if (error.response.status === 403) {
          alert("You do not have permission to perform this action!");
          navigate("/reports/workshops/" + id);
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

export default EditWorkshop;
