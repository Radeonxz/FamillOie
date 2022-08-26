import { Section } from "./Section.model";

export interface Task {
  section: Section;
  title: string;
  content: string;
  position: number;
}
