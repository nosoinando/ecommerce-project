import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  private currentUserId: number | null = null;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string; telefono: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.user) {
          this.currentUserId = response.user.id_usuario;  // Almacena el ID del usuario logueado
          localStorage.setItem('currentUserId', this.currentUserId.toString());  // Almacena en localStorage
        }
      })
    );
  }

  getCurrentUserId(): number | null {
    return this.currentUserId || parseInt(localStorage.getItem('currentUserId') || '0', 10);  // Recupera desde localStorage si no está en memoria
  }

  update(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}