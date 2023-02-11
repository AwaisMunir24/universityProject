import React, { Component } from "react";
const Input = (props) => {
  const { className, type, value, placeholder, onChange, labelName ,name} = props;
  return (
    <>
      <input
        className={className}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
    </>
  );
};
export default Input;
