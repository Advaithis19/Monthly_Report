import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { useParams } from "react-router-dom";

const GrantDetail = () => {
  let [grant, setGrant] = useState(null);
  const { id } = useParams();

  let getGrant = async () => {
    let response = await axiosInstance.get("grants/" + id);
    if (response.status === 200) setGrant(response.data);
  };

  useEffect(() => {
    getGrant();
  }, [setGrant]);

  if (!grant || grant.length === 0)
    return <p>Can not find required grant, sorry</p>;
  return (
    <div>
      <p>{grant.title}</p>
      <p>{grant.agency}</p>
      <p>{grant.sanc_amt}</p>
    </div>
  );
};

export default GrantDetail;
