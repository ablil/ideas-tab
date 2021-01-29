import firebase from "firebase";
import React, { useState, FunctionComponent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth } from "../config/firebase";
import Project from "../models/Project";
import LoadingPage from "../pages/LoadingPage";

export const ProjectsContext = React.createContext<{
  loading: boolean;
  projects: Project[] | undefined;
  createProject: (project: Project) => Promise<void>;
  findProject: (id: string) => Project | undefined;
  updateProject: (project: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  // @ts-ignore
}>({});

const ProjectsProvider: FunctionComponent<{ children: any }> = ({
  children,
}) => {
  const [user] = useAuthState(auth);
  const [collectionName] = useState(`${user.uid}`);

  let [projects, loading] = useCollectionData<Project>(
    firebase.firestore().collection(collectionName)
  );

  const createProject = (p: Project) =>
    firebase
      .firestore()
      .collection(collectionName)
      .doc(p.id)
      .set(p)
      .then((_) => {
        projects?.push(p);
      });

  const findProject = (id: string) => projects?.find((p) => p.id === id);

  const updateProject = (p: Project) =>
    firebase.firestore().collection(collectionName).doc(p?.id).set(p);

  const removeProject = (id: string) =>
    firebase.firestore().collection(collectionName).doc(id).delete();

  return loading ? (
    <LoadingPage />
  ) : (
    <ProjectsContext.Provider
      value={{
        loading,
        projects,
        createProject,
        findProject,
        updateProject,
        removeProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
