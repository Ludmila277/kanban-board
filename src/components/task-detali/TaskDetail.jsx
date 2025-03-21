import { useParams, Link } from "react-router-dom";
import "./TaskDetail.css";

const TaskDetail = (props) => {
  const { taskId } = useParams();
  const { tasks, setTasks } = props;
  const task = tasks.find((task) => task.id === taskId);

  const handleChange = (e) => {
    const NewDescription = e.target.value;
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, description: NewDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  return (
    <div className="container">
      <Link to="/" className="homeLink">
        &#x2715;
      </Link>
      {task ? (
        <>
          <div className="header">
            <h2 className="title">{task.title}</h2>
          </div>
          <textarea className="textarea" onChange={handleChange}>
            {task.description || "This task has no description"}
          </textarea>
        </>
      ) : (
        <h2>Task with id {taskId} not found</h2>
      )}
    </div>
  );
};

export default TaskDetail;
