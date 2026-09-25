import { HttpClient } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { API_URL, User } from '../models';

@Service()
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<User | null>(JSON.parse(cookieservice.get('user') ?? 'null'));
  isAdmin = computed(() => this.currentUser()?.role ==="admin")

  IdUser(){
    return this.currentUser()?.id
  }

  register(data: { username: string; email: string; password: string }) {
    return this.http.post<User>(`${API_URL}/auth/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http.post<User>(`${API_URL}/auth/login`, data).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
      }),
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
