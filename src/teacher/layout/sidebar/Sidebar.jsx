import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { LoginTest } from '../../../controller/Auth';
import './Sidebar.css';
const SidebarTeacher = () => {
  const [ isTeacherLogin, setIsTeacherLogin ] = useState(false);
    const [open, setOpen] = useState(true);
    const Menus = [
      {
        title: "Courses",
       icon: <i className="fa-solid fa-chalkboard-user"></i>,
        path: "courselist",
      },
      {
        title: "Student Attendance",
        icon: <i className="fa-solid fa-boxes-stacked"></i>,
        path: "studentlist",
      },
    
    
    ];
    useEffect(() => {
      setIsTeacherLogin(LoginTest())
    }, [])
    
  return (
    <>
     <div className="sidebar ">
         <div className={`${open ? "sidebar_items" : "sidebar_items_2"}`}>
          <div className="icons">
            <i
              className="fa-solid fa-angle-left"
              onClick={() => setOpen(!open)}
            ></i>
          </div>
          <ul className="navigation_list">
            {Menus.map((e, idx) => (
            
              <Link to={e.path} key={idx}>
              <li>
                {e.icon}
                <span className={`${!open && "hidden"}`}>{e.title}</span>
              </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SidebarTeacher