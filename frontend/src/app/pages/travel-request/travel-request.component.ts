import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { TravelRequestService } from '../../services/travel-request.service';
import { UserService } from '../../services/user.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-travel-request',
  templateUrl: './travel-request.component.html',
  styleUrls: ['./travel-request.component.css']
})
export class TravelRequestComponent implements OnInit {
  map!: L.Map;
  originMarker!: L.Marker;
  destinationMarker!: L.Marker;

  originLat!: number;
  originLng!: number;
  destinationLat!: number;
  destinationLng!: number;

  isOriginSet = false;
  id_usuario!: number; 

  requestId!: number;
  requestStatus!: string;

  constructor(
    private travelRequestService: TravelRequestService,
    private userService: UserService,  
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.initializeMap();

    this.id_usuario = this.userService.getCurrentUserId();
    if (!this.id_usuario) {
      console.error('No se encontró el ID del usuario logueado.');
    }
  }

  initializeMap(): void {
    this.map = L.map('map').setView([4.60971, -74.08175], 13); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const latlng = event.latlng;

      if (!this.isOriginSet) {
        if (this.originMarker) {
          this.map.removeLayer(this.originMarker);
        }
        this.originMarker = L.marker([latlng.lat, latlng.lng], { title: 'Origen' }).addTo(this.map);
        this.originLat = latlng.lat;
        this.originLng = latlng.lng;
        this.isOriginSet = true;
      } else {
        if (this.destinationMarker) {
          this.map.removeLayer(this.destinationMarker);
        }
        this.destinationMarker = L.marker([latlng.lat, latlng.lng], { title: 'Destino' }).addTo(this.map);
        this.destinationLat = latlng.lat;
        this.destinationLng = latlng.lng;
      }
    });
  }

  saveTravelRequest(): void {
    if (!this.id_usuario) {
      console.error('No se puede guardar la solicitud de viaje sin un ID de usuario válido.');
      return;
    }

    const travelRequest = {
      id_usuario: this.id_usuario,  
      id_conductor: null, 
      origen_latitud: this.originLat,
      origen_longitud: this.originLng,
      destino_latitud: this.destinationLat,
      destino_longitud: this.destinationLng
    };

    this.travelRequestService.createTravelRequest(travelRequest).subscribe(
      response => {
        console.log('Solicitud de viaje guardada:', response);

        this.requestId = response.id_solicitud;  
        this.requestStatus = response.estado || 'pendiente';  
      },
      error => {
        console.error('Error al guardar la solicitud de viaje:', error);
      }
    );
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}