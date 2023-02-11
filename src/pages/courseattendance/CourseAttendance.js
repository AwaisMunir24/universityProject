import React, { Component, useEffect ,useContext} from "react";
import { RootContext } from "../../Routing/contextApi";
const CourseAttendance = () => {
  const { getCourseAtten } = useContext(RootContext);
  console.log(getCourseAtten,"get course atttttttttt")
  useEffect(() => {
    
  }, [])
  

  return (
    <>
      <section>
        <div className="courseattendance_section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h4>Course Attendance</h4>
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
                      <th className="text-end">Open </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CourseAttendance;
