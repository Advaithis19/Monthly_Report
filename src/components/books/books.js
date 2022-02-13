import React, { useState, useEffect } from "react";
import useAxios from "../../utils/axios";
import Table from "./listTable";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../../services/books";
import { trackPromise } from "react-promise-tracker";

const Books = () => {
  let navigate = useNavigate();
  let api = useAxios();

  let [books, setBooks] = useState([]);

  useEffect(() => {
    let mounted = true;
    trackPromise(
      getBooks(api)
        .then((response) => {
          if (mounted) {
            setBooks(response.data);
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

  if (!books || books.length === 0)
    return (
      <div>
        <p className="text-xl text-bold">Can not find any books, sorry</p>
      </div>
    );

  return <Table books={books} />;
};

export default Books;
