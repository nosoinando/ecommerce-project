import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../../services/driver.service';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  drivers: any[] = []; // Lista de conductores
  driver: any = {
    id_conductor: null, // El ID del conductor
    id_usuario: null,   // El ID del usuario relacionado
    licencia: '',       // Número de licencia
    estado: 'disponible' // Estado por defecto
  };
  loading: boolean = true;

  constructor(
    private driverService: DriverService,
    private notifier: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener la lista de conductores disponibles
    this.driverService.getDrivers().subscribe(
      response => {
        this.drivers = response; // Asignar la lista de conductores
        this.loading = false;
      },
      error => {
        this.notifier.showNotification('Error al cargar la lista de conductores', 'Cerrar');
        this.loading = false;
      }
    );
  }

  updateDriver() {
    // Crear un nuevo objeto solo con los campos que quieres actualizar
    const updatedDriver = {
      licencia: this.driver.licencia,
      estado: this.driver.estado
    };
  
    this.driverService.update(this.driver.id_conductor, updatedDriver).subscribe(
      response => {
        this.notifier.showNotification('Datos del conductor actualizados con éxito', 'Cerrar');
      },
      error => {
        this.notifier.showNotification('Error al actualizar los datos del conductor', 'Cerrar');
      }
    );
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
