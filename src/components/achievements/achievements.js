import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getAchievements } from "../../services/achievements";
import { trackPromise } from "react-promise-tracker";

const Achievements = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [achievements, setAchievements] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getAchievements(api)
        .then((response) => {
          if (mounted) {
            setAchievements(response.data);
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

  if (!achievements || achievements.length === 0)
    return (
      <div>
        <p className="text-xl text-bold">
          Can not find any achievements, sorry
        </p>
      </div>
    );

  return <Table achievements={achievements} />;
};

export default Achievements;
