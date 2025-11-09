import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuesta } from '../interfaces/Encuesta';

const base_url = "http://localhost:8080/v1";

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

    
  constructor(private http: HttpClient) { }

  /**
   * get the products
   */
getEncuestas(): Observable<Encuesta[]> {
  const endpoint = `${base_url}/comentarios`;
  return this.http.get<Encuesta[]>(endpoint);
}

 /**
 * save the products
 */

saveComentarios(body: any): Observable<any> {
   const endpoint = `${base_url}/comentarios/create`;
  return this.http.post(endpoint, body)
}

/**
 * update  products
 */
updateProduct(body: any, id:any){
  const endpoint = `${base_url}/comentarios/update/${id}`;
  return this.http.put(endpoint, body);
}


/**
 * delete  products
 */
deleteProduct(id:any){
  const endpoint = `${base_url}/comentarios/${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by id  products
 */
 getProductsById(id:any){
  const endpoint = `${base_url}/comentarios/ ${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by name  products
 */
 getProductsByName(name:any){
  const endpoint = `${base_url}/comentarios/term/${name}`;
  return this.http.get(endpoint);
}


  
  
}
