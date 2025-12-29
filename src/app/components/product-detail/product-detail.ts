import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html'
})
export class ProductDetailComponent implements OnInit {
  
  product: Product | undefined;
  quantity: number = 1;
  isAdding = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.productService.getProductById(id).subscribe(p => {
          this.product = p;
          this.quantity = 1;
        });
      }
    });
  }

  // AGREGAR AL CARRITO (Con efecto Flash)
  addToCart() {
    if (this.product && this.product.stock > 0) {
      this.productService.addToCart(this.product, this.quantity);
      this.isAdding = true;
      setTimeout(() => this.isAdding = false, 1500);
    }
  }

  // --- LÓGICA DE SUMA CORREGIDA ---
  changeQty(delta: number) {
    if (!this.product) return;

    // Aseguramos que sea número
    const current = this.quantity || 1;
    const stockMax = Number(this.product.stock); 

    const nuevoValor = current + delta;

    // 1. Mínimo 1
    if (nuevoValor < 1) return;

    // 2. Máximo lo que haya en stock
    if (nuevoValor > stockMax) return; 

    // 3. ¡Actualizar!
    this.quantity = nuevoValor;
  }
}