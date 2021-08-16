import React, { FC } from "react";
import { ReactComponent as DeleteIcon } from "../assets/icons/trash.svg";
import Task from "../models/Task";

type ComponentProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

const TaskList: FC<ComponentProps> = ({ tasks, onDelete }) => {
  return (
    <>
      <header className="title">Total: {tasks.length}</header>

      <section className="fade-in divide-y-2 divide-blue-900 dark:divide-yellow-400">
        {tasks.map((task: Task) => (
          <article className="my-2 group flex" key={task.id}>
            <article>
              <h1>{task.content}</h1>
              <p className="text-xs">
                {/* @ts-ignore */}
                created: {task.created.toDate().toLocaleString()}
              </p>
              <p className="text-xs">
                {/* @ts-ignore */}
                last modified: {task.lastModified.toDate().toLocaleString()}
              </p>
            </article>

            <article className="w-2/12 ml-auto flex-center opacity-0 group-hover:opacity-100 duration-300">
              <DeleteIcon
                className="w-5 h-5 text-red-400 cursor-pointer"
                onClick={(_) => onDelete(task.id)}
              />
            </article>
          </article>
        ))}
      </section>
    </>
  );
};

export default TaskList;
