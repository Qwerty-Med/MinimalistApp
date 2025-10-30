import { PAE } from "./PAE";


export interface Estudiante {
  id: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  telefono:string;
  direccion:string
  correo:string
  pae?: boolean; // Programa de Acompañamiento Estudiantil
}
