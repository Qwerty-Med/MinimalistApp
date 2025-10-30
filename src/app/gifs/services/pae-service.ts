import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from '../interfaces/Profesor';
import { PAE } from '../interfaces/PAE';

const base_url = "http://localhost:8080/v1";
@Injectable({
  providedIn: 'root'
})
export class PaeService {

  constructor(private http: HttpClient) { }

  /**
   * get the products
   */
  getProfesores(): Observable<PAE[]> {
    const endpoint = `${base_url}/pae`;
    return this.http.get<PAE[]>(endpoint);
  }


  /**
   * save the products
   */
saveProfesores(body: any): Observable<any> {
  const endpoint = `${base_url}/pae/create`;
  return this.http.post(endpoint, body);
}


  /**
   * update products
   */
  updateProfesores(body: any, id: any) {
    const endpoint = `${base_url}/pae/update/${id}`;
     return this.http.put(endpoint, body, {
    headers: { 'Content-Type': 'application/json' }
  });
  }

  /**
   * delete products
   */
  deleteProfesores(id: any) {
    const endpoint = `${base_url}/pae/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * get by id products
   */
  getProfesoreById(id: any) {
    const endpoint = `${base_url}/pae/ ${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * get by name products
   */
  getProfesoresByName(name: any) {
    const endpoint = `${base_url}/pae/for/${name}`;
    return this.http.get(endpoint);
  }

}
