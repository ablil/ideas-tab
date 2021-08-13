import firebase from "firebase";
import Project from "../models/Project";

export function createExampleProject(userId: string) {
  const projectExample: Project = {
    id: "3x4mpl3pr0j3ct",
    name: "My amazing idea",
    description: "This is just an example of proejct idea, you may delete it",
    technologies: ["Python", "React", "Flutter"],
    repository: "https://github.com/ablil/ideas-tab",
    links: ["https://github.com", "https://github.com/ablil"],
    notes: [
      "You may also keep notes for yoursefl, delete them or edit them",
      "You can save as much as you want in this section",
      "You have three section in your sidebar, your project, your profile and basic statistics",
    ],
    created: new Date(),
    lastModified: new Date(),
  };
  firebase
    .firestore()
    .collection(userId)
    .doc(projectExample.id)
    .set(projectExample)
    .then((_) => console.log("project created successfully"))
    .catch((_) => console.log("failed to create the project"));
}
