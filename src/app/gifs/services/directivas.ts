import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
const base_url = "http://localhost:8080/api/v1";
@Injectable({
  providedIn: 'root'
})
export class Directivas {
    private apiUrl = 'http://localhost:8080/api/directivas'; // Cambia según tu backend

  [x: string]: any;

    constructor(private http: HttpClient) { }

  /**
   * get the products
   */
  getProducts(): Observable<Directivas[]> {
    return this.http.get<Directivas[]>(this.apiUrl);
  }


 /**
 * save the products
 */
saveProducts(body: any){
  const endpoint = `${base_url}/products`;
  return this.http.post(endpoint, body);
}

/**
 * update  products
 */
updateProduct(body: any, id:any){
  const endpoint = `${base_url}/products/ ${id}`;
  return this.http.put(endpoint, body);
}


/**
 * delete  products
 */
deleteProduct(id:any){
  const endpoint = `${base_url}/products/${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by id  products
 */
 getProductsById(id:any){
  const endpoint = `${base_url}/products/ ${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by name  products
 */
 getProductsByName(name:any){
  const endpoint = `${base_url}/products/for/${name}`;
  return this.http.get(endpoint);
}

  
}
