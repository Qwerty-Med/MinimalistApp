import { Materia } from "./Materia";


export interface Profesor {
  id: number;
  nombre: string;
  especialidad: string;
  materias: Materia[];
}
