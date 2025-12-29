import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, BehaviorSubject, catchError } from 'rxjs'; // <--- OJO: catchError importado

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
  quantity?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  // ASEGÚRATE QUE ESTA URL SEA EXACTA (sin espacios al final)
  private apiUrl = 'http://localhost:3000/api/products';
  
  private productsCache: Product[] = []; 
  
  public searchSubject = new BehaviorSubject<string>(''); 
  public categorySubject = new BehaviorSubject<string>('');
  private cart: Product[] = [];

  constructor() {
    // 1. Intentar recuperar memoria del navegador al iniciar
    const guardado = localStorage.getItem('productos_flash');
    if (guardado) {
      try {
        this.productsCache = JSON.parse(guardado);
      } catch (e) {
        console.error("Error leyendo caché", e);
        this.productsCache = [];
      }
    }
  }

  getProducts(): Observable<Product[]> {
    // A. Si ya hay datos en memoria, USARLOS AL TOQUE
    if (this.productsCache.length > 0) {
      this.actualizarFondo(); // Actualizar en silencio
      return of(this.productsCache);
    }

    // B. Si no hay nada, pedir a la nube CON PROTECCIÓN DE ERROR
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(data => this.guardarLocal(data)),
      catchError(error => {
        console.error("🚨 ERROR CRÍTICO DE CONEXIÓN CON BACKEND:", error);
        // Si falla, devolvemos lista vacía para que NO se quede cargando
        return of([]); 
      })
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    if (this.productsCache.length > 0) {
      return of(this.productsCache.find(p => p.id === id));
    }
    return this.getProducts().pipe(
      tap(data => this.guardarLocal(data)),
      // @ts-ignore
      map(products => products.find(p => p.id === id)),
      catchError(() => of(undefined))
    );
  }

  // --- PRIVADOS ---
  private guardarLocal(data: Product[]) {
    this.productsCache = data;
    localStorage.setItem('productos_flash', JSON.stringify(data));
  }

  private actualizarFondo() {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => this.guardarLocal(data),
      error: (err) => console.log("No se pudo actualizar en segundo plano (Backend apagado?)")
    });
  }

  // --- ESCRITURA ---
  addProduct(product: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(() => this.actualizarFondo()) 
    );
  }

  updateProduct(id: number, product: any): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap(() => this.actualizarFondo()) 
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.actualizarFondo())
    );
  }

  addToCart(product: Product, quantity: number = 1) {
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }
  }

  getCart() { return this.cart; }
  clearCart() { this.cart = []; }
}