import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { PaymentService } from '../../services/payment.service';
import { NotifierService } from '../../services/notifier.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let paymentServiceMock: any;
  let notifierServiceMock: any;

  beforeEach(async () => {
    paymentServiceMock = {
      getPaymentsByUser: jasmine.createSpy('getPaymentsByUser').and.returnValue(of([{ id_pago: 1, monto: 100, metodo_pago: 'efectivo', fecha_pago: '2024-01-01' }])),
      createPayment: jasmine.createSpy('createPayment').and.returnValue(of({}))
    };

    notifierServiceMock = {
      showNotification: jasmine.createSpy('showNotification')
    };

    await TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      imports: [FormsModule, MatSnackBarModule], 
      providers: [
        { provide: PaymentService, useValue: paymentServiceMock },
        { provide: NotifierService, useValue: notifierServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load payments on init', () => {
    component.ngOnInit();
    expect(paymentServiceMock.getPaymentsByUser).toHaveBeenCalled();
    expect(component.payments.length).toBeGreaterThan(0);
  });

  it('should call createPayment and show success notification', () => {
    const mockPayment = { id_solicitud: 1, monto: 100, metodo_pago: 'efectivo' };
    component.createPayment(mockPayment);
    
    expect(paymentServiceMock.createPayment).toHaveBeenCalledWith(mockPayment);
    expect(notifierServiceMock.showNotification).toHaveBeenCalledWith('Pago creado correctamente', 'Cerrar');
  });

  it('should show error notification if creating payment fails', () => {
    paymentServiceMock.createPayment.and.returnValue(of({ error: true }));
    const mockPayment = { id_solicitud: 1, monto: 100, metodo_pago: 'efectivo' };
    component.createPayment(mockPayment);

    expect(notifierServiceMock.showNotification).toHaveBeenCalledWith('Error al crear el pago', 'Cerrar');
  });
});