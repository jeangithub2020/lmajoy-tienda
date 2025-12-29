import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Para actualizar el numerito del menú en tiempo real

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: any[] = [];
  private cartCount = new BehaviorSubject<number>(0); // El contador reactivo

  // Observable para que el Navbar lo escuche
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    this.loadCart();
  }

  // Agregar joya al carrito
  addToCart(product: any) {
    this.items.push(product);
    this.updateCartState();
  }

  // Obtener lista de compras
  getItems() {
    return this.items;
  }

  // Calcular precio total
  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  // Vaciar carrito (al pagar)
  clearCart() {
    this.items = [];
    this.updateCartState();
  }

  // --- MÉTODOS PRIVADOS ---
  private updateCartState() {
    this.cartCount.next(this.items.length); // Actualiza el número
    this.saveCart(); // Guarda en disco
  }

  private saveCart() {
    localStorage.setItem('bohoo_cart', JSON.stringify(this.items));
  }

  private loadCart() {
    const data = localStorage.getItem('bohoo_cart');
    if (data) {
      this.items = JSON.parse(data);
      this.cartCount.next(this.items.length);
    }
  }
}