import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { OrderComponent } from './components/order/order.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'order', component: OrderComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', pathMatch: "full", redirectTo: 'login' },
    { path: '**', redirectTo: '' } 
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { } 
