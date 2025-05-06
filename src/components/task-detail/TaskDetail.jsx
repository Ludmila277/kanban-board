import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./TaskDetail.css";
const TaskDetail = (props) => {
  const { taskId } = useParams();
  const { tasks, updateTask } = props;
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  const findTask = (tasks, taskId) => {
    for (const category in tasks) {
      const found = tasks[category].find((task) => task.id === taskId);
      if (found) return { ...found, category };
    }
    return null;
  };

  useEffect(() => {
    const foundTask = findTask(tasks, taskId);
    if (foundTask) {
      setTask(foundTask);
      setNewDescription(foundTask.description || "");
    }
  }, [tasks, taskId]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    try {
      if (newDescription !== task.description) {
        await updateTask(task.category, taskId, {
          description: newDescription,
        });

        setTask({ ...task, description: newDescription });
        setIsEditing(false);
      } else {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      setNewDescription(task.description);
    }
  };

  if (!task) return <div>Задача не найдена</div>;

  return (
    <div className="wrapper">
      <Link to="/" className="homeLink">
        ×
      </Link>

      <div className="task-details">
        <div className="header">
          <h2 className="title">{task.title}</h2>
        </div>

        <div className="description-container">
          {isEditing ? (
            <div>
              <textarea
                className="editable-description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <button  className="buttons" onClick={saveChanges}>Сохранить</button>
              <button className="buttons"
                onClick={() => {
                  setIsEditing(false);
                  setNewDescription(task.description);
                }}
              >
                Отмена
              </button>
            </div>
          ) : (
            <div className="description" onClick={toggleEditMode}>
              {task.description || "This task has no description"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
