import React from 'react'

const AbsAllCourses = (props) => {
    const {getCourseList,_handleCourseSelectForAttendance,id}=props;
  return (
    <>
    <select className='form-select form-select-lg mb-0 ' onChange={(e)=>_handleCourseSelectForAttendance(e.target.value)}>
        {
            getCourseList.map((e,idx)=>{
                return  <>
                {
                  idx==0 &&  <option >Select Option</option> 
                } 
                 <option  value={e._id} key={idx}>{e.title}</option>
                
                </>
            })
        }
      
    </select>
    </>
  )
}

export default AbsAllCourses