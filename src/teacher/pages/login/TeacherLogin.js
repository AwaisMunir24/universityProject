import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import { ToastContainer, toast } from "react-toastify";

import "./TeacherLogin.css";
import { RootContext } from "../../../Routing/contextApi";
const TeacherLogin = ({ role }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(RootContext);

  const [teacherLogin, setTeacherLogin] = useState({
    cnic: "",
    password: "",
  });
  var data = {
    cnic: teacherLogin.cnic,
    password: teacherLogin.passcode,
  };
  const handleTeacherLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://dark-gray-agouti-kit.cyclic.app/api/teacher/signin", data)
      .then((resp) => {
        if (resp.data.success) {
          localStorage.setItem(
            "Teacherlogin",
            JSON.stringify(resp.data.results)
          );
          setUser(resp.data.results);
          navigate("/courselist");
        } else {
          toast.warning(`${resp.data.msg}`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  };
  function handleInput(e) {
    const NewTeaherlogin = { ...teacherLogin };
    NewTeaherlogin[e.target.name] = e.target.value;
    setTeacherLogin(NewTeaherlogin);
  }
  return (
    <>
      <section onSubmit={handleTeacherLogin}>
        <form>
          <div className="login">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="login_section">
                    <h2>{role ?? ""} Login</h2>
                    <Input
                      type="text"
                      placeholder="Enter Cnic"
                      className="form-control inputss"
                      value={teacherLogin.cnic}
                      onChange={(e) => handleInput(e)}
                      name="cnic"
                    />

                    <Input
                      type="password"
                      placeholder="Enter The password"
                      className="form-control inputss"
                      value={teacherLogin.passcode}
                      onChange={(e) => handleInput(e)}
                      name="passcode"
                    />
                    <button className="login_button">Login</button>
                    <div className="forget_password">
                      <Link to="#">Forget Password?</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default TeacherLogin;
