import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms'; // Necesario para el input

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  showSearch = false; // Controla si se ve la cajita de búsqueda
  searchTerm = '';

  constructor(private productService: ProductService, public router: Router) {}

  // Función para filtrar por categoría al hacer clic
  filterCategory(category: string) {
    this.productService.categorySubject.next(category); // Avisa al servicio
    
    // Si no estamos en home, vamos a home
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
    
    // Scroll suave al catálogo
    setTimeout(() => {
        document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  // Función del buscador
  onSearch() {
    this.productService.searchSubject.next(this.searchTerm);
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
        this.searchTerm = '';
        this.onSearch(); // Limpia la búsqueda al cerrar
    }
  }
}