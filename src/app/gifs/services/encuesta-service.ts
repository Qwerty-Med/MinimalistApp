import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuesta } from '../interfaces/Encuesta';
const base_url = "http://localhost:8080/v1";

@Injectable({
  providedIn: 'root'
})
export class EncuestaService  {
  
  constructor(private http: HttpClient) { }

  /**
   * get the products
   */
getEncuestas(): Observable<Encuesta[]> {
  const endpoint = `${base_url}/encuestas`;
  return this.http.get<Encuesta[]>(endpoint);
}

 /**
 * save the products
 */

saveProducts(body: any): Observable<any> {
   const endpoint = `${base_url}/encuestas/create`;
  return this.http.post(endpoint, body)
}

/**
 * update  products
 */
updateProduct(body: any, id:any){
  const endpoint = `${base_url}/encuestas/update/${id}`;
  return this.http.put(endpoint, body);
}


/**
 * delete  products
 */
deleteProduct(id:any){
  const endpoint = `${base_url}/encuestas/${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by id  products
 */
 getProductsById(id:any){
  const endpoint = `${base_url}/encuestas/ ${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by name  products
 */
 getProductsByName(name:any){
  const endpoint = `${base_url}/encuestas/for/${name}`;
  return this.http.get(endpoint);
}


  
}

