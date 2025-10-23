import { PAE } from "./PAE";


export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  pae?: PAE; // Programa de Acompañamiento Estudiantil
}
