import React, { Component } from "react";
import './TeachersInfo.css'
const TeachersInfo = (props) => {
  const {
    infoTitle,
    totalNumber,
    blocked,
    Unblocked,
    blockedTitle,
    unBlockedTitle,
  } = props;
  return (
    <>
      <div className="information_section d-flex flex-column justify-content-between">
        <div>
        <h2>{infoTitle}</h2>
        <h3>{totalNumber}</h3>
        </div>
        <div className="d-flex justify-content-around">
          <div className="blocked">
            <h4>{blockedTitle}</h4>
            <h4>{blocked}</h4>
          </div>
          <div className="UnBlocked">
            <h4>{unBlockedTitle}</h4>
            <h4>{Unblocked}</h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default TeachersInfo;
