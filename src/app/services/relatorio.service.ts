import { Relatorio } from 'src/app/models/relatorio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) { }

  find(relatorio: Relatorio): Observable<Relatorio[]> {
    return this.http.get<Relatorio[]>(`${API_CONFIG.baseUrl}/relatorios/${relatorio}`);
  }
  
}