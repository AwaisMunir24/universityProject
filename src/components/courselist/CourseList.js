import React, { Component } from 'react';
const CourseListing=(props)=>{
    const {id,coursetitle,coursecode,subjectcode,teacher,credithours,pressDltCourse ,_handleUpdate,idx}=props;
    return(
        <>
            <tr>
                <td>{idx}</td>
                <td><p>{coursetitle}</p></td>
                <td><p>{coursecode}</p></td>
                <td><p>{subjectcode}</p></td>
                <td><p>{teacher}</p></td>
                <td><p>{credithours}</p></td>
                <td className='text-center'><i className="fa-solid fa-circle-minus" title="delete course" onClick={()=>pressDltCourse(id)}></i>
                <i className="fa-solid fa-user-pen mx-2" title='Update Course' onClick={()=>_handleUpdate(id)}></i>
                </td>
            </tr>
        </>

    )
       
}
export default CourseListing