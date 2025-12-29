import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <--- IMPORTANTE

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [RouterLink], // <--- AGREGADO
  templateUrl: './returns.html',
  styleUrl: './returns.css'
})
export class ReturnsComponent {}