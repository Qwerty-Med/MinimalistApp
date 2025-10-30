import { Comentario } from "./Comentario";
import { Estudiante } from "./Estudiante";


export interface Encuesta {
  id: number;
  nombre: string;
  estudiante?: string;
  comentarios?: string;
}
