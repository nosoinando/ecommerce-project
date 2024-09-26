import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelRequestService {
  private apiUrl = 'http://localhost:3001/api/solicitudesviaje';  // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  createTravelRequest(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, request);
  }
}