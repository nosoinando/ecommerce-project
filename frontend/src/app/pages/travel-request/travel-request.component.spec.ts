import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TravelRequestComponent } from './travel-request.component';
import { TravelRequestService } from '../../services/travel-request.service';
import { NotifierService } from '../../services/notifier.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('TravelRequestComponent', () => {
  let component: TravelRequestComponent;
  let fixture: ComponentFixture<TravelRequestComponent>;
  let travelRequestServiceMock: any;
  let notifierServiceMock: any;

  beforeEach(async () => {
    travelRequestServiceMock = {
      createTravelRequest: jasmine.createSpy('createTravelRequest').and.returnValue(of({}))
    };

    notifierServiceMock = {
      showNotification: jasmine.createSpy('showNotification')
    };

    await TestBed.configureTestingModule({
      declarations: [TravelRequestComponent],
      imports: [FormsModule, MatSnackBarModule],
      providers: [
        { provide: TravelRequestService, useValue: travelRequestServiceMock },
        { provide: NotifierService, useValue: notifierServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveTravelRequest and show success notification', () => {
    const mockTravelRequest = { origen_latitud: 4.6, origen_longitud: -74.1, destino_latitud: 4.7, destino_longitud: -74.2 };
    component.saveTravelRequest();  
    
    expect(travelRequestServiceMock.createTravelRequest).toHaveBeenCalledWith(mockTravelRequest); 
    expect(notifierServiceMock.showNotification).toHaveBeenCalledWith('Solicitud de viaje creada correctamente', 'Cerrar');
  });

  it('should show error notification if creating travel request fails', () => {
    travelRequestServiceMock.createTravelRequest.and.returnValue(of({ error: true })); 
    component.saveTravelRequest();  

    expect(notifierServiceMock.showNotification).toHaveBeenCalledWith('Error al crear la solicitud de viaje', 'Cerrar');
  });
});