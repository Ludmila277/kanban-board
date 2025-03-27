import { useState } from "react";
import { Link } from "react-router-dom";
import {LIST_COLORS } from "../../config";
import FormAddNewTask from "../forms/FormAddNewTask";
import "./List.css";


const List = (props) => {
  const { type, title, tasks, addNewTask } = props;
  const [isFormVisible, setFormVisible] = useState(false);
  const [isInputActive, setInputActive] = useState(false);
  const [isButtonHidden, setButtonHidden] = useState(false);

  const handleAddNewClick = () => {
    setButtonHidden(true);
    setFormVisible(true);
  };

  const handleInputActive = (isActive) => {
    setInputActive(isActive);
  };

  const formSubmit = (title, description) => {
    addNewTask(title, description, type);
    setFormVisible(false);
    setButtonHidden(false);
  };

  return (
    <div className="list">
      <h2 className="listTitle">{title}</h2>
      {tasks.length ? (
        tasks.map((task) => (
          <Link to={`/tasks/${task.id}`} key={task.id} className="taskLink">
            <div
              className="task"
              style={{ background: LIST_COLORS[task.status] }}
            >
              {task.title}
            </div>
          </Link>
        ))
      ) : (
        <p>No tasks added yet</p>
      )}
      {!isButtonHidden && !isInputActive && (
        <button onClick={handleAddNewClick} className="addButton">
          + Add card
        </button>
      )}
      {isFormVisible && (
        <FormAddNewTask 
          formSubmit={formSubmit}
          onInputActive={handleInputActive}
        />
      )}
    </div>
  );
};

export default List;
