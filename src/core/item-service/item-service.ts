import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { API_URL, Item } from '../models';

@Service()
export class ItemService {
  private http = inject(HttpClient);

  findAll() {
    return this.http.get<Item[]>(`${API_URL}/item`);
  }

  findOne(id: number) {
    return this.http.get<Item>(`${API_URL}/item/${id}`);
  }

  create(item: Partial<Item>) {
    return this.http.post<Item>(`${API_URL}/item`, item);
  }

  update(id: number, item: Partial<Item>) {
    return this.http.patch<Item>(`${API_URL}/item/${id}`, item);
  }

  remove(id: number) {
    return this.http.delete(`${API_URL}/item/${id}`);
  }
}
