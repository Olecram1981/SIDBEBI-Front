import { Agendamento } from 'src/app/models/agendamento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${API_CONFIG.baseUrl}/agendamentos/${id}`);
  }

  findAll(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${API_CONFIG.baseUrl}/agendamentos`);
  }

  create(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${API_CONFIG.baseUrl}/agendamentos`, agendamento);
  }

  update(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.put<Agendamento>(`${API_CONFIG.baseUrl}/agendamentos/${agendamento.id}`, agendamento);
  }

  delete(id: any): Observable<Agendamento> {
    return this.http.delete<Agendamento>(`${API_CONFIG.baseUrl}/agendamentos/${id}`);
  }
}