import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  telefono: string = '';

  constructor(private userService: UserService,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  login() {
    this.userService.login({ email: this.email, telefono: this.telefono }).subscribe(
      response => {
        this.notifierService.showNotification('Inicio de sesión exitoso', 'Cerrar');
        this.router.navigate(['/home']); // Cambia '/home' por la ruta deseada
      },
      error => this.notifierService.showNotification('Credenciales inválidas', 'Cerrar')
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
