export default interface Idea {
  id: string;
  name: string;
  description?: string;
  repository?: string;
  technologies: string[];
  links: string[];
  notes: string[];
  created?: Date;
  lastModified?: Date;
}
