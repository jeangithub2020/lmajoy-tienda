import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboardComponent implements OnInit {
  
  products: Product[] = [];
  isLoading = true; // Para mostrar spinner
  showForm = false;
  isEditing = false;
  
  newProduct: any = { 
    id: 0, name: '', price: 0, category: 'lanzamiento', image: '', stock: 0, description: '' 
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.resetForm();
  }

  // --- GUARDAR REAL ---
  saveProduct() {
    this.isLoading = true; // Bloqueamos mientras guarda

    if (this.isEditing && this.newProduct.id) {
      // MODO EDITAR
      this.productService.updateProduct(this.newProduct.id, this.newProduct).subscribe(() => {
        alert('✅ Producto Actualizado en la Nube');
        this.finalizeAction();
      });
    } else {
      // MODO CREAR
      this.productService.addProduct(this.newProduct).subscribe(() => {
        alert('✅ Producto Guardado en la Nube');
        this.finalizeAction();
      });
    }
  }

  // --- BORRAR REAL ---
  deleteProduct(id: number) {
    if(confirm('¿Estás seguro de borrar este producto de la base de datos?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts(); // Recargamos la lista
      });
    }
  }

  finalizeAction() {
    this.showForm = false;
    this.loadProducts(); // Recargamos para ver el cambio
    this.resetForm();
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
    this.isEditing = true;
    this.showForm = true;
  }

  // Lógica simple para convertir archivo a texto (Base64)
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.image = e.target.result; // Guarda la foto como texto
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm() {
    this.newProduct = { id: 0, name: '', price: 0, category: 'lanzamiento', image: '', stock: 0, description: '' };
    this.isEditing = false;
  }
}