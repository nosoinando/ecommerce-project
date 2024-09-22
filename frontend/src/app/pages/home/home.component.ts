import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  logout() {
    // Aquí puedes implementar la lógica de cierre de sesión
    // Por ejemplo, limpiar el token o el estado del usuario
    this.router.navigate(['/login']); // Redirigir a la página de login
  }

  goUser(){
    this.router.navigate(['/user']);
  }
}
