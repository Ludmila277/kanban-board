import { useState } from "react";
import { Link } from "react-router-dom";
import FormAddNewTask from "../forms/FormAddNewTask";
import { LIST_COLORS } from "../../config";
import "./List.css";
const List = ({
  type,
  title,
  tasks = [],
  addNewTask,
  allTasks,
  moveTask,
  removeTask,
}) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddNewClick = () => {
    setFormVisible(true);
  };

  const formSubmit = (title, description) => {
    addNewTask(title, description, type);
    setFormVisible(false);
    setSelectedTask(null);
  };

  const handleTaskSelect = (taskId) => {
    try {
      const selected = allTasks.find((task) => task.id === taskId);
      if (selected) {
        moveTask(selected.id, selected.status, type);
        setSelectedTask(selected);
      }
    } catch (error) {
      console.error("Ошибка при выборе задачи:", error);
    }
  };

  return (
    <div className="list">
      <h2 className="listTitle">{title}</h2>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <div
            key={task.id}
            className="task"
            style={{ background: LIST_COLORS[type] || "transparent" }}
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
          type={type}
          onTaskSelect={handleTaskSelect}
          removeTask={removeTask}
          moveTask={moveTask}
        />
      )}
    </div>
  );
};

export default List;
