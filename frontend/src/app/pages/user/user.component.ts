import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any = {
    id_usuario: null,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    tipo_usuario: ''
  };
  loading: boolean = true;

  constructor(
    private userService: UserService,
    private notifier: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.userService.getCurrentUserId();
    this.userService.getUser(userId).subscribe(
      response => {
        this.user = response;
        this.loading = false;
      },
      error => {
        this.notifier.showNotification('Error al cargar datos del usuario', 'Cerrar');
        this.loading = false;
      }
    );
  }

  updateUser() {
    this.userService.update(this.user.id_usuario, this.user).subscribe(
      response => {
        this.notifier.showNotification('Datos actualizados con éxito', 'Cerrar');
        // O puedes redirigir a otra página si lo deseas
      },
      error => {
        this.notifier.showNotification('Error al actualizar los datos', 'Cerrar');
      }
    );
  }

  goHome(){
    this.router.navigate(['/home'])
  }
}
