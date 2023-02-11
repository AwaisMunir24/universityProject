import React from 'react'

const AbsStudentList = (props) => {
    const {idx,studentName,courseName,attandance,subjectName}=props;
  return (
    <>
        <tr>
            <td>{idx}</td>
            <td>{studentName}</td>
            <td>{courseName}</td>
            <td>{subjectName}</td>
        </tr>
    
    </>
  )
}

export default AbsStudentList