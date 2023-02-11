import React, { Component, useEffect, useState } from "react";
import "./Course.css";
import CourseForm, { CourseList } from "../../components/courseForm/CourseForm";
import CourseListing from "../../components/courselist/CourseList";
import gettingCourseData, { courseDelete } from "../../controller/courseData";
import axios from "axios";
import NewInput from "../../components/newInput/Newinput";
const Course = () => {
  const [courselisting, setCourseListing] = useState([]);
  const [couseForm, setCourseForm] = useState(false);
  const [postCourse, setPostCourse] = useState({
    title: "",
    courseCode: "",
    creditHours: "",
    id: "",
    subjectId:"",
  });
  // console.log(courselisting, "courses");
  function _handleCourseInput(e) {
    const newCoureData = { ...postCourse };
    newCoureData[e.target.name] = e.target.value;
    setPostCourse(newCoureData);
  }
  // console.log(postCourse, "post course");

  const handleCourseDlt = (id) => {
    console.log(id, "course api dlt");
    axios
      .delete(`https://dark-gray-agouti-kit.cyclic.app/api/course/${id}`)
      .then((resp) => {
        getApiCourse();
        return resp;
      })
      .catch((resp) => {
        console.log(resp.data, "deleted");
      });
  };
  const getApiCourse = () => {
    axios
      .get("https://dark-gray-agouti-kit.cyclic.app/api/course")
      .then((resp) => {
        if (resp?.data?.success) {
          // console.log(resp.data)
          setCourseListing(resp.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getApiCourse();
  }, []);
  const _handleCourseUpdate = (id) => {
    setCourseForm(true);
    axios
      .get(`https://dark-gray-agouti-kit.cyclic.app/api/course/${id}`)
      .then((resp) => {
        console.log(resp.data.data, "data");
        return setPostCourse({
          title: resp.data.data.title,
          courseCode: resp.data.data.courseCode,
          creditHours: resp.data.data.creditHours,
          id: resp.data.data._id,
        });
      });
  };
  var data = {
    title: postCourse.title,
    courseCode: postCourse.courseCode,
    creditHours: postCourse.creditHours,
    subjectId: "635a7dc11eaef4f90524f618",
  };
  const handleCourseUpdeate = (e, id) => {
    e.preventDefault();
    console.log(e, id, "course");
  };
  const saveCourseForm = (id) => {
    setCourseForm(false);
    console.log(id, "updated form id");
    axios
      .put(`https://dark-gray-agouti-kit.cyclic.app/api/course/${id}`, data)
      .then((resp) => {
        setPostCourse(resp.data);
        getApiCourse();
      })
      .catch((err) => console.log(err));
  };
  const _handleCourseTab = () => {
    setCourseForm(false);
  };

  return (
    <>
      <section>
        <div className="course_section">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-lg-12">
                <h4>Course</h4>
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
                    onClick={_handleCourseTab}
                  >
                    Course
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
                    Course List
                  </a>
                </li>
              </ul>
              {/* <!-- Tabs navs -->  */}

              {/* <!-- Tabs content --> */}
              <div className="tab-content" id="ex1-content">
                <div
                  className="tab-pane fade show active"
                  id="ex1-tabs-1"
                  role="tabpanel"
                  aria-labelledby="ex1-tab-1"
                >
                  <CourseForm getApiCourse={getApiCourse} />
                </div>
                <div
                  className="tab-pane fade"
                  id="ex1-tabs-2"
                  role="tabpanel"
                  aria-labelledby="ex1-tab-2"
                >
                  {couseForm ? (
                    <>
                      <form
                        className="text-center"
                        onSubmit={handleCourseUpdeate}
                      >
                        <div className="row justify-content-center">
                          <div className="col-lg-5 ">
                            <h6>Update Course Data</h6>
                          </div>
                        </div>
                        <div className="row justify-content-center mb-3">
                          <div className="col-lg-5 col-md-8 col-sm-12">
                            <div className="mb-3 text-start">
                              <label>Course Title</label>
                              <NewInput
                                type="text"
                                className="form-control"
                                // labelName="Course Title"
                                value={postCourse?.title}
                                onChange={(e) => _handleCourseInput(e)}
                                name="title"
                              />
                            </div>
                            {/*  <div className="mb-3">
              <NewInput
                type="text"
                className="form-control"
                labelName="Course Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              
            </div>
            */}
                            <div className="mb-3 text-start">
                              <label>Subject Code</label>
                              <NewInput
                                type="text"
                                className="form-control"
                                // labelName="Subject Code"
                                value={postCourse?.courseCode}
                                onChange={(e) => _handleCourseInput(e)}
                                name="courseCode"
                              />
                            </div>
                            {/*

            <div className="mb-3">
              <NewInput
                type="text"
                className="form-control"
                labelName="Teacher"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
              />
            </div>
            */}

                            <div className="mb-3 text-start">
                              <label>Credit Hours</label>

                              <NewInput
                                type="number"
                                className="form-control"
                                // labelName="Credit Hours"
                                value={postCourse?.creditHours}
                                onChange={(e) => _handleCourseInput(e)}
                                name="creditHours"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          className="course_save"
                          onClick={() => saveCourseForm(postCourse.id)}
                        >
                          Save Course Data
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="col-lg-12">
                      <table className="table ">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Course title</th>
                            <th>Course Code</th>
                            <th>Subject Code </th>
                            <th>Teacher</th>
                            <th colSpan={2}>Credit Hours</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courselisting?.data?.map((e, idx) => {
                            return <CourseListing
                              key={e._id}
                              id={e._id}
                              idx={idx + 1}
                              coursetitle={e.title}
                              coursecode={e.courseCode}
                              subjectcode={e.subjectId.subCode}
                              teacher={e.subjectId.name}
                              credithours={e.creditHours}
                              pressDltCourse={(id) => handleCourseDlt(id)}
                              _handleUpdate={(id) => _handleCourseUpdate(id)}
                            />
                          } )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
              {/* <!-- Tabs content --> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Course;
