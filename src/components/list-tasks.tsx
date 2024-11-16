import { Select } from "antd";
import { useEffect, useState } from "react";
import { Task, Tasks } from "../types";
import Section from "./section";

const ListTasks = ({ tasks, setTasks }: Tasks) => {
  const statuses = ["all", "todo", "inprogress", "closed"];
  const [todo, setTodo] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [closed, setClosed] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
    const todo = tasks.filter((task) => task.status === "todo");
    const inProgress = tasks.filter((task) => task.status === "inprogress");
    const closed = tasks.filter((task) => task.status === "closed");

    setTodo(todo);
    setInProgress(inProgress);
    setClosed(closed);
    setAllTasks(tasks);
  }, [tasks]);

  const handleChange = (value: string) => {
    if (value === "all") {
      return setAllTasks(tasks);
    }

    setAllTasks(tasks.filter((task) => task.status === value));
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        defaultValue="Filter by status"
        className="w-64"
        onChange={handleChange}
        options={[
          { value: "all", label: "All" },
          { value: "todo", label: "Todo" },
          { value: "inprogress", label: "In progress" },
          { value: "closed", label: "Closed" },
        ]}
      />
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
              allTasks={allTasks}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListTasks;
