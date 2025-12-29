import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para que funcione el input
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white py-24 px-6 flex flex-col items-center animate-fade-in">
      
      <div class="w-full max-w-md mb-8">
        <a routerLink="/" class="text-xs text-gray-500 hover:text-black flex items-center gap-2 cursor-pointer transition-colors">
          <span>←</span> VOLVER A LA TIENDA
        </a>
      </div>

      <div class="max-w-md w-full text-center">
        <div class="text-5xl mb-4">📦</div>
        <h1 class="text-3xl font-serif mb-4 text-[#1A1A1A]">Rastrea tu Pedido</h1>
        <p class="text-gray-500 mb-8 text-sm">Ingresa tu número de orden para ver el estado actual.</p>
        
        <div class="flex gap-2 border border-gray-300 p-2 rounded-lg shadow-sm mb-6 focus-within:border-black transition-colors">
            <input [(ngModel)]="orderId" type="text" placeholder="Ej: ORD-8852" class="flex-1 p-2 outline-none text-sm uppercase">
            <button (click)="buscar()" class="bg-[#1A1A1A] text-white px-6 py-2 rounded font-bold uppercase text-xs tracking-widest hover:bg-[#333] transition-colors">
              Buscar
            </button>
        </div>

        <div *ngIf="showResult" class="bg-green-50 p-6 rounded-xl border border-green-100 text-left animate-fade-in-up">
            <div class="flex justify-between items-start mb-2">
                <span class="font-bold text-green-800 text-sm">ORDEN #{{ orderId }}</span>
                <span class="bg-green-200 text-green-800 text-[9px] px-2 py-1 rounded font-bold uppercase">En Camino</span>
            </div>
            <p class="text-xs text-green-700 leading-relaxed">
                Tu pedido ha salido de nuestro almacén central y está en ruta hacia tu dirección.
            </p>
            <div class="w-full bg-green-200 h-1 mt-4 rounded-full overflow-hidden">
                <div class="bg-green-600 h-full w-3/4"></div>
            </div>
        </div>
        
        <div *ngIf="showError" class="text-red-500 text-xs mt-2 animate-pulse">
            Por favor ingresa un número de orden válido.
        </div>

      </div>
    </div>
  `
})
export class TrackingComponent {
  orderId: string = '';
  showResult = false;
  showError = false;

  buscar() {
    if (this.orderId.trim()) {
      this.showResult = true;
      this.showError = false;
    } else {
      this.showResult = false;
      this.showError = true;
    }
  }
}