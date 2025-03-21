import { useState } from "react";
import { Link } from "react-router-dom";
import "./List.css";
import { LIST_TYPES, LIST_COLORS } from "../../config";
import FormAddNewTask from "../forms/FormAddNewTask"

const List = (props) => {
  const { type, title, tasks, addNewTask } = props;
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNewClick = () => {
    setIsAdding(!isAdding);
  };

  const formSubmit = (title, description) => {
    addNewTask(title, description);
    setIsAdding(false);
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
      {type === LIST_TYPES.BACKLOG && (
        <button onClick={handleAddNewClick} className="addButton">
          + Add card
        </button>
      )}
      {type === LIST_TYPES.BACKLOG && isAdding && (
        <FormAddNewTask formSubmit={formSubmit} />
      )}
    </div>
  );
};

export default List;
