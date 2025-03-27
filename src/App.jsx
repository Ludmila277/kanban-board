import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";

function App() {
  const initialState = JSON.parse(window.localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialState);
  const count = tasks.filter((task) => task.status === "Backlog").length;
  const count1 = tasks.filter((task) => task.status === "Finished").length;
  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Main tasks={tasks} setTasks={setTasks} />
        <Footer count={count} count1={count1} />
      </div>
    </BrowserRouter>
  );
}

export default App;
