import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { PaymentComponent } from './pages/payment/payment.component';  
import { TravelRequestComponent } from './pages/travel-request/travel-request.component';
import { DriverComponent } from './pages/drivers/driver.component'; // Asegúrate de importar el componente DriverComponent
import { VehicleComponent } from './pages/vehicles/vehicle.component'; // Importa el componente VehicleComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'payments', component: PaymentComponent },  
  { path: 'travel-requests', component: TravelRequestComponent },  
  { path: 'drivers', component: DriverComponent }, // Agrega la ruta para el componente de conductores
  { path: 'vehicles', component: VehicleComponent }, // Agrega la ruta para el componente de vehículos
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
