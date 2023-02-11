import React, { Component } from "react";
const NewInput = (props) => {
    const {labelName,type,className,value,onChange,name}=props;
  return (
    <>
      <div className="form-outline">
        <input type={type} id="form12" name={name} className={className} value={value} onChange={onChange} required/>
        <label className="form-label" htmlFor="form12">
         {labelName}
        </label>
      </div>
    </>
  );
};
export default NewInput;
