import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = 'http://localhost:3005/api/conductores'; // URL base de la API para conductores
  private currentDriverId: number | null = null; // Almacena el ID del conductor actual

  constructor(private http: HttpClient) {}

  // Registrar nuevo conductor
  register(driver: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, driver);
  }

  // Login de conductor basado en email y teléfono
  login(credentials: { email: string; telefono: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.driver) {
          this.currentDriverId = response.driver.id_conductor; // Guarda el ID del conductor
          localStorage.setItem('currentDriverId', this.currentDriverId.toString()); // Lo almacena en localStorage
        }
      })
    );
  }

  // Obtener el ID del conductor actual
  getCurrentDriverId(): number | null {
    return this.currentDriverId || parseInt(localStorage.getItem('currentDriverId') || '0', 10); // Obtén el ID del conductor almacenado o de localStorage
  }

  // Actualizar la información del conductor
  update(id: number, driver: any): Observable<any> {
    return this.http.put(`http://localhost:3005/api/conductores/${id}`, driver);
  }
  

  // Eliminar conductor
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener los datos de un conductor por su ID
  getDrivers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
