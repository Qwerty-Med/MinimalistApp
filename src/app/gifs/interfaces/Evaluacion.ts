import { Estudiante } from "./Estudiante";
import { Materia } from "./Materia";

export interface Evaluacion {
  id: number;
  tipo: string;       // Ej: Parcial, Final, Taller
  nota: number;
  materia?: Materia;  // Relación con la materia evaluada
  estudiante?: Estudiante; // Relación con el estudiante evaluado
}