import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white py-24 px-6 max-w-5xl mx-auto font-serif">
      <a routerLink="/" class="text-sm text-[#4A3B32] mb-10 block hover:underline">← Volver al inicio</a>
      
      <div class="border-b pb-8 mb-10">
        <h1 class="text-4xl md:text-5xl text-[#1A1A1A] mb-4">Términos y Condiciones</h1>
        <p class="text-gray-500 italic">Última actualización: Diciembre 2025</p>
      </div>

      <div class="prose prose-lg text-gray-700 max-w-none space-y-8 font-sans">
        
        <section>
            <h3 class="text-xl font-bold text-black uppercase tracking-widest mb-4">1. Introducción</h3>
            <p>Bienvenido a L' Majoy. Al acceder y utilizar nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones. Nos reservamos el derecho de actualizar o modificar estos términos en cualquier momento sin previo aviso.</p>
        </section>

        <section>
            <h3 class="text-xl font-bold text-black uppercase tracking-widest mb-4">2. Productos y Precios</h3>
            <p>Todas las joyas mostradas están sujetas a disponibilidad. Nos esforzamos por mostrar los colores y texturas con la mayor precisión posible, pero no garantizamos que la visualización en su monitor sea exacta. Los precios están expresados en Soles (PEN) e incluyen IGV.</p>
        </section>

        <section>
            <h3 class="text-xl font-bold text-black uppercase tracking-widest mb-4">3. Envíos y Entregas</h3>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Lima Metropolitana:</strong> Entrega en 24 a 48 horas hábiles.</li>
                <li><strong>Provincias:</strong> Entrega en 3 a 7 días hábiles vía Olva Courier.</li>
            </ul>
            <p class="mt-2">L' Majoy no se hace responsable por retrasos ocasionados por causas de fuerza mayor o problemas logísticos externos.</p>
        </section>

        <section>
            <h3 class="text-xl font-bold text-black uppercase tracking-widest mb-4">4. Políticas de Cambio</h3>
            <p>Aceptamos cambios dentro de los primeros 7 días calendario tras la recepción del producto, siempre y cuando la joya esté sin uso, en su empaque original y con el certificado de garantía. No se aceptan devoluciones de dinero, solo notas de crédito.</p>
        </section>

        <section>
            <h3 class="text-xl font-bold text-black uppercase tracking-widest mb-4">5. Propiedad Intelectual</h3>
            <p>Todo el contenido de este sitio (imágenes, logotipos, textos) es propiedad exclusiva de L' Majoy Joyería. Está prohibida su reproducción sin autorización previa.</p>
        </section>

      </div>
      
      <div class="mt-16 pt-8 border-t text-center">
        <button routerLink="/" class="bg-[#1A1A1A] text-white px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-[#D4AF37] transition-all">Aceptar y Continuar</button>
      </div>
    </div>
  `
})
export class TermsComponent {}