import React, { Component, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginTest } from "../../controller/Auth";
import { RootContext } from "../../Routing/contextApi";
import { useNavigate } from "react-router-dom";
import "./Header.css";
const Header = ({ isAdmin, setIsAdmin }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(RootContext);

  const handleloginEvent = () => {
    setUser(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header>
        <div
          className={`container-fluid ${
            isAdmin ? "admin_header" : "teacher_header"
          }`}
        >
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-3 ">
              <Link to="#">University Portal</Link>
            </div>

            <div className="col-lg-6 col-md-3 text-center d-flex justify-content-center ">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onClick={() => {
                    handleloginEvent();
                    setIsAdmin(!isAdmin);
                  }}
                />
                <label
                  className="form-check-label label_tag"
                  for="flexSwitchCheckDefault"
                >
                  {" "}
                  {isAdmin ? "Admin" : "Teacher"}
                </label>
              </div>
              {/* <div className="form-check form-switch text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  onClick={() => {
                    setIsAdmin(!isAdmin);
                  }}
                />
                <label
                  class="form-check-label label_tag"
                  for="flexSwitchCheckDefault"
                >
                  {isAdmin ? "Admin" : "Teacher"}
                </label>
              </div> */}
              <></>
            </div>
            {/* Umair  */}

            <div className="col-lg-3 col-md-6">
              <ul>
                {user ? (
                  <li>
                    <Link to="/" onClick={handleloginEvent}>
                      Logout
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
