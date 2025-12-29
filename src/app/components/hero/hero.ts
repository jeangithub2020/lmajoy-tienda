import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service'; // Importar

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent { 
  
  constructor(private cartService: CartService) {}

  buyNow() {
    // Simulamos agregar el producto del banner
    const promoProduct = { name: 'Colección Gemstones', price: 1200, image: '...' };
    this.cartService.addToCart(promoProduct);
    alert('¡Agregado al carrito! Mira el ícono arriba 🛒');
  }
}