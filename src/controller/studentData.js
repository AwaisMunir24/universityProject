import React, { Component } from 'react'

import axios from 'axios';
let url = "https://good-erin-ox-suit.cyclic.app/api/student";
const gettingStudentData = (dynamicCourse) => {
  axios
    .get(url)
    .then(function (response) {
      //handle success

      if (response?.data?.success) {
        dynamicCourse([...response.data.results]);
      }

      // console.log( ...response?.data?.results);
    })
    .catch(function (error) {
      //handle error
      console.log(error, "error");
    });
};

const courseDelete=(delCourse)=>{
  axios.delete(url)
  .then(function (response){
    console.log("deleted ",response)
  })
  .catch(function(error){
    console.log(error)
  })
}
export default gettingStudentData;
export {courseDelete}