import firebase from "firebase";
import Idea from "../models/Idea";

export function createExampleIdea(userId: string) {
  const ideaExample: Idea = {
    id: "3x4mpl3pr0j3ct",
    name: "My amazing idea",
    description: "This is just an example of proejct idea, you may delete it",
    technologies: ["Python", "React", "Flutter"],
    repository: "https://github.com/ablil/ideas-tab",
    links: ["https://github.com", "https://github.com/ablil"],
    notes: [
      "You may also keep notes for yoursefl, delete them or edit them",
      "You can save as much as you want in this section",
      "You have three section in your sidebar, your idea, your profile and basic statistics",
    ],
    created: new Date(),
    lastModified: new Date(),
  };
  firebase
    .firestore()
    .collection(userId)
    .doc(ideaExample.id)
    .set(ideaExample)
    .then((_) => console.log("idea created successfully"))
    .catch((_) => console.log("failed to create the idea"));
}
