import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import { LIST_TYPES } from "./config";

const App = () => {
  const initialState = JSON.parse(window.localStorage.getItem("tasks")) || {
    [LIST_TYPES.BACKLOG]: [],
    [LIST_TYPES.TODO]: [],
    [LIST_TYPES.IN_PROGRESS]: [],
    [LIST_TYPES.DONE]: [],
  };

  const [tasks, setTasks] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);

  const updateTask = (listType, taskId, updates) => {
    try {
      setTasks((prevTasks) => {
        const updatedTasks = {
          ...prevTasks,
          [listType]: prevTasks[listType].map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        };
        return updatedTasks;
      });
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
    }
  };

  useEffect(() => {
    const saveTasks = async () => {
      try {
        setIsSaving(true);
        if (JSON.stringify(tasks).length > 5 * 1024 * 1024) {
          throw new Error("Данные слишком большие для localStorage");
        }
        await window.localStorage.setItem("tasks", JSON.stringify(tasks));
        setIsSaving(false);
      } catch (error) {
        console.error("Ошибка сохранения:", error);
        setIsSaving(false);
      }
    };
    saveTasks();
  }, [tasks]);

  const countActiveTasks = () => {
    let total = 0;
    total += tasks[LIST_TYPES.BACKLOG]?.length || 0;
    total += tasks[LIST_TYPES.TODO]?.length || 0;
    total += tasks[LIST_TYPES.IN_PROGRESS]?.length || 0;
    return total;
  };

  const countDoneTasks = () => {
    return tasks[LIST_TYPES.DONE]?.length || 0;
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Main
          tasks={tasks}
          setTasks={setTasks}
          updateTask={updateTask}
          isSaving={isSaving}
        />
        <Footer activeCount={countActiveTasks()} doneCount={countDoneTasks()} />
      </div>
    </BrowserRouter>
  );
};

export default App;
