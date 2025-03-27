import { useParams, Link } from "react-router-dom";
import "./TaskDetail.css";

const TaskDetail = (props) => {
  const { taskId } = useParams();
  const { tasks, setTasks } = props;
  const task = tasks.find((task) => task.id === taskId);

  const handleChange = (e) => {
    const newDescription = e.target.value;
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="wrapper">
      <Link to="/" className="homeLink">
        ×
      </Link>
      {task ? (
        <div className="task-details">
          <div className="header">
            <h2 className="title">{task.title}</h2>
          </div>
          <div className="description-container">
            <textarea
              className="textarea"
              value={task.description || ""}
              onChange={handleChange}
            />
            {!task.description && (
              <div className="placeholder">This task has no description</div>
            )}
          </div>
        </div>
      ) : (
        <div className="not-found">
          <h2>Task with id {taskId} not found</h2>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
