import { Estudiante } from "./Estudiante";
import { Evaluacion } from "./Evaluacion";
import { Profesor } from "./Profesor";


export interface Materia {
  id: number;
  nombre: string;
  descripcion: string;
  profesor?: Profesor;
  estudiantes?: Estudiante[];
  evaluaciones?: Evaluacion[];
}