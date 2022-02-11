import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/header";
import Footer from "./components/footer";

import SignIn from "./components/auth/login";
import SignUp from "./components/auth/register";
import Logout from "./components/auth/logout";
import PrivateOutlet from "./utils/private";
import Profile from "./components/profile";

// publications
import PublicationsHome from "./components/publications/publicationsHome";
import Publications from "./components/publications/publicationFiller";
import FilteredPublications from "./components/publications/filteredPublications";

// grants
import FilteredGrants from "./components/grants/filteredGrants";
import GrantsHome from "./components/grants/grantsHome";
import Grants from "./components/grants/grants";
import GrantDetail from "./components/grants/grantDetail";
import EditGrant from "./components/grants/editGrant";
import CreateGrant from "./components/grants/createGrant";

// events
import FilteredEvents from "./components/events/filteredEvents";
import EventsHome from "./components/events/eventsHome";
import Events from "./components/events/events";
import EventDetail from "./components/events/eventDetail";
import EditEvent from "./components/events/editEvent";
import CreateEvent from "./components/events/createEvent";

// proposals
import FilteredProposals from "./components/proposals/filteredProposals";
import ProposalsHome from "./components/proposals/proposalsHome";
import Proposals from "./components/proposals/proposals";
import ProposalDetail from "./components/proposals/proposalDetail";
import EditProposal from "./components/proposals/editProposal";
import CreateProposal from "./components/proposals/createProposal";

// consultancies
import FilteredConsultancies from "./components/consultancies/filteredConsultancies";
import ConsultanciesHome from "./components/consultancies/consultanciesHome";
import Consultancies from "./components/consultancies/consultancies";
import ConsultancyDetail from "./components/consultancies/consultancyDetail";
import EditConsultancy from "./components/consultancies/editConsultancy";
import CreateConsultancy from "./components/consultancies/createConsultancy";

// workshops
import FilteredWorkshops from "./components/workshops/filteredWorkshops";
import WorkshopsHome from "./components/workshops/workshopsHome";
import Workshops from "./components/workshops/workshops";
import WorkshopDetail from "./components/workshops/workshopDetail";
import EditWorkshop from "./components/workshops/editWorkshop";
import CreateWorkshop from "./components/workshops/createWorkshop";

import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";

// date provider
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Router>
          <AuthProvider>
            <AlertProvider>
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

                  {/* event routes */}
                  <Route path="/events" element={<EventsHome />}>
                    <Route index element={<Events />} />
                    <Route
                      path="filter/date/:start_date/:end_date"
                      element={<FilteredEvents />}
                    />
                  </Route>
                  <Route path="/events/:id" element={<EventDetail />} />
                  <Route path="/events/create" element={<CreateEvent />} />
                  <Route path="/events/edit/:id" element={<EditEvent />} />

                  {/* proposal routes */}
                  <Route path="/proposals" element={<ProposalsHome />}>
                    <Route index element={<Proposals />} />
                    <Route
                      path="filter/date/:start_date/:end_date"
                      element={<FilteredProposals />}
                    />
                  </Route>
                  <Route path="/proposals/:id" element={<ProposalDetail />} />
                  <Route
                    path="/proposals/create"
                    element={<CreateProposal />}
                  />
                  <Route
                    path="/proposals/edit/:id"
                    element={<EditProposal />}
                  />

                  {/* consultancy routes */}
                  <Route path="/consultancies" element={<ConsultanciesHome />}>
                    <Route index element={<Consultancies />} />
                    <Route
                      path="filter/date/:start_date/:end_date"
                      element={<FilteredConsultancies />}
                    />
                  </Route>
                  <Route
                    path="/consultancies/:id"
                    element={<ConsultancyDetail />}
                  />
                  <Route
                    path="/consultancies/create"
                    element={<CreateConsultancy />}
                  />
                  <Route
                    path="/consultancies/edit/:id"
                    element={<EditConsultancy />}
                  />

                  {/* workshop routes */}
                  <Route path="/workshops" element={<WorkshopsHome />}>
                    <Route index element={<Workshops />} />
                    <Route
                      path="filter/date/:start_date/:end_date"
                      element={<FilteredWorkshops />}
                    />
                  </Route>
                  <Route path="/workshops/:id" element={<WorkshopDetail />} />
                  <Route
                    path="/workshops/create"
                    element={<CreateWorkshop />}
                  />
                  <Route
                    path="/workshops/edit/:id"
                    element={<EditWorkshop />}
                  />

                  {/* publication route */}
                  <Route path="/publications" element={<PublicationsHome />}>
                    <Route index element={<Publications />} />
                    <Route
                      path="filter/year/:start_year/:end_year"
                      element={<FilteredPublications />}
                    />
                  </Route>
                </Route>
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
              <Footer />
            </AlertProvider>
          </AuthProvider>
        </Router>
      </LocalizationProvider>
    </div>
  );
}

export default App;
