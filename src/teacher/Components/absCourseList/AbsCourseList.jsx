import React from "react";

const AbsCourseList = (props) => {
  const { idx, courseListName, subjectListName,_handleAttandanceUpdate,id ,attenddanceTog} = props;
  return (
    <>
      <tr>
        <td>{idx}</td>
        <td>{courseListName}</td>
        <td>{subjectListName}</td>
        <td>
        <select
            className="form-select form-select-lg mb-0 select_option_teacher"
            aria-label=".form-select-lg example"
            onChange={(e)=>_handleAttandanceUpdate(e,id)}
            name="status"
          >
          
            <option value="close" selected={attenddanceTog ? false:true}  >CLose</option>
            <option value="open" selected={attenddanceTog ? true:false }>Open</option>
          
          
          </select>
        
        </td>
      </tr>
    </>
  );
};

export default AbsCourseList;
