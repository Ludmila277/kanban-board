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
    [LIST_TYPES.DONE]: []
  };

  const [tasks, setTasks] = useState(initialState);

  useEffect(() => {
    const saveTasks = () => {
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    saveTasks();
  }, [tasks]);

  const countActiveTasks = () => {
    let total = 0;
    total += tasks[LIST_TYPES.BACKLOG] ? tasks[LIST_TYPES.BACKLOG].length : 0;
    total += tasks[LIST_TYPES.TODO] ? tasks[LIST_TYPES.TODO].length : 0;
    total += tasks[LIST_TYPES.IN_PROGRESS] ? tasks[LIST_TYPES.IN_PROGRESS].length : 0;
    return total;
  };

  const countDoneTasks = () => {
    return tasks[LIST_TYPES.DONE] ? tasks[LIST_TYPES.DONE].length : 0;
  };

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Main tasks={tasks} setTasks={setTasks} />
        <Footer 
          activeCount={countActiveTasks()}
          doneCount={countDoneTasks()}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;