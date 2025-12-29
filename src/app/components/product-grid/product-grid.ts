import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-grid.html'
})
export class ProductGridComponent implements OnInit {
  
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  currentTitle: string = 'Catálogo Completo';
  isLoading = true; // Control de carga

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadData(); // Cargar al iniciar
  }

  loadData() {
    this.isLoading = true;
    
    // 1. Obtener productos del servicio
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.isLoading = false; // ¡Datos listos!
        
        // 2. Conectar filtros
        combineLatest([
          this.productService.searchSubject,
          this.productService.categorySubject
        ]).subscribe(([term, category]) => {
          this.filterData(term, category);
        });
        
        // Ejecutar filtro inicial
        this.filterData(this.productService.searchSubject.value, this.productService.categorySubject.value);
      },
      error: (e) => {
        console.error('Error cargando productos', e);
        this.isLoading = false; // Quitamos carga aunque falle
      }
    });
  }

  filterData(term: string, category: string) {
    let result = this.allProducts;

    // Filtro Categoría
    if (category) {
      result = result.filter(p => p.category === category);
      this.currentTitle = category === 'oferta' ? 'Ofertas Exclusivas' : 
                          category === 'lanzamiento' ? 'Nuevos Lanzamientos' : 'Colecciones';
    } else {
      this.currentTitle = 'Catálogo Completo';
    }

    // Filtro Buscador
    if (term) {
      const lowerTerm = term.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerTerm));
      this.currentTitle = `Resultados para: "${term}"`;
    }

    this.filteredProducts = result;
  }
}