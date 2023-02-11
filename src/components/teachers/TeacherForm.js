import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import NewInput from "../newInput/Newinput";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TeacherForm.css";

const TeacherForm = ({ getAllCourseList, getTeacherData }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [images, setImages] = useState(null);
  const [getCourse, setGetCourse] = useState("");
  const [postTeacher, setPostTeacher] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    cnic: "",
    gender: "",
  });

  function handleInput(e) {
    const newTeaching = { ...postTeacher };
    newTeaching[e.target.name] = e.target.value;
    setPostTeacher(newTeaching);
    console.log(e.target.name, e.target.value);
  }
  const url = "https://dark-gray-agouti-kit.cyclic.app/api/teacher/add";

  const handleTeacher = (e) => {
    e.preventDefault();
    if(postTeacher.cnic.length >= 13 && ( postTeacher.gender.includes("MALE") || postTeacher.gender.includes("FEMALE"))) {
      let data = JSON.stringify({
        firstName: postTeacher.firstName,
        lastName: postTeacher.lastName,
        cnic: postTeacher.cnic,
        gender: postTeacher.gender,
      });
      console.log(images);
      const formData = new FormData();
      formData.append("image", images, images?.name);
      formData.append("data", data);
      axios
        .post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {
          getTeacherData();
          console.log(resp.data.success, "post teacher");
          
          // return setPostTeacher(resp.data);
          if(resp.data.success === true) {
            console.log("Shoaib")
            toast.success(resp.data.data.message);
          }
          else {
            toast.error(resp.data.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  
      setPostTeacher({
        firstName: "",
        lastName: "",
        cnic: "",
        gender: "",
      });
      setImages({
        images: null,
      });
    }
    else {
      toast.error("CNIC or Gender Incorrect");
    }
  };
  const handleFileSelect = (e) => {
    let arr = e.target.files;
    console.log(arr[0]);

    setImages(arr[0]);
  };
  useEffect(() => {}, []);

  return (
    <>
      <form onSubmit={handleTeacher} className="text-center">
        <div className="row justify-content-center mt-3">
          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className="mb-4">
              <NewInput
                type="text"
                name="firstName"
                className="form-control"
                labelName="firstName"
                value={postTeacher.firstName}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="mb-4">
              <NewInput
                type="number"
                className="form-control"
                labelName="CNIC"
                value={postTeacher.cnic}
                onChange={(e) => handleInput(e)}
                name="cnic"
              />
            </div>
            <div className="mb-4">
              <NewInput
                type="text"
                className="form-control"
                labelName="Last Qualification"
                value={postTeacher.lastName}
                onChange={(e) => handleInput(e)}
                name="lastName"
              />
            </div>
            <div className="mb-4">
              <NewInput
                type="text"
                className="form-control"
                labelName="Gender"
                value={postTeacher.gender}
                onChange={(e) => handleInput(e)}
                name="gender"
              />
            </div>
            <div className="mb-4">
              {/* <NewInput
                type="file"
                className="form-control"
                onChange={handleFileSelect}
                name="files"
              /> */}
              <input
                type="file"
                onChange={handleFileSelect}
                className="form-control"
              />
              {/* <input type="submit" value="Upload File" /> */}
            </div>

            <div className="mb-5">
              {/* <NewInput
                type="text"
                className="form-control"
                labelName="Passcode"
                value={passcode}
                onChange={(e) => handleInput(e)}
              /> */}
            </div>
          </div>
        </div>
        {isUpdating ? (
          <button className="buttonload teacher_button">
            <i className="fa fa-spinner fa-spin"></i>Saving Teacher Data
          </button>
        ) : (
          <button className="teacher_button">Save Teacher Data</button>
        )}
      </form>
      <ToastContainer />
    </>
  );
};
export default TeacherForm;
