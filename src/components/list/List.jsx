import { useState } from "react";
import { Link } from "react-router-dom";
import FormAddNewTask from "../forms/FormAddNewTask";
import { LIST_COLORS } from "../../config";
import "./List.css";
const List = (props) => {
  const { type, title, tasks, addNewTask, allTasks, moveTask, removeTask } = props;
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddNewClick = () => {
    setFormVisible(true);
  };

  const formSubmit = (title, description) => {
    addNewTask(title, description, type); // Передаем description
    setFormVisible(false);
    setSelectedTask(null);
  };

  const handleTaskSelect = (taskId) => {
    const selected = allTasks.find((task) => task.id === taskId);
    if (selected) {
      moveTask(selected.id, selected.status, type);
      removeTask(selected.id);
      setSelectedTask(selected);
    }
  };

  return (
    <div className="list">
      <h2 className="listTitle">{title}</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task"
          style={{ background: LIST_COLORS[type] }}
        >
          <Link to={`/tasks/${task.id}`}>
            <div className="task-title">{task.title}</div>
          </Link>
        </div>
      ))}
      {!isFormVisible && (
        <button onClick={handleAddNewClick} className="addButton">
          + Add card
        </button>
      )}

      {isFormVisible && (
        <FormAddNewTask
          formSubmit={formSubmit}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          allTasks={allTasks}
          onTaskSelect={handleTaskSelect}
          removeTask={removeTask}
        />
      )}
    </div>
  );
};

export default List;