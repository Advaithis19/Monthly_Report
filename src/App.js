import React from "react";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Grants from "./components/grants/grants";
import GrantDetail from "./components/grants/grantDetail";
import EditGrant from "./components/grants/editGrant";
import DeleteGrant from "./components/grants/deleteGrant";
import CreateGrant from "./components/grants/createGrant";
import SignIn from "./components/auth/login";
import SignUp from "./components/auth/register";
import Logout from "./components/auth/logout";
import PrivateOutlet from "./utils/private";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PrivateOutlet />}>
            <Route exact path="/grants" element={<Grants />} />
            <Route path="/grants/:id" element={<GrantDetail />} />
            <Route path="/grants/create" element={<CreateGrant />} />
            <Route path="/grants/edit/:id" element={<EditGrant />} />
            <Route path="/grants/delete/:id" element={<DeleteGrant />} />
          </Route>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
