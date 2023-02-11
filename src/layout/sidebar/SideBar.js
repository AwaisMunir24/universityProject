import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginTest } from "../../controller/Auth";

import "./Sidebar.css";
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [ isLogin, setIsLogin ] = useState(false);

  useEffect(()=>{
    setIsLogin(LoginTest())
  }, [])
  const Menus = [
    {
      title: "Dashboard",
      icon: <i className="fa-solid fa-boxes-stacked"></i>,
      path: "dashboard",
    },
    {
      title: "Teachers",
     icon: <i className="fa-solid fa-chalkboard-user"></i>,
      path: "teachers",
    },
    {
      title: "Students",
      icon: <i className="fa-solid fa-graduation-cap"></i>,
      path: "students",
    },
    {
      title: "Course",
     
      icon:<i className="fa-solid fa-book"></i>,
      path: "course",
    },
    {
      title: "Reports",
      icon:<i className="fa-solid fa-file-lines"></i>,
      path: "report",
    }
  ];
  return (
    <>
      <div className="sidebar ">
      {
            isLogin &&
            <>
        <div className={`${!open ? "sidebar_items" : "sidebar_items_2"}`}>
          <div className="icons">
            <i
              className="fa-solid fa-angle-left"
              onClick={() => setOpen(!open)}
            ></i>
          </div>
          <ul className="navigation_list">
          {  
            Menus.map((e, idx) => (
            
              <Link to={e.path} key={idx}>
              <li>
                {e.icon}
                <span className={`${open && "hidden"}`}>{e.title}</span>
              </li>
              </Link>
            ))
            }
          </ul>
        </div>
        </>
      }
      </div>
    </>
  );
};
export default SideBar;
