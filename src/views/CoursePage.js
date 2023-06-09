import React from "react";
import useCourses from "../api/useCourses";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { deleteCourse } from "../api/fetch";
import moment from "moment";
import { useNavigate, useParams } from "react-router";

const CoursePage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const data = useCourses({
    url: process.env.REACT_APP_API_URL,
    resource: "courses",
    id,
  });

  const handleDelete = (id) => {
    deleteCourse(id);
    navigate("/courses");
  };

  const { description, title, imagePath, price, online, duration, dates } = data.courses;
  return data.isLoading ? (
    <Spin />
  ) : (
    <>
      <div className="course-page-container">
        <div className="course-page-title">
          <h3>{title}</h3>
        </div>
          <img
            className="image-course-card container-fluid"
            src={imagePath}
            alt="Course"
            align="center"
          />
          
        <div className="course-page-descr">{description}</div>
        <hr />
        <p>
          Price: {price.normal}<span>&euro;</span>
        </p>
        <p>
          Online:{" "}
          <span>{online ? <span>&#10003;</span> : <span>&#88;</span>}</span>
        </p>
        <p>Duration: {duration}</p>
        <p>
          Dates:
          <span>{" "}
            {moment(dates.start_date).format("DD/MM/YYYY")} -{" "}
            {moment(dates.end_date).format("DD/MM/YYYY")}
          </span>
        </p>
        <div className="course-page-buttons">
          
            <Link to={`/edit/${id}`}>
              <button>Edit <img src="/edit.avif" alt="Edit course" width="15px" /></button>
            </Link>
            <div className="course-page-delete">
              <button onClick={() => handleDelete(id)}>Delete <img src="/delete.avif" alt="Delete course" width="15px" /></button>
            </div> 
          </div>
        </div>
    </>
  );
};
export default CoursePage;