import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Users from "../../components/user/Users";
import { ToastContainer, toast } from "react-toastify";
import StudentForm, {
  studentList,
} from "../../components/studentform/StudentForm";
import "./Students.css";

import NewInput from "../../components/newInput/Newinput";
const Students = () => {
  const [studentData, setStudentData] = useState({
    id: "",
    studentName: "",
    father: "",
    cnic: "",
    address: "",
    age: "",
    regId: "",
  });
  const [studentsRecord, setStudentsRecord] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [editStudentForm, setStudentForm] = useState(false);

  // console.log(studentsRecord.results, "students");
  const getStudentData = () => {
    axios
      .get("https://dark-gray-agouti-kit.cyclic.app/api/student")
      .then((resp) => {
        if (resp?.data?.results) {
          setStudentsRecord(resp.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getStudentData();
  }, []);
  const _handleDeleteStudent = (id) => {
    console.log(id, "get id for delete student");
    axios
      .delete(`https://dark-gray-agouti-kit.cyclic.app/api/student/${id}`)
      .then((resp) => {
        getStudentData();
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const _handleUpdateStudent = (id) => {
    console.log(id, "update student form ");
    setStudentForm(true);
    axios
      .get(`https://dark-gray-agouti-kit.cyclic.app/api/student/${id}`)
      .then((resp) => {
        // console.log(resp.data.results, "data");
        return setStudentData({
          id: resp.data.results._id,
          studentName: resp.data.results.firstName,
          father: resp.data.results.lastName,
          cnic: resp.data.results.cnic,
          address: resp.data.results.address,
          age: resp.data.results.dob,
        });
      });
  };
  var data = {
    firstName: studentData.studentName,
    lastName: studentData.father,
    cnic: studentData.cnic,
    address: studentData.address,
    dob: studentData.age,
  };
  const handleSubmitingStudentRecord = (e) => {
    e.preventDefault();
    setStudentForm(false);
  };
  const saveStudentUpdate = (id) => {
    console.log(id, "sud");
    axios
      .put(`https://dark-gray-agouti-kit.cyclic.app/api/student/${id}`, data)
      .then((resp) => {
        if(resp.data.success){
          console.log(resp.data);
          getStudentData();
          setStudentData(resp.data);
        }else{
          setStudentForm(false);
          toast.warning(`${resp.data.msg}`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
       
      })
      .catch((err) => console.log(err));
  };
  const handleStudentTabs = () => {
    setStudentForm(false);
  };
  function handleInput(e) {
    const newStudentData = { ...studentData };
    newStudentData[e.target.name] = e.target.value;
    setStudentData(newStudentData);
  }
  const _handleStatusUpdate = (e, id) => {
    // console.log(e, id, "student");
    axios
      .put(`https://dark-gray-agouti-kit.cyclic.app/api/student/block/${id}`, {
        blocked: e.target.value,
      })
      .then((resp) => {
        console.log(resp.data, "update student");
        getStudentData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <section>
        <div className="student_records">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-lg-12">
                <h4>Students</h4>
              </div>
            </div>
            <div className="row">
              {/* <!-- Tabs navs --> */}
              <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    id="ex1-tab-1"
                    data-mdb-toggle="tab"
                    href="#ex1-tabs-1"
                    role="tab"
                    aria-controls="ex1-tabs-1"
                    aria-selected="true"
                    onClick={handleStudentTabs}
                  >
                    Add Student
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link"
                    id="ex1-tab-2"
                    data-mdb-toggle="tab"
                    href="#ex1-tabs-2"
                    role="tab"
                    aria-controls="ex1-tabs-2"
                    aria-selected="false"
                  >
                    View Student Lists
                  </a>
                </li>
              </ul>
              {/* <!-- Tabs navs --> */}

              {/* <!-- Tabs content --> */}
              <div className="tab-content" id="ex1-content">
                <div
                  className="tab-pane fade show active"
                  id="ex1-tabs-1"
                  role="tabpanel"
                  aria-labelledby="ex1-tab-1"
                >
                  <StudentForm />
                </div>
                <div
                  className="tab-pane fade"
                  id="ex1-tabs-2"
                  role="tabpanel"
                  aria-labelledby="ex1-tab-2"
                >
                  {editStudentForm ? (
                    <>
                      <form
                        onSubmit={handleSubmitingStudentRecord}
                        className="text-center"
                      >
                        <div className="row mt-3 justify-content-center">
                          <div className="col-lg-5 col-md-5 col-sm-12 text-start">
                            <div className="mb-3">
                              <label>Student Name</label>
                              <NewInput
                                type="text"
                                className="form-control"
                                // labelName="Student Name"
                                value={studentData.studentName}
                                onChange={(e) => handleInput(e)}
                                name="studentName"
                              />
                            </div>

                            <div className="mb-3">
                              <label>Cnic</label>
                              <NewInput
                                type="number"
                                className="form-control"
                                // labelName="CNIC"
                                value={studentData.cnic}
                                onChange={(e) => handleInput(e)}
                                name="cnic"
                              />
                            </div>
                          
                            {/* <div className="mb-3">
                              <NewInput
                                type="text"
                                className="form-control"
                                labelName="Student Id"
                                value={studentData.regId}
                                onChange={(e) => handleInput(e)}
                                name="regId"
                              />
                            </div> */}
                          </div>
                          <div className="col-lg-5 col-md-5 col-sm-12 text-start">
                            <div className="mb-3">
                              <label>Father's Name</label>
                              <NewInput
                                type="text"
                                className="form-control"
                                // labelName="Father's Name"
                                value={studentData.father}
                                onChange={(e) => handleInput(e)}
                                name="father"
                              />
                            </div>
                            <div className="mb-3">
                              <label>Address</label>
                              <NewInput
                                type="text"
                                className="form-control"
                                // labelName="Address"
                                value={studentData.address}
                                onChange={(e) => handleInput(e)}
                                name="address"
                              />
                            </div>
                            {/* <div className="mb-3">
                              <NewInput
                                type="file"
                                // className="form-control"
                                // onChange={handleFileSelect}
                                name="files"
                              />
                            </div> */}
                            {/* <div className="mb-3">
                              <label>Age</label>
                              <NewInput
                                type="number"
                                className="form-control"
                                // labelName="Age"
                                value={studentData.age}
                                onChange={(e) => handleInput(e)}
                                name="age"
                              />
                            </div> */}
                            <div className="mb-3">
                              {/* <NewInput
                type="text"
                className="form-control"
                labelName="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
                            </div>
                          </div>
                        </div>
                     
                      
                    
                          <button className="student_button" onClick={() => saveStudentUpdate(studentData.id)}>
                            Save Student Record
                          </button>
                    
                      </form>
                    </>
                  ) : (
                    <>
                      <div className="col-lg-12">
                        <table className="table ">
                          <thead>
                            <tr>
                              <th>id</th>
                              <th>Student Name</th>
                              <th>Father Name</th>
                              <th>CNIC</th>
                              <th>Address</th>
                              <th>Age</th>
                              <th>Student Id</th>
                              <th colSpan={2}>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentsRecord?.results?.map((e, idx) => {
                              // console.log(e)
                              return (
                                <Users
                                  key={idx}
                                  id={e._id}
                                  idx={idx + 1}
                                  studentName={e.firstName}
                                  fatherName={e.lastName}
                                  cnic={e.cnic}
                                  address={e.address}
                                  age={e.dob}
                                  isBlocked={e.blocked}
                                  studentId={e.regNumber}
                                  password={e.password}
                                  pressDltStudent={(id) =>
                                    _handleDeleteStudent(id)
                                  }
                                  _handleUpdateStudent={(id) =>
                                    _handleUpdateStudent(id)
                                  }
                                  _handleStatus={(e, id) =>
                                    _handleStatusUpdate(e, id)
                                  }
                                />
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* <!-- Tabs content --> */}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
export default Students;
