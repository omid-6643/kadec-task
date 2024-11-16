import { MinusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";
import { Task, Tasks } from "../types";

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

const Section = ({
  status,
  closed,
  inProgress,
  setTasks,
  tasks,
  todo,
}: {
  status: string;
  todo: Task[];
  inProgress: Task[];
  closed: Task[];
  setTasks: any;
} & Tasks) => {
  let text, bg, tasksToMap;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: Task) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  if (status === "todo") {
    text = "To do";
    bg = "bg-slate-500";
    tasksToMap = todo;
  } else if (status === "inprogress") {
    text = "In progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  } else {
    text = "Closed";
    bg = "bg-green-500";
    tasksToMap = closed;
  }

  const addItemToSection = (id: string) => {
    setTasks((prev: Task[]) => {
      const newList = prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: status,
          };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(newList));
      toast.success("Task moved successfully");
      return newList;
    });
  };

  return (
    <div ref={drop} className={`w-64 ${isOver ? "bg-slate-200" : ""}`}>
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => {
          return (
            <TaskSection
              key={task.id}
              setTasks={setTasks}
              task={task}
              tasks={tasks}
            />
          );
        })}
    </div>
  );
};

const Header = ({
  text,
  bg,
  count,
}: {
  text: string;
  bg: string;
  count: number;
}) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}{" "}
      <div className="ml-2 bg-white size-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const TaskSection = ({ setTasks, task, tasks }: { task: Task } & Tasks) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id: string) => {
    const filterTask = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filterTask));
    setTasks(filterTask);

    toast.success("Task removed successfully");
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p>{task.name}</p>
      <Button
        icon={<MinusCircleOutlined />}
        type="text"
        className="absolute bottom-1 right-1"
        onClick={() => {
          handleRemove(task.id);
        }}
      />
    </div>
  );
};
