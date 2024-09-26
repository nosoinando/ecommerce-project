import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importar los componentes
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { PaymentComponent } from './pages/payment/payment.component'; // Importar PaymentComponent
import { TravelRequestComponent } from './pages/travel-request/travel-request.component'; // Importar TravelRequestComponent

// Importar módulos de Angular Material y otros
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    PaymentComponent, // Declarar PaymentComponent
    TravelRequestComponent // Declarar TravelRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, // Para llamadas HTTP
    FormsModule, // Para formularios con ngModel
    ReactiveFormsModule, // Para formularios reactivos
    MaterialModule // Módulos de Angular Material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }