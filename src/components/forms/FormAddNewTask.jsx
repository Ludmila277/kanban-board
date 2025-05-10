import { useState, useEffect } from "react";
import { LIST_TYPES } from "../../config";
import "./Forms.css";
const FormAddNewTask = ({
  formSubmit,
  selectedTask,
  setSelectedTask,
  allTasks,
  type,
  moveTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [selectError, setSelectError] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title || "");
      setDescription(selectedTask.description || "");
    } else {
      setTitle("");
      setDescription("");
      setTitleError("");
      setSelectError("");
    }
  }, [selectedTask]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setTitleError(!value.trim() ? "Please enter a title" : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (type === LIST_TYPES.BACKLOG) {
      if (!title.trim()) {
        setTitleError("Please enter a title");
        isValid = false;
      }
    } else {
      if (!selectedTask) {
        setSelectError("Please select an existing task");
        isValid = false;
      }
    }

    if (isValid) {
      if (type === LIST_TYPES.BACKLOG) {
        formSubmit(title, description);
        setTitle("");
        setDescription("");
        setSelectedTask(null);
      } else {
        try {
          moveTask(selectedTask.id, selectedTask.status, type);
          setSelectedTask(null);
          setSelectError("");
        } catch (error) {
          console.error("Ошибка перемещения задачи:", error);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="error-container">
        {type === LIST_TYPES.BACKLOG ? (
          <>
            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={title}
              onChange={handleTitleChange}
              required
              className="input"
            />
            {titleError && <div className="error">{titleError}</div>}
          </>
        ) : (
          <>
            {allTasks?.length > 0 ? (
              <select
                className="select-task"
                value={selectedTask?.id || ""}
                onChange={(e) => {
                  const selected = allTasks.find(
                    (task) => task.id === e.target.value
                  );
                  setSelectedTask(selected);
                }}
              >
                <option value="">Select a task</option>
                {allTasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            ) : (
              <div className="no-tasks">No tasks available to move</div>
            )}
            {selectError && <div className="error">{selectError}</div>}
          </>
        )}
      </div>
      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
};

export default FormAddNewTask;
