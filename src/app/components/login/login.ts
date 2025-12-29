import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importamos Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'admin' && this.password === '123456') {
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Credenciales incorrectas.';
    }
  }

  // FUNCIÓN NUEVA PARA VOLVER
  goHome() {
    this.router.navigate(['/']);
  }
}