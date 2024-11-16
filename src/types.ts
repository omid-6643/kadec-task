export type Task = {
  id: string;
  name: string;
  status: "todo" | "inprogress" | "closed" | "all";
};

export type Tasks = { tasks: Task[]; setTasks: (tasks: Task[]) => void };
