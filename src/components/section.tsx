import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import { Task, Tasks } from "../types";
import Header from "./header";
import TaskSection from "./task-section";

const Section = ({
  status,
  closed,
  inProgress,
  setTasks,
  tasks,
  todo,
  allTasks,
}: {
  status: string;
  todo: Task[];
  inProgress: Task[];
  closed: Task[];
  allTasks: Task[];
  setTasks: any;
} & Tasks) => {
  let text, bg, tasksToMap;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: Task) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: (item: Task) => item.status !== "all",
  }));

  if (status === "todo") {
    text = "To do";
    bg = "bg-slate-500";
    tasksToMap = todo;
  } else if (status === "inprogress") {
    text = "In progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  } else if (status === "closed") {
    text = "Closed";
    bg = "bg-green-500";
    tasksToMap = closed;
  } else {
    text = "All";
    bg = "bg-orange-500";
    tasksToMap = allTasks;
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
    <div ref={drop} className={`w-64 ${isOver ? "bg-slate-200" : ""} `}>
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
export default Section;
