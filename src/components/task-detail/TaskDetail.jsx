import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./TaskDetail.css";

const TaskDetail = (props) => {
  const { taskId } = useParams();
  const { tasks } = props;

  const [task, setTask] = useState(null);

  useEffect(() => {
    // Исправленный способ поиска задачи
    const foundTask = Object.entries(tasks).flatMap(([tasks]) => tasks)
      .find((task) => task.id === taskId);

    if (foundTask) {
      setTask(foundTask);
    }
  }, [tasks, taskId]);

  return (
    <div className="wrapper">
      <Link to="/" className="homeLink">
        ×
      </Link>
      <div className="task-details">
        <div className="header">
          <h2 className="title">{task?.title || "No task found"}</h2>
        </div>
        <div className="description-container">
          <div className="description">
            {task?.description || "This task has no description"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;