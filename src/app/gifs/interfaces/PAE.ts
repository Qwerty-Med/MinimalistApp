import { Estudiante } from "./Estudiante";

export interface PAE {
  id: number;
  estado: string;  
  estudiante: Estudiante[];
}
