import { HttpClient } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL, User } from '../models';
import { CookieService } from 'ngx-cookie-service'

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private cookieservice = inject(CookieService)

  currentUser = signal<User | null>(this.cookieservice.get('user')? JSON.parse(this.cookieservice.get('user')): null);

  //Vérification Admin
  isAdmin = computed(() => this.currentUser()?.role ==="admin")

  //Récupération ID User
  IdUser(){
    return this.currentUser()?.id
  }

  register(data: { username: string; email: string; password: string }) : Observable<User> {
    return this.http.post<User>(`${API_URL}/auth/register`, data).pipe(
      tap( (res) => this.setData('user',JSON.stringify(res)))
    )
  }

  setData(key : string,value:string){
    localStorage.setItem(key,value)
    this.cookieservice.set(key, value);
  }

  login(data: { email: string; password: string }) : Observable<User>  {
    return this.http.post<User>(`${API_URL}/auth/login`, data).pipe(
      tap((user) => {
        this.setData('user',JSON.stringify(user));
        this.currentUser.set(user);
      }),
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.cookieservice.delete('user');
  }
}
