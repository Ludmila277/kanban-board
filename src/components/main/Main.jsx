import { Routes, Route } from "react-router-dom";
import Board from "../board/Board";
import TaskDetail from "../task-detail/TaskDetail";
import "./Main.css";

const Main = (props) => {
  // Добавляем проверку на существование tasks
  const { tasks = {} } = props;

  return (
    <main className="main">
      <Routes>
        <Route exact path={"/"} element={<Board {...props} />} />
        {/* Добавляем проверку на существование tasks перед передачей */}
        <Route 
          path="/tasks/:taskId" 
          element={tasks ? <TaskDetail tasks={tasks} /> : null} 
        />
      </Routes>
    </main>
  );
};

export default Main;
