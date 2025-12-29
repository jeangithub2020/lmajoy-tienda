import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductGridComponent } from '../product-grid/product-grid'; // Importamos la grilla
import { NavbarComponent } from '../navbar/navbar'; // (Opcional si lo usas, pero mejor quitarlo si da warning)

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductGridComponent], 
  templateUrl: './home.html'
})
export class HomeComponent {
  scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}