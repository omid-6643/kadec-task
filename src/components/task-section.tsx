import { EditOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import { Task, Tasks } from "../types";

const TaskSection = ({ setTasks, task, tasks }: { task: Task } & Tasks) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task.name);

  const handleRemove = (id: string) => {
    const filterTask = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filterTask));
    setTasks(filterTask);
    toast.success("Task removed successfully");
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, name: editedTask };
      }
      return t;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsModalOpen(false);
    toast.success("Task updated successfully");
  };

  return (
    <>
      <div
        ref={drag}
        className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
          isDragging ? "opacity-25" : "opacity-100"
        }`}
      >
        <p>{task.name}</p>
        <div className="absolute bottom-1 right-1 flex flex-row gap-1">
          <Button icon={<EditOutlined />} type="text" onClick={handleEdit} />
          <Button
            icon={<MinusCircleOutlined />}
            type="text"
            onClick={() => handleRemove(task.id)}
          />
        </div>
      </div>

      <Modal
        title="Edit Task"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          placeholder="Edit task name"
        />
      </Modal>
    </>
  );
};
export default TaskSection;
