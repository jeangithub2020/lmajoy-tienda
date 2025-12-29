import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <--- 1. IMPORTANTE: Importar esto

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink], // <--- 2. IMPORTANTE: Agregarlo aquí
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {}