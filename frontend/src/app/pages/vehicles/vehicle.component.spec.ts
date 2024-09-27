import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleComponent } from './vehicle.component'; // Cambiado a VehicleComponent

describe('VehicleComponent', () => { // Cambiado el nombre del describe
  let component: VehicleComponent; // Cambiado a VehicleComponent
  let fixture: ComponentFixture<VehicleComponent>; // Cambiado a VehicleComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleComponent ] // Cambiado a VehicleComponent
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleComponent); // Cambiado a VehicleComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
