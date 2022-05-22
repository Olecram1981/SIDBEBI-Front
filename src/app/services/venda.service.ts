import { Venda } from 'src/app/models/venda';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Venda> {
    return this.http.get<Venda>(`${API_CONFIG.baseUrl}/vendas/${id}`);
  }

  findAll(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${API_CONFIG.baseUrl}/vendas`);
  }

  create(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(`${API_CONFIG.baseUrl}/vendas`, venda);
  }

  update(venda: Venda): Observable<Venda> {
    return this.http.put<Venda>(`${API_CONFIG.baseUrl}/vendas/${venda.id}`, venda);
  }

  delete(id: any): Observable<Venda> {
    return this.http.delete<Venda>(`${API_CONFIG.baseUrl}/vendas/${id}`);
  }
}