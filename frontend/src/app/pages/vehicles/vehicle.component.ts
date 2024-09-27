import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicle = {
    id_conductor: null,
    marca: '',
    modelo: '',
    placa: '',
    tipo_vehiculo: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Aquí podrías cargar datos si es necesario
  }

  createVehicle() {
    // Reiniciar mensajes
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('http://localhost:3006/api/vehiculos', this.vehicle)
  .subscribe(response => {
    this.successMessage = 'Vehículo creado correctamente';
    this.router.navigate(['/vehicles']);
  }, error => {
    console.error('Error al crear vehículo', error);
    this.errorMessage = 'Error al crear vehículo: ' + (error.error?.message || error.message || 'Error desconocido');
  });
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
