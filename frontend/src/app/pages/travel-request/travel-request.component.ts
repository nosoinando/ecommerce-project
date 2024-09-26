import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { TravelRequestService } from '../../services/travel-request.service';
import { UserService } from '../../services/user.service';  // Importa el UserService
import { Router } from '@angular/router';  // Importa Router para la navegación

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
  id_usuario!: number;  // Variable para almacenar el id del usuario logueado

  // Variables para almacenar el ID y el estado de la solicitud guardada
  requestId!: number;
  requestStatus!: string;

  constructor(
    private travelRequestService: TravelRequestService,
    private userService: UserService,  // Inyecta el UserService
    private router: Router  // Inyecta el Router
  ) {}

  ngOnInit(): void {
    this.initializeMap();

    // Recuperar el ID del usuario logueado desde el UserService
    this.id_usuario = this.userService.getCurrentUserId();
    if (!this.id_usuario) {
      console.error('No se encontró el ID del usuario logueado.');
    }
  }

  // Inicializar el mapa de Leaflet
  initializeMap(): void {
    this.map = L.map('map').setView([4.60971, -74.08175], 13);  // Bogotá, Colombia

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

  // Guardar la solicitud de viaje
  saveTravelRequest(): void {
    if (!this.id_usuario) {
      console.error('No se puede guardar la solicitud de viaje sin un ID de usuario válido.');
      return;
    }

    const travelRequest = {
      id_usuario: this.id_usuario,  // Ahora usa el ID del usuario logueado
      id_conductor: null,  // O el ID del conductor si es necesario
      origen_latitud: this.originLat,
      origen_longitud: this.originLng,
      destino_latitud: this.destinationLat,
      destino_longitud: this.destinationLng
    };

    this.travelRequestService.createTravelRequest(travelRequest).subscribe(
      response => {
        console.log('Solicitud de viaje guardada:', response);

        // Asigna los valores del ID de solicitud y el estado desde la respuesta
        this.requestId = response.id_solicitud;  // `id_solicitud` debe coincidir con el nombre en la respuesta del backend
        this.requestStatus = response.estado || 'pendiente';  // `estado` debe coincidir con el nombre en la respuesta del backend
      },
      error => {
        console.error('Error al guardar la solicitud de viaje:', error);
      }
    );
  }

  // Redirigir al home
  goToHome(): void {
    this.router.navigate(['/home']);
  }
}