import uniqid from "uniqid";
import { LIST_TYPES, LIST_COPY } from "../../config";
import List from "../list/List";
import "./Board.css";
import { useState } from "react";
import FormAddNewTask from "../forms/FormAddNewTask";


const Board = (props) => {
  const { tasks, setTasks } = props;
  const [isFormVisible, setFormVisible] = useState(false);
  const [activeListType, setActiveListType] = useState(LIST_TYPES.BACKLOG);
  const [nextStatus, setNextStatus] = useState(null);

  const addNewTask = (title, description, status) => {
    const newTask = {
      id: uniqid(),
      title: title,
      description: description,
      created: new Date().toISOString(),
      status: status,
    };
    setTasks([...tasks, newTask]);
  };

  const handleAddNewClick = (type) => {
    setActiveListType(type);
    setFormVisible(true);
  };

  const handleFormSubmit = (title, description) => {
    addNewTask(title, description, activeListType);
    setFormVisible(false);
    setNextStatus(getNextStatus(activeListType));
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case LIST_TYPES.BACKLOG:
        return LIST_TYPES.IN_PROGRESS;
      case LIST_TYPES.IN_PROGRESS:
        return LIST_TYPES.DONE;
      default:
        return null;
    }
  };

  return (
    <div className="board">
      {Object.values(LIST_TYPES).map((type) => {
        const listTasks = tasks.filter((task) => task.status === type);
        return (
          <List
            key={type}
            type={type}
            title={LIST_COPY[type]}
            tasks={listTasks || []}
            addNewTask={addNewTask}
            onAddClick={() => handleAddNewClick(type)}
            nextStatus={nextStatus}
          />
        );
      })}
      {isFormVisible && (
        <FormAddNewTask
          formSubmit={handleFormSubmit}
          initialStatus={activeListType}
        />
      )}
    </div>
  );
};
export default Board;
