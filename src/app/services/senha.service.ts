import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Senha } from '../models/senha';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Senha> {
    return this.http.get<Senha>(`${API_CONFIG.baseUrl}/usuarios/${id}`);
  }

  findByEmail(email: string): Observable<Senha> {
    return this.http.get<Senha>(`${API_CONFIG.baseUrl}/usuarios/${email}`);
  }

  findAll(): Observable<Senha[]> {
    return this.http.get<Senha[]>(`${API_CONFIG.baseUrl}/usuarios`);
  }

  create(senha: Senha): Observable<Senha> {
    return this.http.post<Senha>(`${API_CONFIG.baseUrl}/usuarios`, senha);
  }

  update(senha: Senha): Observable<Senha> {
    return this.http.put<Senha>(`${API_CONFIG.baseUrl}/usuarios/${senha.id}`, senha);
  }

  delete(id: any): Observable<Senha> {
    return this.http.delete<Senha>(`${API_CONFIG.baseUrl}/usuarios/${id}`);
  }
}