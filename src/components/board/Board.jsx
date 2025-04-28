import { nanoid } from "nanoid";
import { LIST_TYPES, LIST_COPY } from "../../config";
import List from "../list/List";
import "./Board.css";
import { useState, useMemo } from "react";
import FormAddNewTask from "../forms/FormAddNewTask";
const Board = ({ tasks, setTasks }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [activeListType, setActiveListType] = useState(LIST_TYPES.BACKLOG);

  const addNewTask = (title, description, status) => {
    const newTask = {
      id: nanoid(), // используем nanoid
      title: title,
      description: description,
      created: new Date().toISOString(),
      status: status,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: [...(prevTasks[status] || []), newTask],
    }));
  };

  const moveTask = (taskId, fromStatus, toStatus) => {
    setTasks((prevTasks) => {
      // Копируем предыдущие задачи, чтобы избежать мутации
      const newTasks = { ...prevTasks };
      const currentTasks = [...(newTasks[fromStatus] || [])]; // Копируем массив задач из колонки fromStatus
      const taskIndex = currentTasks.findIndex((task) => task.id === taskId);
      const task = currentTasks[taskIndex];

      if (task) {
        // Удаляем задачу из текущей колонки
        currentTasks.splice(taskIndex, 1);
        newTasks[fromStatus] = currentTasks;

        // Добавляем задачу в новую колонку с сохранением всех данных
        newTasks[toStatus] = [...(newTasks[toStatus] || []), { ...task, status: toStatus }];

        return newTasks;
      }

      return prevTasks;
    });
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => {
      return Object.entries(prevTasks).reduce((acc, [status, tasks]) => {
        if (Array.isArray(tasks)) {
          acc[status] = tasks.filter((task) => task.id !== taskId);
        }
        return acc;
      }, {});
    });
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
            addNewTask={addNewTask}
            onAddClick={() => handleAddNewClick(type)}
            allTasks={allTasks}
            moveTask={moveTask}
            removeTask={removeTask}
          />
        );
      })}
      {isFormVisible && (
        <FormAddNewTask
          formSubmit={handleFormSubmit}
          initialStatus={activeListType}
          removeTask={removeTask} // передаем функцию удаления
        />
      )}
    </div>
  );
};

export default Board