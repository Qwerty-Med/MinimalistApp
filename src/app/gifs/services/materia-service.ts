import { Injectable } from '@angular/core';
import { Materia } from '../interfaces/Materia';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/Estudiante';

const base_url = "http://localhost:8080/v1";
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  
  constructor(private http: HttpClient) { }

  /**
   * get the products
   */
getProducts(): Observable<Materia[]> {
  const endpoint = `${base_url}/materias`;
  return this.http.get<Materia[]>(endpoint);
}

 /**
 * save the products
 */

saveProducts(body: any): Observable<any> {
   const endpoint = `${base_url}/materias/create`;
  return this.http.post(endpoint, body)
}

/**
 * update  products
 */
updateProduct(body: any, id:any){
  console.log("ESTOY EN EL SERVICIO", body)
  const endpoint = `${base_url}/materias/update/${id}`;
     return this.http.put(endpoint, body, {
    headers: { 'Content-Type': 'application/json' }
  });
}


/**
 * delete  products
 */
deleteProduct(id:any){
  const endpoint = `${base_url}/materias/${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by id  products
 */
 getProductsById(id:any){
  const endpoint = `${base_url}/materias/ ${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by name  products
 */
 getProductsByName(name:any){
  const endpoint = `${base_url}/materias/term/${name}`;
  return this.http.get(endpoint);
}
  
}
