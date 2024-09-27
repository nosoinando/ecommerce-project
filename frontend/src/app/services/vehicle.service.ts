import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3006/api/vehiculos'; // Cambiado el puerto a 3006
  private currentVehicleId: number | null = null;

  constructor(private http: HttpClient) {}

  create(vehicle: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, vehicle); // Endpoint para crear vehículo
  }

  update(id: number, vehicle: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, vehicle); // Endpoint para actualizar vehículo
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); // Endpoint para eliminar vehículo
  }

  getVehicle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`); // Endpoint para obtener vehículo por ID
  }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Endpoint para obtener todos los vehículos
  }
}
