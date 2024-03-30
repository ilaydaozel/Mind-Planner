
interface IProgram {
  id?: string;
  name: string;
  universityName: string;
  universityCity: string;
  programLink?: string | null; 
  courseContent?: string | null;
  requirements?: string | null;
  language?: string | null;
  applicationDeadline?: string | null;
  applicationDocuments?: string | null;
  additionalNotes?: string[];
}

interface INavLink {
  title: string;
  path: string;
}