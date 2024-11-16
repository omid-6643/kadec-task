import { useEffect, useState } from "react";
import { Task, Tasks } from "../types";
import Section from "./section";

const ListTasks = ({ tasks, setTasks }: Tasks) => {
  const statuses = ["todo", "inprogress", "closed"];
  const [todo, setTodo] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [closed, setClosed] = useState<Task[]>([]);

  useEffect(() => {
    const todo = tasks.filter((task) => task.status === "todo");
    const inProgress = tasks.filter((task) => task.status === "inprogress");
    const closed = tasks.filter((task) => task.status === "closed");

    setTodo(todo);
    setInProgress(inProgress);
    setClosed(closed);
  }, [tasks]);

  return (
    <div className="flex gap-16">
      {statuses.map((status) => {
        return (
          <Section
            key={status}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            todo={todo}
            inProgress={inProgress}
            closed={closed}
          />
        );
      })}
    </div>
  );
};

export default ListTasks;
