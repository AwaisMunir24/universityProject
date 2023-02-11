import React, { useContext } from "react";
import Login from "../login/Login";
import Students from "../students/Students";
import Teachers from "../teachers/Teachers";
import Dashboard from "../dashboard/Dashboard";
import Course from "../course/Course";
import Report from "../report/Report";
import CourseAttendance from "../courseattendance/CourseAttendance";
import SideBar from "../../layout/sidebar/SideBar";
import { RootContext } from "../../Routing/contextApi";
import Header from "../../layout/header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const MainPage = ({ isAdmin, setIsAdmin }) => {
  const { user } = useContext(RootContext);

  const handleTogleUser = (value) => {
    setIsAdmin(value);
  };
  return (
    <Router>
      <Header isAdmin={isAdmin} setIsAdmin={handleTogleUser} />
      <div className="right_section">
        {user && <SideBar />}
        <Routes>
          {user ? (
            <>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/students" element={<Students />} />
              <Route exact path="/teachers" element={<Teachers />} />
              <Route exact path="/course" element={<Course />} />
              <Route exact path="/report" element={<Report />} />
              <Route
                exact
                path="/courseattendance"
                element={<CourseAttendance />}
              />
            </>
          ) : (
            <Route path="/" element={<Login role={"Admin"} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};
export default MainPage;
