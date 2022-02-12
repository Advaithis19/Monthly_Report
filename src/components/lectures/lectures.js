import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getLectures } from "../../services/lectures";
import { trackPromise } from "react-promise-tracker";

const Lectures = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [lectures, setLectures] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getLectures(api)
        .then((response) => {
          if (mounted) {
            setLectures(response.data);
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

  if (!lectures || lectures.length === 0)
    return (
      <div>
        <p className="text-xl text-bold">Can not find any lectures, sorry</p>
      </div>
    );

  return <Table lectures={lectures} />;
};

export default Lectures;
