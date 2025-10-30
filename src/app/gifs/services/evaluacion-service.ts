import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluacion } from '../interfaces/Evaluacion';
const base_url = "http://localhost:8080/v1";
@Injectable({
  providedIn: 'root'
})
export class EvaluacionService  {
  
  constructor(private http: HttpClient) { }

  /**
   * get the products
   */
getProducts(): Observable<Evaluacion[]> {
  const endpoint = `${base_url}/evaluaciones`;
  return this.http.get<Evaluacion[]>(endpoint);
}

 /**
 * save the products
 */

saveProducts(body: any): Observable<any> {
   const endpoint = `${base_url}/evaluaciones/create`;
  return this.http.post(endpoint, body)
}

/**
 * update  products
 */
updateProduct(body: any, id:any){
  const endpoint = `${base_url}/evaluaciones/update/${id}`;
  return this.http.put(endpoint, body);
}


/**
 * delete  products
 */
deleteProduct(id:any){
  const endpoint = `${base_url}/evaluaciones/${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by id  products
 */
 getProductsById(id:any){
  const endpoint = `${base_url}/evaluaciones/ ${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by name  products
 */
 getProductsByName(name:any){
  const endpoint = `${base_url}/evaluaciones/term/${name}`;
  return this.http.get(endpoint);
}
  
}

