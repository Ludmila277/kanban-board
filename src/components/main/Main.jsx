import { Routes, Route } from "react-router-dom";
import Board from "../board/Board";
import TaskDetail from "../task-detail/TaskDetail";
import "./Main.css";

const Main = ({ tasks, setTasks, updateTask, isSaving }) => {
  return (
    <main className="main">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Board
              tasks={tasks}
              setTasks={setTasks}
              updateTask={updateTask}
              isSaving={isSaving}
            />
          }
        />
        <Route
          path="/tasks/:taskId"
          element={
            tasks ? (
              <TaskDetail
                tasks={tasks}
                updateTask={updateTask}
                isSaving={isSaving}
              />
            ) : null
          }
        />
      </Routes>
    </main>
  );
};

export default Main;
