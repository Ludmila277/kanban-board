import { Routes, Route } from "react-router-dom";
import Board from "../board/Board";
import TaskDetail from "../task-detali/TaskDetail";
import "./Main.css";
const Main = (props) => {
  return (
    <Main className="main">
      <Routes>
        <Route exact path={"/"} element={<Board {...props} />} />
        <Route path={"/tasks/:taskId"} element={<TaskDetail {...props} />} />
      </Routes>
    </Main>
  );
};

export default Main;
