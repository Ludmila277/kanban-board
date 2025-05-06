import { Routes, Route } from "react-router-dom";
import Board from "../board/Board";
import TaskDetail from "../task-detail/TaskDetail";
import "./Main.css";
const Main = (props) => {
  const { tasks = {}, updateTask } = props;

  return (
    <main className="main">
      <Routes>
        <Route exact path={"/"} element={<Board {...props} />} />
        <Route
          path="/tasks/:taskId"
          element={
            tasks ? <TaskDetail tasks={tasks} updateTask={updateTask} /> : null
          }
        />
      </Routes>
    </main>
  );
};

export default Main;
