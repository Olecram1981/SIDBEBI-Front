import { Item } from 'src/app/models/item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  findByCodBarra(codBarra: string): Observable<Item> {
    return this.http.get<Item>(`${API_CONFIG.baseUrl}/itensprodutos/${codBarra}`);
  }

  findAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${API_CONFIG.baseUrl}/itensprodutos`);
  }

  create(item: Item): Observable<Item> {
    return this.http.post<Item>(`${API_CONFIG.baseUrl}/itensprodutos`, item);
  }

  update(item: Item): Observable<Item> {
    return this.http.put<Item>(`${API_CONFIG.baseUrl}/itensprodutos/${item.id}`, item);
  }

  delete(id: any): Observable<Item> {
    return this.http.delete<Item>(`${API_CONFIG.baseUrl}/itensprodutos/${id}`);
  }
}