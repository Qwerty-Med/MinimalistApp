import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from '../interfaces/Profesor';

const base_url = "http://localhost:8080/v1";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) { }

  /**
   * get the products
   */
  getProfesores(): Observable<Profesor[]> {
    const endpoint = `${base_url}/profesores`;
    return this.http.get<Profesor[]>(endpoint);
  }

  /**
   * save the products
   */
saveProfesores(body: any): Observable<any> {
  const endpoint = `${base_url}/profesores/create`;
  return this.http.post(endpoint, body, {
    headers: { 'Content-Type': 'application/json' }
  });
}


  /**
   * update products
   */
  updateProfesores(body: any, id: any) {
    const endpoint = `${base_url}/profesores/update/${id}`;
     return this.http.put(endpoint, body, {
    headers: { 'Content-Type': 'application/json' }
  });
  }

  /**
   * delete products
   */
  deleteProfesores(id: any) {
    const endpoint = `${base_url}/profesores/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * get by id products
   */
  getProfesoreById(id: any) {
    const endpoint = `${base_url}/profesores/ ${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * get by name products
   */
  getProfesoresByName(name: any) {
    const endpoint = `${base_url}/profesores/for/${name}`;
    return this.http.get(endpoint);
  }

}
