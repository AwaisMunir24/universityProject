// import React, { Component,useState } from "react";
import axios from "axios";



const staticTeacher = {
  id: 1,
  teacherName: "abc",
  cnic: "33100-0000-0",
  qualification: "master",
  course: "cs201",
  teacherId: 123,

};


let url = "https://good-erin-ox-suit.cyclic.app/api/teacher";
const gettingTeacherData = (dynamicState) => {
  const url = "https://good-erin-ox-suit.cyclic.app/api/teacher";
  axios
    .get(url)
    .then(function (response) {
      //handle success

      if (response?.data?.success) {
        dynamicState([...response.data.results]);
      }

      // console.log( ...response?.data?.results);
    })
    .catch(function (error) {
      //handle error
      console.log(error, "error");
    });
};

const deleteTeacher =(dltTeacher)=>{
  axios
    .delete(url)
    .then(function (response) {
      //handle success

      console.log(response,"delete ho gya")

      // console.log( ...response?.data?.results);
    })
    .catch(function (error) {
      //handle error
      console.log(error, "error");
    });
}


export  {gettingTeacherData,
  deleteTeacher}
