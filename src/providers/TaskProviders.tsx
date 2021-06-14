import { cleanup } from "@testing-library/react";
import firebase from "firebase";
import React, { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth } from "../config/firebase";
import Task from "../models/Task";
import LoadingPage from "../pages/LoadingPage";

export const TaskQueue = React.createContext<{
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  // @ts-ignore
}>({
  tasks: [],
  addTask: function (task: Task) {},
  removeTask: function (id: string) {},
});

const TaskProvider: FC<{ children: any }> = ({ children }) => {
  const [user] = useAuthState(auth);
  const [collectionName] = useState(`${user.uid}-tasks`);
  const [tasks, loading] = useCollectionData<Task>(
    firebase.firestore().collection(collectionName)
  );

  const addTask = (task: Task)  => {
    firebase
      .firestore()
      .collection(collectionName)
      .doc(task.id)
      .set(task)
      .then((_) => tasks?.push(task))
      .then((_) => console.log("task has been added to queue"))
      .catch((err) => console.error(err));
  }
  const removeTask = (id: string)  => {
    firebase.firestore().collection(collectionName).doc(id).delete();
  }

  return loading ? (
    <LoadingPage />
  ) : (
    <TaskQueue.Provider value={{ tasks: tasks || [], addTask, removeTask }}>
      {children}
    </TaskQueue.Provider>
  );
};

export default TaskProvider;
