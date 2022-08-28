import { Section } from "./Section.model";

export interface Task {
  section: Section;
  title: string;
  content: string;
  position: number;
}

export interface TaskCreateProps {
  sectionId: string;
}

export interface TaskUpdateProps {
  title?: string;
  content?: string;
}

export interface TaskUpdatePositionProps {
  resourceList: Task[];
  destinationList: Task[];
  resourceSectionId: string;
  destinationSectionId: string;
}
