import { Estudiante } from "./Estudiante";


export interface CharlaIA {
  id: number;
  tema: string;
  fecha: string;
  asistentes?: Estudiante[];
}
