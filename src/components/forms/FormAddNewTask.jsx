import { useState } from "react";
import "./Forms.css";

const FormAddNewTask = (props) => {
  const { formSubmit, onInputActive } = props;
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const fieldName = e.target.name;
    setValues({ ...values, [fieldName]: e.target.value });
    onInputActive(true);
  };

  const handleBlur = () => {
    onInputActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.title) {
      formSubmit(values.title, values.description);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="input"
        id="taskTitle"
        name="title"
        type="text"
        placeholder="Enter task title"
        onChange={handleChange}
        value={values.title}
        onBlur={handleBlur}
      />
      <textarea
        className="textarea"
        id="taskDescription"
        name="description"
        placeholder="Enter task description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
};


export default FormAddNewTask;
