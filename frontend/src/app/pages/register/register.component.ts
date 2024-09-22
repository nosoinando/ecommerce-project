import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    tipo_usuario: 'cliente'
  };

  constructor(private userService: UserService,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  register() {
    this.userService.register(this.user).subscribe(
      response => this.notifierService.showNotification('Registro exitoso', 'Cerrar'),
      error => this.notifierService.showNotification('Error en el registro', 'Cerrar')
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
