import { Button, Form, Input } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types";

const CreateTask = ({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}) => {
  const [form] = Form.useForm();
  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    status: "todo",
  });

  const onFinish = () => {
    if (task.name.length > 100)
      return toast.error("Task must be less than 100 characters");

    const newList = [...tasks, task];
    localStorage.setItem("tasks", JSON.stringify(newList));
    setTasks(newList);

    toast.success("Task created successfully");
    form.resetFields();
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <Form onFinish={onFinish} autoComplete="off" form={form}>
      <Form.Item
        name="task"
        label="Task"
        rules={[{ required: true, message: "Please input your task!" }]}
      >
        <Input
          onChange={(e) =>
            setTask({ ...task, name: e.target.value, id: uuidv4() })
          }
          //   defaultValue={task.name}
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={task.name.length < 3}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTask;
