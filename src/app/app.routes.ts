import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { CheckoutComponent } from './components/checkout/checkout';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { LoginComponent } from './components/login/login';
import { TrackingComponent } from './components/tracking/tracking';
import { TermsComponent } from './components/terms/terms';
import { SizeGuideComponent } from './components/size-guide/size-guide';
import { ComplaintsComponent } from './components/complaints/complaints'; // Esto es DEVOLUCIONES
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { BookComponent } from './components/book/book'; // IMPORTAMOS EL LIBRO NUEVO

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminDashboardComponent },
    { path: 'tracking', component: TrackingComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    
    // RUTA DE DEVOLUCIONES (La que ya tenías bonita)
    { path: 'complaints', component: ComplaintsComponent },

    // RUTA NUEVA DEL LIBRO DE RECLAMACIONES
    { path: 'book', component: BookComponent },

    { path: 'terms', component: TermsComponent },
    { path: 'size-guide', component: SizeGuideComponent },
    { path: '**', redirectTo: '' }
];