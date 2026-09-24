import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { API_URL, User } from '../models';

@Service()
export class UserService {
  private http = inject(HttpClient);

  findAll() {
    return this.http.get<User[]>(`${API_URL}/user`);
  }

  findOne(id: number) {
    return this.http.get<User>(`${API_URL}/user/${id}`);
  }

  update(id: number, user: Partial<User>) {
    return this.http.patch<User>(`${API_URL}/user/${id}`, user);
  }

  remove(id: number) {
    return this.http.delete(`${API_URL}/user/${id}`);
  }
}
