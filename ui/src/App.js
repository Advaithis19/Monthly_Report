import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/header";
import Footer from "./components/footer";

import SignIn from "./components/auth/login";
import SignUp from "./components/auth/register";
import PrivateOutlet from "./utils/private";
import Profile from "./components/profile";

import Dashboard from "./components/dashboard";
import Home from "./components/home";
// publications
import Publications from "./components/publications/publicationFiller";
import FilteredPublications from "./components/publications/filteredPublications";

// grants
import FilteredGrants from "./components/grants/filteredGrants";
import Grants from "./components/grants/grants";
import GrantDetail from "./components/grants/grantDetail";
import EditGrant from "./components/grants/editGrant";
import CreateGrant from "./components/grants/createGrant";

// events
import FilteredEvents from "./components/events/filteredEvents";
import Events from "./components/events/events";
import EventDetail from "./components/events/eventDetail";
import EditEvent from "./components/events/editEvent";
import CreateEvent from "./components/events/createEvent";

// proposals
import FilteredProposals from "./components/proposals/filteredProposals";
import Proposals from "./components/proposals/proposals";
import ProposalDetail from "./components/proposals/proposalDetail";
import EditProposal from "./components/proposals/editProposal";
import CreateProposal from "./components/proposals/createProposal";

// consultancies
import FilteredConsultancies from "./components/consultancies/filteredConsultancies";
import Consultancies from "./components/consultancies/consultancies";
import ConsultancyDetail from "./components/consultancies/consultancyDetail";
import EditConsultancy from "./components/consultancies/editConsultancy";
import CreateConsultancy from "./components/consultancies/createConsultancy";

// workshops
import FilteredWorkshops from "./components/workshops/filteredWorkshops";
import Workshops from "./components/workshops/workshops";
import WorkshopDetail from "./components/workshops/workshopDetail";
import EditWorkshop from "./components/workshops/editWorkshop";
import CreateWorkshop from "./components/workshops/createWorkshop";

// lectures
import FilteredLectures from "./components/lectures/filteredLectures";
import Lectures from "./components/lectures/lectures";
import LectureDetail from "./components/lectures/lectureDetail";
import EditLecture from "./components/lectures/editLecture";
import CreateLecture from "./components/lectures/createLecture";

// talks
import FilteredTalks from "./components/talks/filteredTalks";
import Talks from "./components/talks/talks";
import TalkDetail from "./components/talks/talkDetail";
import EditTalk from "./components/talks/editTalk";
import CreateTalk from "./components/talks/createTalk";

// achievements
import FilteredAchievements from "./components/achievements/filteredAchievements";
import Achievements from "./components/achievements/achievements";
import AchievementDetail from "./components/achievements/achievementDetail";
import EditAchievement from "./components/achievements/editAchievement";
import CreateAchievement from "./components/achievements/createAchievement";

// conferences
import FilteredConferences from "./components/conferences/filteredConferences";
import Conferences from "./components/conferences/conferences";
import ConferenceDetail from "./components/conferences/conferenceDetail";
import EditConference from "./components/conferences/editConference";
import CreateConference from "./components/conferences/createConference";

// patents
import FilteredPatents from "./components/patents/filteredPatents";
import Patents from "./components/patents/patents";
import PatentDetail from "./components/patents/patentDetail";
import EditPatent from "./components/patents/editPatent";
import CreatePatent from "./components/patents/createPatent";

// activities
import FilteredActivities from "./components/activities/filteredActivities";
import Activities from "./components/activities/activities";
import ActivityDetail from "./components/activities/activityDetail";
import EditActivity from "./components/activities/editActivity";
import CreateActivity from "./components/activities/createActivity";

// books
import FilteredBooks from "./components/books/filteredBooks";
import Books from "./components/books/books";
import BookDetail from "./components/books/bookDetail";
import EditBook from "./components/books/editBook";
import CreateBook from "./components/books/createBook";

// visits
import FilteredVisits from "./components/visits/filteredVisits";
import Visits from "./components/visits/visits";
import VisitDetail from "./components/visits/visitDetail";
import EditVisit from "./components/visits/editVisit";
import CreateVisit from "./components/visits/createVisit";

