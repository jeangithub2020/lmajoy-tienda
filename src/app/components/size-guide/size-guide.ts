import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-size-guide',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white py-24 px-6 max-w-4xl mx-auto text-center">
      <a routerLink="/" class="text-sm text-gray-500 mb-8 block text-left">← Volver</a>
      <h1 class="text-4xl font-serif mb-8">Guía de Tallas</h1>
      <p class="mb-8 text-gray-600">Utiliza esta tabla para encontrar tu medida perfecta de anillo.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 border">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr><th class="px-6 py-3">Talla</th><th class="px-6 py-3">Diámetro (mm)</th></tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b"><td class="px-6 py-4">5</td><td class="px-6 py-4">15.7 mm</td></tr>
                <tr class="bg-white border-b"><td class="px-6 py-4">6</td><td class="px-6 py-4">16.5 mm</td></tr>
                <tr class="bg-white border-b"><td class="px-6 py-4">7</td><td class="px-6 py-4">17.3 mm</td></tr>
                <tr class="bg-white"><td class="px-6 py-4">8</td><td class="px-6 py-4">18.2 mm</td></tr>
            </tbody>
        </table>
      </div>
    </div>
  `
})
export class SizeGuideComponent {}