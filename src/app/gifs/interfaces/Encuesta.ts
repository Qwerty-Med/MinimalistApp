import { Comentario } from "./Comentario";
import { Estudiante } from "./Estudiante";


export interface Encuesta {
  id: number;
  titulo: string;
  estudiante?: Estudiante;
  comentarios?: Comentario[];
}
