import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { NotifierService } from '../../services/notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payments: any[] = [];
  userId: number = 1;

  constructor(
    private paymentService: PaymentService, 
    private notifierService: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.paymentService.getPaymentsByUser(this.userId).subscribe(
      (response) => {
        this.payments = response;
      },
      (error) => {
        this.notifierService.showNotification('Error al obtener los pagos', 'Cerrar');
      }
    );
  }

  createPayment(paymentData: any): void {
    this.paymentService.createPayment(paymentData).subscribe(
      (response) => {
        this.notifierService.showNotification('Pago creado correctamente', 'Cerrar');
        this.getPayments();
      },
      (error) => {
        this.notifierService.showNotification('Error al crear el pago', 'Cerrar');
      }
    );
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}