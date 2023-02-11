import React, { Component, useEffect, useState } from "react";
import "./Report.css";
import ReportList from "../../components/reportsList/ReportList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CourseAttendanceTable from "../../components/courseAttendanceTable/CourseAttendanceTable";
const Report = () => {
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  const [tooglePage, setTooglePage] = useState(false);
  const [reports, setreports] = useState([]);
  console.log(attendance, "attendance");
  const _handleBackPage = () => {
    setTooglePage(!tooglePage);
  };
  const _handleBack = () => {
    setTooglePage(!tooglePage);
  };
  const _handleAttendance = (id) => {
    console.log(id, "resport course id called");
    setTooglePage(!tooglePage);
    // navigate("/courseattendance");
    axios
      .get(`https://dark-gray-agouti-kit.cyclic.app/api/attendence/${id}`)
      .then((resp) => {
        if (resp.data.results) {
          setAttendance(resp.data.results);
        } else {
          return "No data to display";
        }
        console.log(resp.data.results, "get attendance");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("https://dark-gray-agouti-kit.cyclic.app/api/course")
      .then((resp) => {
        console.log(resp.data.data);
        setreports(resp.data.data);
      });
    _handleAttendance();
  }, []);

  return (
    <>
      {tooglePage ? (
        <section>
          <div className="report_section">
            <div className="container-fluid">
              <div className="row mb-3">
                <div className="col-lg-12">
                  <h4>Reports</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Course title</th>
                        <th>Course Code</th>
                        <th>Subject Code</th>
                        <th>Credit Hours</th>
                        <th>Attendance Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((e, idx) => (
                        <ReportList
                          key={idx}
                          id={e._id}
                          idx={idx + 1}
                          courseTitle={e.title}
                          coursecode={e.courseCode}
                          subjectcode={e.subjectId.name}
                          credithour={e.creditHours}
                          handleCourseAttendance={(id) => _handleAttendance(id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="courseattendance_section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <h4>Course Attendance</h4>
                  <i
                    className="fas fa-angle-left"
                    onClick={_handleBackPage}
                  ></i>
                </div>
              </div>
              <div className="row justify-content-center">
              <div className="col-lg-3">
                  <input className="form-control" type="date"/>
              </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Student Name</th>
                        <th>Student Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.length > 0 ? (
                        attendance.map((e, idx) => {
                          return (
                            <CourseAttendanceTable
                              key={idx}
                              date={e.createdAt}
                              studentName={e.student.firstName}
                              regId={e.student.regNumber}
                            />
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4}>Nothing to Show</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Report;
