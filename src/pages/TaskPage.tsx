import { useState } from "react";
import { v4 } from "uuid";
import Task from "../models/Task";
import TaskInput from "../components/TaskInput";
import { useFirebase } from "../hooks/useFirebase";
import TaskList from "../components/TaskList";
import PageWrapper from "../layouts/PageWrapper";
import Errors from "../components/commons/Errors";

const TaskPage = () => {
  const { items, createOrUpdate, remove } = useFirebase<Task>("tasks");
  const [errors, setErrors] = useState<string[]>([]);

  function onAddTask(content: string) {
    if (content?.length) {
      const task: Task = {
        id: v4(),
        content,
        created: new Date(),
        lastModified: new Date(),
      };

      createOrUpdate(task)
        .then((_) => items?.push(task))
        .catch((err: Error) => setErrors([err.message]));
    }
  }

  function onDelete(id: string) {
    remove(id);
  }

  return (
    <PageWrapper>
      <Errors errors={errors} />
      <section className="flex flex-col md:flex-row w-full max-w-7xl mx-auto h-full">
        <section className="w-full p-3 md:w-2/6">
          <TaskInput onAddTask={onAddTask} />
        </section>

        <section className="w-96 mx-auto md:w-4/6 md:m-4 shadow p-4 ground">
          <TaskList onDelete={onDelete} tasks={items} />
        </section>
      </section>
    </PageWrapper>
  );
};

export default TaskPage;
