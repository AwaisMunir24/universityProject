import React, { Component } from "react";
import { BASE_URL } from "../../controller/config";
import "./TeacherTable.css";
import awii from "../../assets/image/awais.jpg";
const TeacherTable = (props) => {
  const {
    id,
    _id,
    teacherprofile,
    teachername,
    cnic,
    qualification,
    course,
    passcode,
    pressDlt,
    putData,
    _handleUpdate,
    idx,
    courseList,
    _handleCourseSelection,
    _handleCourseOption,
    _handleStatus,

    getCourseData,
    isBlocked,
  } = props;
  return (
    <>
      <tr>
        <td>{idx}</td>
        <td>
          <div className="image_profile">
            {teacherprofile ? (
              <img src={awii} alt="profile" className="img-fluid" />
            ) : (
              <img
                src={`${BASE_URL}${teacherprofile.url}`}
                alt="image"
                style={{ height: 50, width: 50, borderRadius: 50 }}
                className="img-fluid"
              />
            )}
          </div>
        </td>
        <td>
          <h4>{teachername}</h4>
        </td>
        <td>
          <p className="m-0">{cnic}</p>
        </td>
        <td>
          <p className="m-0">{qualification}</p>
        </td>
        <td>
          <select
            className="form-select form-select-lg mb-0 select_option_teacher"
            aria-label="form-select-lg example"
            onChange={(e) => _handleCourseSelection(e.target.value, id)}
            name="course"
          >
            <option value="select">Please Select Course</option>
            {courseList?.map((e, idx) => {
              return (
                <option
                  // onClick={() => _handleCourseOption(e._id, id)}
                  key={idx}
                  value={e._id}
                  selected={
                    putData !== undefined &&
                    (putData._id === e._id ? true : false)
                  }
                >
                  {e.title}
                </option>
              );
            })}
          </select>
        </td>
        <td className="m-0">{passcode}</td>

        <td>
          <select
            className="form-select form-select-lg mb-0 select_option_teacher"
            aria-label=".form-select-lg example"
            name="status"
            onChange={(e) => _handleStatus(e, id)}
          >
            <option value="false" selected={isBlocked ? false : true}>
              Un Blocked
            </option>
            <option value="true" selected={isBlocked ? true : false}>
              Blocked
            </option>
          </select>
        </td>
        <td>
          <i
            className="fa-solid fa-circle-minus"
            title="Delete"
            data-mdb-toggle="tooltip"
            onClick={() => pressDlt(id)}
          ></i>
          <i
            className="fa-solid fa-user-pen mx-2"
            title="Update"
            onClick={() => _handleUpdate(id)}
          ></i>
        </td>
      </tr>
    </>
  );
};
export default TeacherTable;
