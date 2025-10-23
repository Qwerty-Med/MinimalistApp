import { CharlaIA } from "./CharlaIA";
import { Encuesta } from "./Encuesta";
import { Estudiante } from "./Estudiante";
import { Materia } from "./Materia";
import { Profesor } from "./Profesor";
import { Usuario } from "./Usuario";


export interface Directiva {
 id: number;
  name: string;
  price: number;
  account: number;
  category: {
    id: number;
    name: string;
  };
  picture: string;
  cargo: string;
  usuario: string;
}
