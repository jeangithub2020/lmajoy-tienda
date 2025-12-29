import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html'
  // HE BORRADO LA LÍNEA DE "styleUrl" PORQUE NO TIENES ESE ARCHIVO CSS
})
export class AppComponent {
  title = 'joyeria-app';

  constructor(public router: Router) {}
}