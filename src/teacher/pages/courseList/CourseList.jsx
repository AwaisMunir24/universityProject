import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import AbsCourseList from "../../Components/absCourseList/AbsCourseList";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);

  const getCoourseData = () => {
    axios
      .get("https://dark-gray-agouti-kit.cyclic.app/api/course")
      .then((resp) => {
        // console.log(resp.data.data);
        setCourseList(resp.data.data);
      })
      .catch((err) => console.log(err));
  };

  const _handleAttandanceToogle=(e,id)=>{
    console.log(e.target.value,id,"for toogle class");
      axios.put(`https://dark-gray-agouti-kit.cyclic.app/api/course/attendence/${id}`,{
        attendenceMarkingOpen:e.target.value
      }).then((resp)=>{
        console.log(resp.data);
      }) 

  }

  useEffect(() => {
    getCoourseData();
  }, []);

  return (
    <>
      <section>
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
              <h5>Attendence Toggler </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr #:</th>
                    <th>Course</th>
                    <th>Subject</th>
                    <th>Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courseList.map((e, idx) => (
                    <>
                      <AbsCourseList
                        idx={idx + 1}
                        key={idx}
                        id={e._id}
                        courseListName={e.title}
                        subjectListName={e.subjectId.name}
                        attenddanceTog={e.attendenceMarkingOpen}
                        _handleAttandanceUpdate={(e, id) =>
                          _handleAttandanceToogle(e, id)
                        }
                      />
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseList;
