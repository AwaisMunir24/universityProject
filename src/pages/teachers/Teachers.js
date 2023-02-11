import axios from "axios";
import React, { useEffect, useState } from "react";
import NewInput from "../../components/newInput/Newinput";
import TeacherForm from "../../components/teachers/TeacherForm";
import TeacherTable from "../../components/Teachertable/TeacherTable";
import { BASE_URL } from "../../controller/config";
import "./Teachers.css";
const Teachers = () => {
  const [teacherLists, setTeacherLists] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [isBlock, setIsBlocked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [getCourse, setGetCourse] = useState([]);
  const [images, setImages] = useState([]);
  const [postTeacher, setPostTeacher] = useState({
    id: "",
    firstName: "",
    lastName: "",
    cnic: "",
    gender: "",
  });
  const [putData, setPutData] = useState({
    teacher: "",
    course: "",
  });
  // console.log(isBlock,"block")
  const addTeacher = (data) => {};

  const handleDelete = (id) => {
    console.log(id, "id get for teacher delete");
    axios
      .delete(`${BASE_URL}/api/teacher/${id}`)
      .then((resp) => {
        getTeacherData();
        return resp;
      })
      .catch((err) => console.log(err));
  };
  // handleDelete ----- End -------------------------------------------------------
  const getTeacherData = () => {
    axios
      .get(`${BASE_URL}/api/teacher`)
      .then((resp) => {
        if (resp?.data?.success) {
          setTeacherLists(resp.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getTeacherData ----- End -------------------------------------------------------

  const handleUpdateTeacher = (id) => {
    console.log(id, "id get by user");
    setEditForm(true);
    axios
      .get(`https://dark-gray-agouti-kit.cyclic.app/api/teacher/${id}`)
      .then((resp) => {
        console.log(resp?.data.results);
        return setPostTeacher({
          firstName: resp.data.results.firstName,
          cnic: resp.data.results.cnic,
          gender: resp.data.results.gender,
          lastName: resp.data.results.lastName,
          id: resp.data.results._id,
        });
      });
  };
  // handleUpdateTeacher ----- End -------------------------------------------------------

  // console.log(teacherLists.results);
  useEffect(() => {
    getTeacherData();
  }, []);
  function handleInput(e) {
    const newTeaching = { ...postTeacher };
    newTeaching[e.target.name] = e.target.value;
    setPostTeacher(newTeaching);
    console.log(e.target.name, e.target.value);
  }
  const handleFileSelect = (e) => {
    let arr = Object.values(e.target.files);
    console.log(arr[0]);

    setImages(arr[0]);
  };
  const _handleTab = () => {
    setEditForm(false);
  };
  const handleTeacher = () => {
    setEditForm(false);
  };
  var data = {};
  var data = {
    teacher: putData.teacher,
    course: putData.course,
  };

  const _handleCourseIdGet = (course, teacher) => {
    console.log("Course: ", course, " teacher: ", teacher);
    axios
      .put(`${BASE_URL}/api/teacher/assign-course`, {
        teacher,
        course, // course value
      })
      .then((resp) => {
        console.log(resp.data);
        // setPutData(resp.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const _handleCourseOPt = (e, id) => {
    console.log(e, id, "id Clg");
  };
  const _handleStatusUpdate = (e, id) => {
    axios
      .patch(`${BASE_URL}/api/teacher/block-unblock/${id}`, {
        blocked: e.target.value,
      })
      .then((resp) => {
        // console.log(resp?.data.data);
        getTeacherData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCourseData = () => {
    axios
      .get(`${BASE_URL}/api/course`)
      .then((resp) => {
        // console.log(resp?.data.data)
        setGetCourse(resp?.data.data);
      })
      .catch((err) => console.log(err));
  };
  var data = {
    firstName: postTeacher.firstName,
    lastName: postTeacher.lastName,
    cnic: postTeacher.cnic,
    gender: postTeacher.gender,
  };
  const _handleSaveTeacher = (id) => {
    console.log(id, "update");
    axios
      .put(
        `https://dark-gray-agouti-kit.cyclic.app/api/teacher/update/${id}`,
        data
      )
      .then((resp) => {
        console.log(resp.data);
        getTeacherData();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCourseData();
  }, []);
  // console.log(getCourse, "get course");
  const _handleFormTeacherSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <>
        <section className="teacher-section">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-lg-12">
                <h4>Teacher</h4>
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
                    onClick={_handleTab}
                  >
                    Add Teacher
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
                    View Teacher List
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
                  <TeacherForm
                    onSubmitTeacher={addTeacher}
                    getTeacherData={getTeacherData}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="ex1-tabs-2"
                  role="tabpanel"
                  aria-labelledby="ex1-tab-2"
                >
                  {editForm ? (
                    <>
                      <form onSubmit={handleTeacher} className="text-center">
                        <div className="row">
                          <div className="col-lg-12">
                            <h4>Update Teacher Data</h4>
                          </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                          <form onSubmit={_handleFormTeacherSubmit}>
                            <div className="col-lg-5 col-md-5 col-sm-12">
                              <div className="mb-4">
                                <label>First Name</label>
                                <NewInput
                                  type="text"
                                  name="firstName"
                                  className="form-control"
                                  value={postTeacher?.firstName}
                                  onChange={(e) => handleInput(e)}
                                />
                              </div>
                              <div className="mb-4">
                                <label>Cnic</label>
                                <NewInput
                                  type="number"
                                  className="form-control"
                                  value={postTeacher?.cnic}
                                  onChange={(e) => handleInput(e)}
                                  name="cnic"
                                />
                              </div>
                              <div className="mb-4">
                                <label>Qualification</label>
                                <NewInput
                                  type="text"
                                  className="form-control"
                                  value={postTeacher?.lastName}
                                  onChange={(e) => handleInput(e)}
                                  name="lastName"
                                />
                              </div>
                              <div className="mb-4">
                                <label> Gender</label>
                                <NewInput
                                  type="text"
                                  className="form-control"
                                  value={postTeacher?.gender}
                                  onChange={(e) => handleInput(e)}
                                  name="gender"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <button
                          className="teacher_button"
                          type="submit"
                          onClick={() => _handleSaveTeacher(postTeacher.id)}
                        >
                          Save Teacher Data
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="col-lg-12">
                      <table className="table teacher-tables">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Teacher Name</th>
                            <th scope="col">CNIC #</th>
                            <th scope="col">Qualification</th>
                            <th scope="col">Course</th>
                            <th scope="col" colSpan={2}>
                              Status
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {teacherLists?.results?.map((e, idx) => {
                            return (
                              <TeacherTable
                                key={idx}
                                id={e._id}
                                idx={idx + 1}
                                teacherprofile={e.image}
                                teachername={e.firstName}
                                cnic={e.cnic}
                                qualification={e.gender}
                                course={e.lastName}
                                isBlocked={e.blocked}
                                courseList={getCourse}
                                putData={e.courses[0]}
                                pressDlt={(id) => handleDelete(id)}
                                _handleUpdate={(id) => handleUpdateTeacher(id)}
                                _handleCourseSelection={(e, id) =>
                                  _handleCourseIdGet(e, id)
                                }
                                _handleCourseOption={_handleCourseOPt}
                                _handleStatus={(e, id) =>
                                  _handleStatusUpdate(e, id)
                                }
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
              {/* <!-- Tabs content --> */}
            </div>
          </div>
        </section>
      </>
    </>
  );
};
export default Teachers;
