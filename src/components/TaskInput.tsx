import React, { FC, useState } from "react";

type ComponentProps = {
  onAddTask: (content: string) => void;
};

const TaskInput: FC<ComponentProps> = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  function onSubmit() {
    if (task.length) {
      onAddTask(task);
      setTask("");
    }
  }

  return (
    <>
      <header className="title">Add new item to the Queue</header>

      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        name="task"
        id="task"
        placeholder="Type here ..."
      ></textarea>

      <button className="btn btn-blue" onClick={onSubmit}>
        add task
      </button>

      <footer className="text-xs">
        <span className="bold">Hint:</span> here you would add task or notes,
        that does not belong to any idea
      </footer>
    </>
  );
};

export default TaskInput;
