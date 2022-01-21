// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import CssBaseline from "@material-ui/core/CssBaseline";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import axios from "axios";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
// }));

// const PublicationDetail = () => {
//   let [publication, setPublication] = useState(null);
//   const { id } = useParams();

//   let getPublication = async () => {
//     axios
//       .get("http://shivampjt.pythonanywhere.com/publication/" + id)
//       .then((response) => {
//         setPublication(response.data);
//       })
//       .catch(() => {
//         alert("Something went wrong!");
//       });
//   };

//   useEffect(() => {
//     getPublication();
//   }, [setPublication]);

//   if (!publication || publication.length === 0)
//     return <p>Can not find required publication, sorry</p>;
//   return (
//     <div>
//       <p>{publication.Title}</p>
//       <p>{publication.Level}</p>
//       <p>
//         {publication.Month}/{publication.Year}
//       </p>
//       <p>{publication.ISSN}</p>
//     </div>
//   );
// };

// export default PublicationDetail;