// mous
import FilteredMous from "./components/mous/filteredMous";
import Mous from "./components/mous/mous";
import MouDetail from "./components/mous/mouDetail";
import EditMou from "./components/mous/editMou";
import CreateMou from "./components/mous/createMou";

// memberships
import FilteredMemberships from "./components/memberships/filteredMemberships";
import Memberships from "./components/memberships/memberships";
import MembershipDetail from "./components/memberships/membershipDetail";
import EditMembership from "./components/memberships/editMembership";
import CreateMembership from "./components/memberships/createMembership";

import { AuthProvider } from "./context/AuthContext";

// date provider
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import LoadingIndicator from "./utils/loadingIndicator";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Router>
          <AuthProvider>
            <Navbar />
            <LoadingIndicator />

            <div className="min-h-[100vh] pt-5 z-0">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Navigate replace to="/home" />}
                />

                <Route path="/" element={<PrivateOutlet />}>
                  <Route exact path="home" element={<Dashboard />} />
                  <Route path="reports" element={<Home />}>
                    {/* grants */}
                    <Route path="grants/" element={<Outlet />}>
                      <Route index element={<Grants />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredGrants />}
                      />
                    </Route>

                    {/* events */}
                    <Route path="events/" element={<Outlet />}>
                      <Route index element={<Events />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredEvents />}
                      />
                    </Route>

                    {/* proposals */}
                    <Route path="proposals/" element={<Outlet />}>
                      <Route index element={<Proposals />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredProposals />}
                      />
                    </Route>

                    {/* consultancies */}
                    <Route path="consultancies/" element={<Outlet />}>
                      <Route index element={<Consultancies />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredConsultancies />}
                      />
                    </Route>

                    {/* workshops */}
                    <Route path="workshops/" element={<Outlet />}>
                      <Route index element={<Workshops />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredWorkshops />}
                      />
                    </Route>

                    {/* lectures */}
                    <Route path="lectures/" element={<Outlet />}>
                      <Route index element={<Lectures />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredLectures />}
                      />
                    </Route>

                    {/* talks */}
                    <Route path="talks/" element={<Outlet />}>
                      <Route index element={<Talks />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredTalks />}
                      />
                    </Route>

                    {/* achievements */}
                    <Route path="achievements/" element={<Outlet />}>
                      <Route index element={<Achievements />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredAchievements />}
                      />
                    </Route>

                    {/* conferences */}
                    <Route path="conferences/" element={<Outlet />}>
                      <Route index element={<Conferences />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredConferences />}
                      />
                    </Route>

                    {/* patents */}
                    <Route path="patents/" element={<Outlet />}>
                      <Route index element={<Patents />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredPatents />}
                      />
                    </Route>

                    {/* activities */}
                    <Route path="activities/" element={<Outlet />}>
                      <Route index element={<Activities />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredActivities />}
                      />
                    </Route>

                    {/* books */}
                    <Route path="books/" element={<Outlet />}>
                      <Route index element={<Books />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredBooks />}
                      />
                    </Route>

                    {/* visits */}
                    <Route path="industrial_visits/" element={<Outlet />}>
                      <Route index element={<Visits />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredVisits />}
                      />
                    </Route>

                    {/* mous */}
                    <Route path="mous/" element={<Outlet />}>
                      <Route index element={<Mous />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredMous />}
                      />
                    </Route>

                    {/* memberships */}
                    <Route path="memberships/" element={<Outlet />}>
                      <Route index element={<Memberships />} />
                      <Route
                        path="filter/date/:start_date/:end_date"
                        element={<FilteredMemberships />}
                      />
                    </Route>

                    {/* publications */}
                    <Route path="publications/" element={<Outlet />}>
                      <Route index element={<Publications />} />
                      <Route
                        path="filter/year/:start_year/:end_year"
                        element={<FilteredPublications />}
                      />
                    </Route>
                  </Route>

                  {/* grants crud routes */}
                  <Route path="/grants/:id" element={<GrantDetail />} />
                  <Route path="/grants/create" element={<CreateGrant />} />
                  <Route path="/grants/edit/:id" element={<EditGrant />} />

                  {/* event crud routes */}
                  <Route path="/events/:id" element={<EventDetail />} />
                  <Route path="/events/create" element={<CreateEvent />} />
                  <Route path="/events/edit/:id" element={<EditEvent />} />

                  {/* proposal crud routes */}
                  <Route path="/proposals/:id" element={<ProposalDetail />} />
                  <Route
                    path="/proposals/create"
                    element={<CreateProposal />}
                  />
                  <Route
                    path="/proposals/edit/:id"
                    element={<EditProposal />}
                  />

                  {/* consultancy crud routes */}
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

                  {/* workshop crud routes */}
                  <Route path="/workshops/:id" element={<WorkshopDetail />} />
                  <Route
                    path="/workshops/create"
                    element={<CreateWorkshop />}
                  />
                  <Route
                    path="/workshops/edit/:id"
                    element={<EditWorkshop />}
                  />

                  {/* lecture crud routes */}
                  <Route path="/lectures/:id" element={<LectureDetail />} />
                  <Route path="/lectures/create" element={<CreateLecture />} />
                  <Route path="/lectures/edit/:id" element={<EditLecture />} />

                  {/* talk crud routes */}
                  <Route path="/talks/:id" element={<TalkDetail />} />
                  <Route path="/talks/create" element={<CreateTalk />} />
                  <Route path="/talks/edit/:id" element={<EditTalk />} />

                  {/* achievement crud routes */}
                  <Route
                    path="/achievements/:id"
                    element={<AchievementDetail />}
                  />
                  <Route
                    path="/achievements/create"
                    element={<CreateAchievement />}
                  />
                  <Route
                    path="/achievements/edit/:id"
                    element={<EditAchievement />}
                  />

                  {/* conference crud routes */}
                  <Route
                    path="/conferences/:id"
                    element={<ConferenceDetail />}
                  />
                  <Route
                    path="/conferences/create"
                    element={<CreateConference />}
                  />
                  <Route
                    path="/conferences/edit/:id"
                    element={<EditConference />}
                  />

                  {/* patent crud routes */}
                  <Route path="/patents/:id" element={<PatentDetail />} />
                  <Route path="/patents/create" element={<CreatePatent />} />
                  <Route path="/patents/edit/:id" element={<EditPatent />} />

                  {/* activity crud routes */}
                  <Route path="/activities/:id" element={<ActivityDetail />} />
                  <Route
                    path="/activities/create"
                    element={<CreateActivity />}
                  />
                  <Route
                    path="/activities/edit/:id"
                    element={<EditActivity />}
                  />

                  {/* book crud routes */}
                  <Route path="/books/:id" element={<BookDetail />} />
                  <Route path="/books/create" element={<CreateBook />} />
                  <Route path="/books/edit/:id" element={<EditBook />} />

                  {/* visit crud routes */}
                  <Route
                    path="/industrial_visits/:id"
                    element={<VisitDetail />}
                  />
                  <Route
                    path="/industrial_visits/create"
                    element={<CreateVisit />}
                  />
                  <Route
                    path="/industrial_visits/edit/:id"
                    element={<EditVisit />}
                  />

                  {/* mou crud routes */}
                  <Route path="/mous/:id" element={<MouDetail />} />
                  <Route path="/mous/create" element={<CreateMou />} />
                  <Route path="/mous/edit/:id" element={<EditMou />} />

                  {/* membership crud routes */}
                  <Route
                    path="/memberships/:id"
                    element={<MembershipDetail />}
                  />
                  <Route
                    path="/memberships/create"
                    element={<CreateMembership />}
                  />
                  <Route
                    path="/memberships/edit/:id"
                    element={<EditMembership />}
                  />
                </Route>
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
              </Routes>
            </div>

            <Footer />
          </AuthProvider>
        </Router>
      </LocalizationProvider>
    </div>
  );
}

export default App;
