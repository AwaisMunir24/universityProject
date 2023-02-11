import React, { Component, useState } from "react";
import './Button.css';
const Button = (props) => {
    const {title1,title2}=props;

    
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <>
      {isUpdating ? (
        <button className="buttonload student_button">
          <i className="fa fa-spinner fa-spin"></i>{title1}
        </button>
      ) : (
        <button className="student_button">{title2}</button>
      )}
    </>
  );
};
export default Button;
