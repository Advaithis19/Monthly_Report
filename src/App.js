import React from "react";
// import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/header";
// import Footer from "./components/footer";
import Grants from "./components/grants/grants";
import GrantDetail from "./components/grants/grantDetail";
import EditGrant from "./components/grants/editGrant";
import CreateGrant from "./components/grants/createGrant";
import SignIn from "./components/auth/login";
import SignUp from "./components/auth/register";
import Logout from "./components/auth/logout";
import PrivateOutlet from "./utils/private";
import "bootstrap/dist/css/bootstrap.min.css";
// import ActivateAccount from "./components/auth/activateAccount";
import GrantsHome from "./components/grants/grantsHome";
import FilteredGrants from "./components/grants/filteredGrants";
import PublicationsHome from "./components/publications/publicationsHome";
import Publications from "./components/publications/publicationFiller";
import FilteredPublications from "./components/publications/filteredPublications";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateOutlet />}>
            {/* grants routes */}
            <Route path="/grants" element={<GrantsHome />}>
              <Route index element={<Grants />} />
              <Route
                path="filter/date/:start_date/:end_date"
                element={<FilteredGrants />}
              />
            </Route>
            <Route path="/grants/:id" element={<GrantDetail />} />
            <Route path="/grants/create" element={<CreateGrant />} />
            <Route path="/grants/edit/:id" element={<EditGrant />} />

            {/* publication route */}
            <Route path="/publications" element={<PublicationsHome />}>
              <Route index element={<Publications />} />
              <Route
                path="filter/year/:start_year/:end_year"
                element={<FilteredPublications />}
              />
            </Route>
          </Route>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/logout" element={<Logout />} />

          {/* for password reset */}
          {/* <Route
            path="/accounts/activate/:uid/:token"
            element={<ActivateAccount />}
          /> */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
