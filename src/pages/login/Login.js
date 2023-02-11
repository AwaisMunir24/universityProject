import React, { Component, useContext, useEffect, useState } from "react";
import Input from "../../components/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./Login.css";
import axios from "axios";
import { RootContext } from "../../Routing/contextApi";
const Login = ({ role, setIsAuth }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(RootContext);

  // const [admin, setAdmin] = useState(adminList());
  const [login, setLogin] = useState({
    email: "",
    passcode: "",
  });
  function handleInput(e) {
    const NewLogin = { ...login };
    NewLogin[e.target.name] = e.target.value;
    setLogin(NewLogin);
  }

  // useEffect(() => {
  //   localStorage.setItem("admin", JSON.stringify(admin));
  // }, [admin]);

  var data = {
    email: login.email,
    password: login.passcode,
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("https://dark-gray-agouti-kit.cyclic.app/api/admin/login", data)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.success) {
          localStorage.setItem("login", JSON.stringify(resp.data.results));
          toast.success(" Login Success!", {
            position: "top-right",
            autoClose: 5000,
          });
          // login
          setUser(resp.data.results);
          navigate("/dashboard");
        } else {
          toast.warning(`${resp.data.msg}`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => console.log(err));

    //
  };

  return (
    <>
      <section onSubmit={handleLogin}>
        <form>
          <div className="login">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="login_section">
                    <h2>{role ?? ""} Login</h2>
                    <Input
                      type="text"
                      placeholder="Enter Email"
                      className="form-control inputss"
                      value={login.email}
                      onChange={(e) => handleInput(e)}
                      name="email"
                    />

                    <Input
                      type="password"
                      placeholder="Enter The password"
                      className="form-control inputss"
                      value={login.passcode}
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
export default Login;
