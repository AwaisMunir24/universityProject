import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const RootContext = React.createContext();

export default ({ children }) => {
  // const navigate=useNavigate();
  const prevUser =
    (window.localStorage.getItem("user") &&
      JSON.parse(window.localStorage.getItem("user"))) ||
    "";

  const [user, setUser] = useState(prevUser);
 

  // const _handleAttendance = (id) => {
  //   console.log(id, "resport course id called");
  //   // navigate("/courseattendance");
  //   axios
  //     .get(`https://dark-gray-agouti-kit.cyclic.app/api/attendence/${id}`)
  //     .then((resp) => {
  //       if (resp.data.results) {
  //         setCourseAtten(resp.data.results);
  //       } else {
  //         return "No data to display";
  //       }
  //       console.log(resp.data.results, "get attendance");
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const [getCourseAtten,setCourseAtten]=useState([]);
  useEffect(() => {
    if (!user) console.log("");
    else window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const defaultContext = {
    setUser,
    user,
    // getCourseAtten
  };
  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};
