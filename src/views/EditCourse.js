import React, { useEffect, useState } from "react";
import { prepareCourseForm } from "../utilities/form";
import { prepareDatesForm } from "../utilities/form";
import { editCourse, fetchCourse } from "../api/fetch";
import { useParams, useNavigate } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    duration: "",
    price: {
      early_bird: 0,
      normal: 0,
    },
    online: "",
    dates: {
      start_date: "",
      end_date: "",
    },
    imagePath: "",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCourse(id);
      setFormValues({
        title: data.title,
        description: data.description,
        duration: data.duration,
        price: {
          early_bird: data.price.early_bird,
          normal: data.price.normal,
        },
        online: data.online,
        dates: {
          start_date: data.dates.start_date,
          end_date: data.dates.end_date,
        },
        imagePath: data.imagePath,
      });
    }
    fetchData();
  }, [id]);

  const { title, description, duration, online, imagePath, dates: { start_date, end_date }, price: { early_bird, normal }, } = formValues;

  const handleEdit = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });

    const formData = prepareCourseForm(formValues, e.target);
    setFormValues(formData);
  };

  const handleEditDates = (e) => {
    const formDates = prepareDatesForm(formValues, e.target);
    setFormValues(formDates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formValues.online = isChecked;
    await editCourse(formValues, id);
    navigate(`/courses/${id}`);
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
       <div className="edit-course-title">
        <h5>Edit Course</h5>
       </div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            style={{ textAlign: "center" }}
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleEdit}
          />
        </label>
        <label>
          Description:
          <textarea
            style={{ textAlign: "center" }}
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleEdit}
          />
        </label>
        <label>
          Duration:
          <input
            style={{ textAlign: "center" }}
            type="text"
            id="duration"
            name="duration"
            value={duration}
            onChange={handleEdit}
          />
        </label>
        <div className="input_dates">
          Dates:
          <label htmlFor="start_date">Start Date:</label>
          <input
            style={{ textAlign: "center" }}
            name="start_date"
            id="start_date"
            type="date"
            min="2023-02-01"
            max="2031-02-01"
            value={start_date}
            onChange={handleEditDates}
          />
          </div>
          <div className="input_dates">
           <label htmlFor="end_date">End Date:</label>
           <input
            style={{ textAlign: "center" }}
            name="end_date"
            id="end_date"
            type="date"
            min="2023-02-01"
            max="2031-02-01"
            value={end_date}
            onChange={handleEditDates}
           />
          </div>
        <div className="input_prices">
          Price:
          <label htmlFor="early_bird">Early bird price:</label>
          <input
            style={{ textAlign: "center" }}
            id="early_bird"
            name="early_bird"
            type="number"
            min="0"
            value={early_bird}
            onChange={handleEdit}
          />
         </div>
         <div className="input_prices">
          <label htmlFor="normal">Normal price:</label>
          <input
            style={{ textAlign: "center" }}
            id="normal"
            name="normal"
            type="number"
            min="0"
            value={normal}
            onChange={handleEdit}
          />
        </div>
        <label>
          Online:
          <input
            key={id}
            type="checkbox"
            checked={isChecked}
            name="online"
            value={online}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          {/* not working without file extension */}
          Image:
          <input
            style={{ textAlign: "center" }}
            type="text"
            placeholder="http://myimage.jpg"
            id="imagePath"
            name="imagePath"
            value={imagePath}
            onChange={handleEdit}
          />
        </label>
        <button type="submit">Save Course</button>
      </form>
    </>
  );
};
export default EditForm;