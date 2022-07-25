import { API_CONFIG } from './../config/api.config';
import { Observable } from 'rxjs';
import { ItensAgendamento } from './../models/itensAgendamento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItensAgendamentoService {

  constructor(private http: HttpClient) { }

  findByCodBarra(codBarra: string): Observable<ItensAgendamento> {
    return this.http.get<ItensAgendamento>(`${API_CONFIG.baseUrl}/itensagendamentos/${codBarra}`);
  }

}
