import React, { useState, useEffect } from "react";
import axios from "axios";
import NewInput from "../newInput/Newinput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CourseForm.css";

const CourseForm = ({ getApiCourse }) => {
  const [error,setError] = useState(false)

  const [postCourse, setPostCourse] = useState({
    name: "",
    subCode: "",
    creditHours: "",
    subjectId:"",
  });

  function _handleCourseInput(e) {
    const newCourse = { ...postCourse };
    newCourse[e.target.name] = e.target.value;
    setPostCourse(newCourse);
  }

  let url = "https://dark-gray-agouti-kit.cyclic.app/api/course";
  var data = {
    title: postCourse.name,
    courseCode: postCourse.subCode,
    creditHours: postCourse.creditHours,
    subjectId: "635a7dc11eaef4f90524f618",
    qrCodeId: "sjkhdfkjsdhfs",
  };

  const handleCourse = (e) => {
    e.preventDefault();
    console.log(postCourse, "hello");
    if( postCourse.name.trim() == "" || postCourse.subCode.trim() == "" )
    {
      toast.error("Please fill all the fields");
      setError(true)
    }
    if(error === true) {
      
      axios
        .post(url, data)
        .then((resp) => {
          console.log(resp.data, "course api called");
          setPostCourse(resp.data);
          getApiCourse();
        })
        .catch((err) => {
          console.log(err);
        });
      setPostCourse({
        name: "",
        subCode: "",
        creditHours: "",
      });
    }
  };

  return (
    <>
      <form className="text-center" onSubmit={handleCourse}>
        <div className="row justify-content-center mb-3">
          <div className="col-lg-5 col-md-8 col-sm-12">
            <div className="mb-3">
              <NewInput
                type="text"
                className="form-control"
                labelName="Course Title"
                value={postCourse.name}
                onChange={(e) => _handleCourseInput(e)}
                name="name"
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
            <div className="mb-3">
              <NewInput
                type="text"
                className="form-control"
                labelName="Subject Code"
                value={postCourse.subCode}
                onChange={(e) => _handleCourseInput(e)}
                name="subCode"
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

            <div className="mb-3">
              <NewInput
                type="number"
                className="form-control"
                labelName="Credit Hours"
                name="creditHours"
                value={postCourse.creditHours}
                onChange={(e) => _handleCourseInput(e)}
              />
            </div>
          </div>
        </div>
        <button className="course_save">Save Course Data</button>
      </form>
      <ToastContainer />
    </>
  );
};
export default CourseForm;
