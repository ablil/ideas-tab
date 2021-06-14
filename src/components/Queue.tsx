import { useState, useContext } from "react";
import { v4 } from "uuid";
import { TaskQueue } from "../providers/TaskProviders";
import { ReactComponent as DeleteIcon } from "../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import Task from "../models/Task";

const Queue = () => {
  const [task, setTask] = useState("");
  const { tasks, addTask, removeTask } = useContext(TaskQueue);

  const onAddTask = (_: any) => {
    if (task && task.length) {
      addTask({
        id: v4(),
        content: task,
        created: new Date(),
        lastModified: new Date(),
      });
      setTask("");
    }
  };

  const onDeleteTask = (task: Task) => {
    removeTask(task.id);
  };

  const onUpdateTask = (task: Task) => {
    setTask(task.content);
  };

  return (
    <section className="flex flex-col md:flex-row w-full h-full">
      <section className="w-full p-3 md:w-2/6">
        <h1 className="text-blue-400 dark:text-yellow-400">
          Add new item to the Queue
        </h1>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          name="task"
          id="task"
          placeholder="Type here ..."
        ></textarea>
        <button className="btn btn-blue" onClick={onAddTask}>
          add task
        </button>

        <article className="text-xs">
          <span className="bold">Hint:</span> here you would add task or notes,
          that does not belong to any project
        </article>
      </section>

      <section className="w-full md:w-4/6 p-4 md:m-4 shadow p-4 bg-white  dark:bg-gray-800">
        <article className="text-blue-400 dark:text-yellow-400">
          Total: {tasks ? tasks.length : 0}
        </article>
        <article className="fade-in divide-y-2 divide-blue-900 dark:divide-yellow-400">
          {tasks!.map((task) => (
            <article className="my-2 group flex" key={task.id}>
              <article>
                <h1>{task.content}</h1>
                <p className="text-xs">created: {task.created.toString()}</p>
                <p className="text-xs">
                  last modified: {task.lastModified.toString()}
                </p>
              </article>
              <div className="w-2/12 ml-auto flex-center opacity-0 group-hover:opacity-100 duration-300">
                <DeleteIcon
                  className="w-5 h-5 text-red-400 cursor-pointer"
                  onClick={(_) => onDeleteTask(task)}
                />
                <EditIcon
                  className="w-5 h-5 text-blue-400 cursor-pointer"
                  onClick={(_) => onUpdateTask(task)}
                />
              </div>
            </article>
          ))}
        </article>
      </section>
    </section>
  );
};

export default Queue;
