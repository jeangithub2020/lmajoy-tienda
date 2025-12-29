import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html'
})
export class CheckoutComponent implements OnInit {
  
  cartItems: Product[] = [];
  total: number = 0;
  pagoAprobado = false;
  shippingData = { nombres: '', whatsapp: '', direccion: '', tarjeta: '', vencimiento: '', cvv: '', apellidos: '', email: '', distrito: '', referencia: '' };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.productService.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  }

  // --- NUEVAS FUNCIONES PARA EDITAR CANTIDAD EN CARRITO ---
  increaseQty(item: Product) {
    if ((item.quantity || 0) < item.stock) {
      item.quantity = (item.quantity || 0) + 1;
      this.calculateTotal();
    } else {
      alert('Stock máximo alcanzado');
    }
  }

  decreaseQty(item: Product) {
    if ((item.quantity || 1) > 1) {
      item.quantity = (item.quantity || 1) - 1;
      this.calculateTotal();
    } else {
      // Opcional: Si baja de 1, podrías preguntar si quiere borrarlo
      if(confirm('¿Quitar del carrito?')) {
        this.cartItems = this.cartItems.filter(p => p.id !== item.id);
        this.calculateTotal();
      }
    }
  }

  payNow() {
    if (this.total === 0) return;
    if (!this.shippingData.nombres || !this.shippingData.whatsapp || !this.shippingData.direccion) {
      alert("Completa los datos de envío.");
      return;
    }

    this.pagoAprobado = true;

    this.cartItems.forEach(item => {
      const nuevoStock = item.stock - (item.quantity || 1);
      if (nuevoStock >= 0) {
        this.productService.updateProduct(item.id, { ...item, stock: nuevoStock }).subscribe();
      }
    });
    
    setTimeout(() => {
      this.productService.clearCart();
      alert(`¡Pedido Confirmado!`);
      this.router.navigate(['/']);
    }, 2500);
  }
}