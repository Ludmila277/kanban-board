import { useState, useMemo } from "react";
import { nanoid } from "nanoid";
import { LIST_TYPES, LIST_COPY } from "../../config";
import List from "../list/List";
import FormAddNewTask from "../forms/FormAddNewTask";
import "./Board.css";
const Board = ({ tasks, setTasks }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [activeListType, setActiveListType] = useState(LIST_TYPES.BACKLOG);

  const updateTask = async (params) => {
    try {
      const { category, taskId, updates } = params;
      setTasks((prevTasks) => {
        const updatedTasks = {
          ...prevTasks,
          [category]: prevTasks[category]?.map((task) => {
            if (task.id === taskId) {
              return { ...task, ...updates };
            }
            return task;
          }),
        };
        return updatedTasks;
      });
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
    }
  };

  const addNewTask = (title, description, status) => {
    const newTask = {
      id: nanoid(),
      title,
      description,
      created: new Date().toISOString(),
      status,
    };
    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: [...(prevTasks[status] || []), newTask],
    }));
  };

  const moveTask = (taskId, fromStatus, toStatus) => {
    setTasks((prevTasks) => {
      const task = prevTasks[fromStatus]?.find((task) => task.id === taskId);
      if (task) {
        const updatedTasks = { ...prevTasks };
        
        updatedTasks[fromStatus] = updatedTasks[fromStatus]?.filter(
          (task) => task.id !== taskId
        );
        
        updatedTasks[toStatus] = [
          ...(updatedTasks[toStatus] || []),
          { ...task, status: toStatus },
        ];
        
        return updatedTasks;
      }
      return prevTasks;
    });
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => 
      Object.fromEntries(
        Object.entries(prevTasks).map(([status, tasks]) => 
          [status, tasks.filter((task) => task.id !== taskId)]
        )
      )
    );
  };

  const handleAddNewClick = (type) => {
    setActiveListType(type);
    setFormVisible(true);
  };

  const handleFormSubmit = (title, description) => {
    addNewTask(title, description, activeListType);
    setFormVisible(false);
  };

  const allTasks = useMemo(() => {
    return Object.values(tasks).flat().filter(Boolean);
  }, [tasks]);

  return (
    <div className="board">
      {Object.values(LIST_TYPES).map((type) => {
        const columnTasks = tasks[type] || [];
        return (
          <List
            key={type}
            type={type}
            title={LIST_COPY[type]}
            tasks={columnTasks}
            setTasks={setTasks}
            addNewTask={addNewTask}
            onAddClick={() => handleAddNewClick(type)}
            allTasks={allTasks}
            moveTask={moveTask}
            removeTask={removeTask}
            updateTask={updateTask}
          />
        );
      })}
      {isFormVisible && (
        <FormAddNewTask
          formSubmit={handleFormSubmit}
          initialStatus={activeListType}
          removeTask={removeTask}
          allTasks={allTasks}
          type={activeListType}
        />
      )}
    </div>
  );
};

export default Board;