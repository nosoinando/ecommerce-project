import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3002/api/pagos';

  constructor(private http: HttpClient) {}

  getPaymentsByUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  createPayment(payment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, payment);
  }
}