import React, { Component } from "react";
import './User.css'
const Users = (props) => {
  const {
    id,
    studentName,
    fatherName,
    cnic,
    address,
    age,
    studentId,
    password,
    pressDltStudent,
    _handleUpdateStudent,
    idx,
    _handleStatus,
    isBlocked,
  } = props;
  // console.log(isBlocked, "testing");
  return (
    <>
      <tr>
        <td>{idx}</td>
        <td>{studentName}</td>
        <td>{fatherName}</td>
        <td>{cnic}</td>
        <td ><p className="address">{address}</p></td>
        <td>{age}</td>
        <td>{studentId}</td>
        <td>{password}</td>
        <td>
          {" "}
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

        <td className="text-center">
          <i
            className="fa-solid fa-circle-minus"
            title="Delete"
            onClick={() => pressDltStudent(id)}
          ></i>
          <i
            className="fa-solid fa-user-pen mx-3"
            title="Update"
            onClick={() => _handleUpdateStudent(id)}
          ></i>
        </td>
      </tr>
    </>
  );
};
export default Users;
