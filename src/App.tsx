import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";
import CreateTask from "./components/create-task";
import ListTasks from "./components/list-tasks";
import { Task } from "./types";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center justify-center pt-3 gap-16">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
      <Toaster />
    </DndProvider>
  );
};
export default App;
