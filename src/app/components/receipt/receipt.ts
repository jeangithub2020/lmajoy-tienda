import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt.html',
  styleUrl: './receipt.css'
})
export class ReceiptComponent {
  @Input() orderData: any; // Aquí recibimos la info de la joya comprada

  fechaActual = new Date().toLocaleString();
  numOperacion = Math.floor(Math.random() * 1000000);

  imprimir() {
    window.print();
  }
}