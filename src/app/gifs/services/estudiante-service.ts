import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/Estudiante';
const base_url = "http://localhost:8080/v1";
@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  /**
   * get the products
   */
getProducts(): Observable<Estudiante[]> {
  const endpoint = `${base_url}/estudiantes`;
  return this.http.get<Estudiante[]>(endpoint);
}

 /**
 * save the products
 */

saveProducts(body: any): Observable<any> {
   const endpoint = `${base_url}/estudiantes/create`;
    console.log('ESTOY EN EL SERVICIO', body)
  return this.http.post(endpoint, body)
}

/**
 * update  products
 */
updateProduct(body: any, id:any){
  const endpoint = `${base_url}/estudiantes/update/${id}`;
      return this.http.put(endpoint, body, {
    headers: { 'Content-Type': 'application/json' }
  });
}


/**
 * delete  products
 */
/**
 * delete  products
 */
deleteProduct(id:any){
  const endpoint = `${base_url}/estudiantes/${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by id  products
 */
 getProductsById(id:any){
  const endpoint = `${base_url}/estudiantes/ ${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by name  products
 */
 getProductsByName(name:any){
  const endpoint = `${base_url}/estudiantes/term/${name}`;
  return this.http.get(endpoint);
}


}